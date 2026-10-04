import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:3000';
const source = await readFile(
  new URL('../lib/content.ts', import.meta.url),
  'utf8',
);
const slugs = [...source.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
assert.ok(slugs.length > 0);
const load = async (path) => {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path} renders`);
  const html = await response.text();
  assert.equal(
    [...html.matchAll(/<h1\b/g)].length,
    1,
    `${path} has one primary heading`,
  );
  assert.match(html, /id="main-content"/);
  return html;
};
const work = await load('/work');
assert.equal(
  [...work.matchAll(/class="project-card"/g)].length,
  Math.min(6, slugs.length),
);
assert.match(work, /aria-label="Project pages"/);
assert.match(work, /id="portfolio-search"/);
for (const slug of slugs) {
  const html = await load(`/work/${slug}`);
  assert.match(html, /data-gallery-mode="viewer"/);
  assert.doesNotMatch(html, /class="filmstrip/);
  const thumbs = [...html.matchAll(/aria-label="Show image (\d+):/g)];
  assert.ok(thumbs.length <= 6, `${slug} renders at most six thumbnails`);
  const stage = [...html.matchAll(/aria-label="Open image 1 of (\d+):/g)];
  if (stage.length) {
    assert.equal(stage.length, 1, `${slug} mounts one large gallery image`);
    const count = Number(stage[0][1]);
    if (count > 1) {
      assert.match(html, /aria-label="Jump to image"/);
      assert.equal(thumbs.length, Math.min(6, count));
    }
  } else {
    assert.match(html, /No approved photography is available/);
  }
  console.log(`PASS ${slug}: bounded viewer and truthful empty/photo state`);
}
console.log(
  `PASS Work and all ${slugs.length} project routes; six cards per page`,
);
