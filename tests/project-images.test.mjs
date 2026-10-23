import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  rmdir,
  stat,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import {
  PROJECT_SLUGS,
  scanProjectImages,
  syncProjectImages,
} from '../scripts/sync-project-images.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'trayaksh-project-images-'));
  // This exact path is created for this test; no workspace images are touched.
  assert.ok(path.basename(root).startsWith('trayaksh-project-images-'));
  assert.equal(path.dirname(root), path.resolve(tmpdir()));
  t.after(() =>
    rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 }),
  );
  const projectsDir = path.join(root, 'projects');
  const projectDir = path.join(projectsDir, PROJECT_SLUGS[0]);
  const galleryDir = path.join(projectDir, 'gallery');
  await mkdir(galleryDir, { recursive: true });
  const image = async (
    relativePath,
    { width = 80, height = 40, orientation, background = '#bab5a5' } = {},
  ) => {
    const destination = path.join(projectDir, relativePath);
    let source = sharp({
      create: { width, height, channels: 3, background },
    });
    if (orientation) source = source.withMetadata({ orientation });
    await source.toFile(destination);
    return destination;
  };
  return { root, projectsDir, projectDir, galleryDir, image };
}

void test('empty folders and optional metadata preserve the existing concept fallback', async (t) => {
  const { projectsDir, projectDir, galleryDir } = await fixture(t);
  await writeFile(path.join(galleryDir, '.gitkeep'), '');
  await writeFile(path.join(projectDir, 'metadata.json'), '{}');
  assert.deepEqual(await scanProjectImages({ projectsDir }), {});
  assert.deepEqual(
    await scanProjectImages({
      projectsDir: path.join(projectsDir, 'not-created'),
    }),
    {},
  );
});

void test('new bungalow, bank and house folders accept photos after starting empty', async (t) => {
  const { projectsDir } = await fixture(t);
  const slugs = ['parijat-bungalow', 'vishwabharti-bank', 'patwardhan-house'];
  for (const slug of slugs) {
    const projectDir = path.join(projectsDir, slug);
    await mkdir(path.join(projectDir, 'gallery'), { recursive: true });
    await writeFile(path.join(projectDir, 'gallery', '.gitkeep'), '');
    await writeFile(path.join(projectDir, 'metadata.json'), '{}');
    await writeFile(
      path.join(projectDir, 'README.md'),
      'Add photos in gallery/.',
    );
  }
  assert.deepEqual(await scanProjectImages({ projectsDir }), {});
  const bytes = await sharp({
    create: { width: 80, height: 40, channels: 3, background: '#bab5a5' },
  })
    .jpeg()
    .toBuffer();
  for (const slug of slugs) {
    await writeFile(
      path.join(projectsDir, slug, 'gallery', '01-overview.jpg'),
      bytes,
    );
  }
  const result = await scanProjectImages({ projectsDir });
  for (const slug of slugs) {
    assert.equal(result[slug].gallery.length, 1);
    assert.equal(result[slug].gallery[0].title, 'Overview');
    assert.equal(
      new URL(result[slug].gallery[0].src, 'https://example.test').pathname,
      `/images/projects/${slug}/gallery/01-overview.jpg`,
    );
  }
});

void test('many images are discovered in natural order without a gallery limit', async (t) => {
  const { projectsDir, image } = await fixture(t);
  // Deliberately unsorted and well above fourteen; no real project files change.
  for (const number of [
    24, 1, 10, 2, 11, 3, 20, 4, 19, 5, 18, 6, 17, 7, 16, 8, 15, 9, 14, 12, 13,
    21, 23, 22,
  ]) {
    await image(`gallery/${number}-room.jpg`);
  }
  const result = (await scanProjectImages({ projectsDir }))[PROJECT_SLUGS[0]];
  assert.equal(result.gallery.length, 24);
  assert.deepEqual(
    result.gallery.map((item) =>
      path.basename(new URL(item.src, 'https://example.test').pathname),
    ),
    Array.from({ length: 24 }, (_, index) => `${index + 1}-room.jpg`),
  );
  assert.equal(result.gallery[0].title, 'Room');
  assert.equal(result.gallery[0].alt, 'Room');
  assert.equal(result.gallery[0].aspect, 'landscape');
  assert.equal(result.hero, undefined);
});

void test('metadata overrides captions and accessible descriptions; filenames are safely URL encoded', async (t) => {
  const { projectsDir, projectDir, image } = await fixture(t);
  const filename = '01-Material & light #1 (final).jpg';
  await image(`gallery/${filename}`, { width: 40, height: 60 });
  await writeFile(
    path.join(projectDir, 'metadata.json'),
    JSON.stringify({
      [filename]: {
        title: 'Material & light',
        alt: 'A timber screen filters daylight into the living area.',
        objectPosition: '50% 35%',
      },
    }),
  );
  const result = (await scanProjectImages({ projectsDir }))[PROJECT_SLUGS[0]]
    .gallery[0];
  assert.equal(
    new URL(result.src, 'https://example.test').pathname,
    '/images/projects/nerul-workspace/gallery/01-Material%20%26%20light%20%231%20%28final%29.jpg',
  );
  assert.match(
    new URL(result.src, 'https://example.test').search,
    /^\?v=[a-f0-9]{12}$/,
  );
  assert.equal(result.title, 'Material & light');
  assert.equal(
    result.alt,
    'A timber screen filters daylight into the living area.',
  );
  assert.equal(result.objectPosition, '50% 35%');
  assert.equal(result.aspect, 'portrait');
});

void test('aspect follows EXIF orientation, with near-square photographs treated as square', async (t) => {
  const { projectsDir, image } = await fixture(t);
  await image('gallery/1-rotated.jpg', {
    width: 80,
    height: 40,
    orientation: 6,
  });
  await image('gallery/2-square.png', { width: 100, height: 100 });
  await image('gallery/3-near-square.webp', { width: 100, height: 99 });
  const gallery = (await scanProjectImages({ projectsDir }))[PROJECT_SLUGS[0]]
    .gallery;
  assert.deepEqual(
    gallery.map((item) => item.aspect),
    ['portrait', 'square', 'square'],
  );
  assert.deepEqual(
    gallery.map(({ width, height }) => ({ width, height })),
    [
      { width: 40, height: 80 },
      { width: 100, height: 100 },
      { width: 100, height: 99 },
    ],
  );
  const rotatedPreview = await sharp(
    Buffer.from(gallery[0].blurDataURL.split(',')[1], 'base64'),
  ).metadata();
  assert.equal(rotatedPreview.width, 8);
  assert.equal(rotatedPreview.height, 16);
});

void test('gallery previews are small decodable JPEGs and leave original image bytes unchanged', async (t) => {
  const { projectsDir, image } = await fixture(t);
  const sources = [];
  for (const extension of ['jpg', 'png', 'webp']) {
    const file = await image(`gallery/${extension}-room.${extension}`, {
      width: 320,
      height: 200,
    });
    sources.push({ file, bytes: await readFile(file) });
  }
  const gallery = (await scanProjectImages({ projectsDir }))[PROJECT_SLUGS[0]]
    .gallery;
  for (const item of gallery) {
    assert.equal(item.width, 320);
    assert.equal(item.height, 200);
    assert.match(item.blurDataURL, /^data:image\/jpeg;base64,/);
    assert.ok(Buffer.byteLength(item.blurDataURL) < 1024);
    const bytes = Buffer.from(item.blurDataURL.split(',')[1], 'base64');
    const preview = await sharp(bytes).metadata();
    assert.equal(preview.format, 'jpeg');
    assert.equal(preview.width, 16);
    assert.equal(preview.height, 10);
    await sharp(bytes).raw().toBuffer();
  }
  for (const { file, bytes } of sources) {
    assert.deepEqual(await readFile(file), bytes);
  }
});

void test('named roles are optional, case-insensitive, and independent of gallery files', async (t) => {
  const { projectsDir, image } = await fixture(t);
  await image('HERO.jpg');
  await image('thumbnail.webp');
  await image('hover.png');
  await image('before.jpg');
  await image('after.jpg');
  const result = (await scanProjectImages({ projectsDir }))[PROJECT_SLUGS[0]];
  for (const source of Object.values(result)) {
    assert.match(
      new URL(source, 'https://example.test').search,
      /^\?v=[a-f0-9]{12}$/,
    );
  }
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(result).map(([role, source]) => [
        role,
        new URL(source, 'https://example.test').pathname,
      ]),
    ),
    {
      hero: '/images/projects/nerul-workspace/HERO.jpg',
      after: '/images/projects/nerul-workspace/after.jpg',
      before: '/images/projects/nerul-workspace/before.jpg',
      hover: '/images/projects/nerul-workspace/hover.png',
      thumbnail: '/images/projects/nerul-workspace/thumbnail.webp',
    },
  );
});

void test('duplicate roles and incomplete comparison pairs fail with actionable messages', async (t) => {
  const { projectsDir, projectDir, image } = await fixture(t);
  await image('hero.jpg');
  const duplicate = await image('hero.png');
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /duplicate hero image/,
  );
  await rm(duplicate);
  await image('before.jpg');
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /before and after must be supplied together/,
  );
  await image('after.jpg');
  const unknownRole = path.join(projectDir, 'cover.jpg');
  await writeFile(
    unknownRole,
    await readFile(path.join(projectDir, 'hero.jpg')),
  );
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /Put all other project images in gallery/,
  );
});

void test('corrupt, mismatched and unsupported images fail without publishing a new manifest', async (t) => {
  const { root, projectsDir, galleryDir, image } = await fixture(t);
  const outputFile = path.join(root, 'manifest.json');
  await writeFile(outputFile, '{"previous":"safe"}\n');
  const corrupt = path.join(galleryDir, 'broken.jpg');
  await writeFile(corrupt, 'not an image');
  await assert.rejects(
    syncProjectImages({ projectsDir, outputFile }),
    /broken.jpg: cannot read this image/,
  );
  assert.equal(await readFile(outputFile, 'utf8'), '{"previous":"safe"}\n');
  await rm(corrupt);
  const validPng = await image('gallery/valid.png');
  const wrongType = path.join(galleryDir, 'mislabeled.jpg');
  await writeFile(wrongType, await readFile(validPng));
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /file content must match its extension/,
  );
  await rm(wrongType);
  await writeFile(path.join(galleryDir, 'drawing.svg'), '<svg />');
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /drawing.svg: unsupported file type/,
  );
});

void test('malformed metadata, missing files and unknown fields give specific feedback', async (t) => {
  const { projectsDir, projectDir, image } = await fixture(t);
  await image('gallery/1-room.jpg');
  const metadataFile = path.join(projectDir, 'metadata.json');
  for (const [content, expected] of [
    ['{broken', /invalid JSON/],
    ['null', /use an object keyed by gallery filename/],
    ['[]', /use an object keyed by gallery filename/],
    ['{"missing.jpg": {}}', /no matching image in gallery/],
    ['{"1-room.jpg": {"caption": "Room"}}', /unknown field "caption"/],
    ['{"1-room.jpg": {"alt": ""}}', /"alt" must be a non-empty string/],
    [
      '{"1-room.jpg": {"objectPosition": "url(example.com)"}}',
      /objectPosition must use/,
    ],
  ]) {
    await writeFile(metadataFile, content);
    await assert.rejects(scanProjectImages({ projectsDir }), expected);
  }
});

void test('nested galleries and unknown project folders fail instead of silently omitting photos', async (t) => {
  const { projectsDir, galleryDir } = await fixture(t);
  const nested = path.join(galleryDir, 'more-photos');
  await mkdir(nested);
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /nested folders and symbolic links are not supported/,
  );
  await rmdir(nested);
  await mkdir(path.join(projectsDir, 'unknown-project'));
  await assert.rejects(
    scanProjectImages({ projectsDir }),
    /expected a project folder/,
  );
});

void test('sync writes generated data only when photos or metadata actually change', async (t) => {
  const { root, projectsDir, image } = await fixture(t);
  const outputFile = path.join(root, 'generated', 'images.json');
  await image('gallery/1-room.jpg');
  const first = await syncProjectImages({ projectsDir, outputFile });
  const firstStat = await stat(outputFile);
  assert.deepEqual(JSON.parse(await readFile(outputFile, 'utf8')), first);
  const unchanged = await syncProjectImages({ projectsDir, outputFile });
  assert.deepEqual(unchanged, first);
  assert.equal((await stat(outputFile)).mtimeMs, firstStat.mtimeMs);
  await image('gallery/2-detail.jpg');
  const updated = await syncProjectImages({ projectsDir, outputFile });
  assert.equal(updated[PROJECT_SLUGS[0]].gallery.length, 2);
});

void test('replacing photo pixels under the same filename and dimensions refreshes every image URL', async (t) => {
  const { root, projectsDir, image } = await fixture(t);
  const outputFile = path.join(root, 'generated', 'images.json');
  await image('hero.jpg');
  await image('gallery/1-room.jpg');
  const first = (await syncProjectImages({ projectsDir, outputFile }))[
    PROJECT_SLUGS[0]
  ];
  await image('hero.jpg', { background: '#36442c' });
  await image('gallery/1-room.jpg', { background: '#36442c' });
  const updated = (await syncProjectImages({ projectsDir, outputFile }))[
    PROJECT_SLUGS[0]
  ];
  assert.equal(updated.gallery[0].title, first.gallery[0].title);
  assert.equal(updated.gallery[0].aspect, first.gallery[0].aspect);
  assert.equal(updated.gallery[0].width, first.gallery[0].width);
  assert.equal(updated.gallery[0].height, first.gallery[0].height);
  assert.notEqual(updated.gallery[0].blurDataURL, first.gallery[0].blurDataURL);
  for (const [before, after] of [
    [first.hero, updated.hero],
    [first.gallery[0].src, updated.gallery[0].src],
  ]) {
    const beforeUrl = new URL(before, 'https://example.test');
    const afterUrl = new URL(after, 'https://example.test');
    assert.equal(afterUrl.pathname, beforeUrl.pathname);
    assert.notEqual(
      afterUrl.searchParams.get('v'),
      beforeUrl.searchParams.get('v'),
    );
  }
  assert.deepEqual(
    JSON.parse(await readFile(outputFile, 'utf8'))[PROJECT_SLUGS[0]],
    updated,
  );
});
