import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:3000';
const photoSets = JSON.parse(
  await readFile(
    new URL('../lib/project-images.generated.json', import.meta.url),
    'utf8',
  ),
);
const projectDefaults = {
  'nerul-workspace': {
    hero: 'workspace-wide',
    galleryCount: 4,
    interiors: true,
  },
  'residential-architecture': {
    hero: 'courtyard-residence',
    galleryCount: 3,
    interiors: false,
  },
  'residential-interiors': {
    hero: 'living-room',
    galleryCount: 3,
    interiors: true,
  },
  'hospitality-architecture': {
    hero: 'hospitality-court',
    galleryCount: 3,
    interiors: false,
  },
};
const decodeHtml = (value) =>
  value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named = {
      '&amp;': '&',
      '&quot;': '"',
      '&apos;': "'",
      '&lt;': '<',
      '&gt;': '>',
    };
    if (entity.toLowerCase() in named) return named[entity.toLowerCase()];
    return String.fromCodePoint(
      entity[2].toLowerCase() === 'x'
        ? parseInt(entity.slice(3, -1), 16)
        : parseInt(entity.slice(2, -1), 10),
    );
  });
const attribute = (markup, name) => {
  const value = markup.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  return value === undefined ? undefined : decodeHtml(value);
};
const imageSource = (image) => {
  const src = attribute(image, 'src');
  if (!src) return null;
  const url = new URL(src, origin);
  return url.pathname === '/_next/image'
    ? url.searchParams.get('url')
    : `${url.pathname}${url.search}`;
};
const expectedProject = (slug) => {
  const defaults = projectDefaults[slug];
  const photos = photoSets[slug] ?? {};
  const suppliedHero =
    photos.hero || photos.gallery?.[0]?.src || photos.thumbnail;
  return {
    ...defaults,
    photos,
    hero: suppliedHero || `/images/concepts/${defaults.hero}.webp`,
    galleryCount:
      photos.gallery?.length || (suppliedHero ? 1 : defaults.galleryCount),
    photographyAdded: Boolean(
      suppliedHero || photos.hover || photos.before || photos.after,
    ),
  };
};
const paths = [
  '/',
  '/studio',
  '/work',
  '/recognition',
  '/contact',
  '/work/nerul-workspace',
  '/work/residential-architecture',
  '/work/residential-interiors',
  '/work/hospitality-architecture',
];
const pages = await Promise.all(
  paths.map(async (path) => {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    const headingLevels = [...html.matchAll(/<h([1-6])\b/g)].map((match) =>
      Number(match[1]),
    );
    assert.equal(
      headingLevels.filter((level) => level === 1).length,
      1,
      `${path} needs exactly one h1`,
    );
    for (let index = 1; index < headingLevels.length; index++)
      assert.ok(
        headingLevels[index] <= headingLevels[index - 1] + 1,
        `${path} must not skip heading levels`,
      );
    assert.match(
      html,
      /id="main-content"/,
      `${path} needs skip-link destination`,
    );
    assert.match(
      html,
      /<title>[^<]*Trayaksh Architeqts[^<]*<\/title>/,
      `${path} needs its own branded title`,
    );
    assert.doesNotMatch(
      html,
      /<title>(?:Untitled|Create Next|Building your site)/,
    );
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<meta property="og:title" content="[^"]+"/);
    assert.match(html, /<meta name="twitter:title" content="[^"]+"/);
    if (path.startsWith('/work/')) {
      const project = expectedProject(path.split('/').at(-1));
      const imageMeta = html.match(/<meta property="og:image"[^>]*>/)?.[0];
      assert.ok(imageMeta, `${path} should share its own hero`);
      const heroUrl = new URL(attribute(imageMeta, 'content'), origin);
      assert.equal(
        `${heroUrl.pathname}${heroUrl.search}`,
        project.hero,
        `${path} should share the selected project hero`,
      );
      if (project.hero.startsWith('/images/concepts/')) {
        assert.match(
          html,
          /<meta property="og:image:alt" content="AI-generated/,
        );
        assert.match(html, /AI concept imagery/);
      } else {
        assert.doesNotMatch(
          html,
          /<meta property="og:image:alt" content="AI-generated/,
        );
        const description = html.match(/<meta name="description"[^>]*>/)?.[0];
        assert.doesNotMatch(
          attribute(description, 'content'),
          /Imagery is AI-generated concept artwork/,
        );
      }
    } else
      assert.match(html, /<meta property="og:image" content="[^"]+\/og.png"/);
    console.log(`PASS ${path}: status, heading and metadata`);
    return [path, html];
  }),
);
const nerul = pages.find(([path]) => path === '/work/nerul-workspace')[1];
const work = pages.find(([path]) => path === '/work')[1];
// Check rendered content, excluding Next's serialized hydration data.
const markupFor = (path) =>
  pages
    .find(([pagePath]) => pagePath === path)[1]
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
const textFor = (path) =>
  markupFor(path)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
const studioMarkup = markupFor('/studio');
const studioText = textFor('/studio');
assert.match(textFor('/'), /Design that sees beyond the obvious\./);
assert.match(studioText, /Three-Eyed Vision/);
assert.match(
  studioText,
  /2018 graduate of Rachana Sansad's Academy of Architecture, Mumbai/,
);
assert.match(
  studioText,
  /University Topper in Semester X and later pursued an M\.Arch in Project Management, Mumbai/,
);
const processTitles = [
  ...studioMarkup.matchAll(
    /<article class="process-card">[\s\S]*?<h3>([^<]+)<\/h3>/g,
  ),
].map((match) => match[1]);
assert.deepEqual(processTitles, [
  'Understand',
  'Observe',
  'Envision',
  'Develop',
  'Coordinate',
  'Realise',
]);
assert.match(textFor('/work'), /10\+ Projects completed/);
assert.equal(
  (
    markupFor('/work').match(
      /<span class="project-status">Placeholder project<\/span>/g,
    ) || []
  ).length,
  3,
  'The completed-project total must not turn reserved stories into confirmed case studies',
);
for (const path of paths.filter(
  (path) => path.startsWith('/work/') && path !== '/work/nerul-workspace',
)) {
  assert.match(textFor(path), /Placeholder case study/);
  assert.match(textFor(path), /Reserved for a future story/);
  if (
    expectedProject(path.split('/').at(-1)).hero.startsWith('/images/concepts/')
  )
    assert.match(textFor(path), /AI concept imagery/);
}
const contactMarkup = markupFor('/contact');
const formMarkup = contactMarkup.match(
  /<form\b[^>]*class="[^"]*\benquiry-form\b[^"]*"[^>]*>[\s\S]*?<\/form>/,
)?.[0];
assert.ok(formMarkup, 'Contact page should render the enquiry form');
const enquiryFields = [
  ...formMarkup.matchAll(
    /<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"[^>]*>/g,
  ),
]
  .map((match) => match[1])
  .filter((name) => name !== 'website');
assert.deepEqual(
  enquiryFields.sort(),
  [
    'name',
    'contactNumber',
    'email',
    'location',
    'projectType',
    'approximateArea',
    'projectStage',
    'approximateBudget',
    'interest',
    'message',
  ].sort(),
  'All ten client-requested enquiry fields should be present',
);
for (const field of enquiryFields)
  assert.ok(
    formMarkup.includes(`for="${field}"`),
    `${field} needs an associated label`,
  );
assert.match(contactMarkup, /href="tel:\+919890849232"/);
assert.match(
  textFor('/contact'),
  /3rd Floor, Vidya Bhuvan, Shivaji Park, Dadar West, Mumbai/,
);
assert.match(textFor('/contact'), /Online delivery is not configured yet/);
console.log(
  'PASS client copy, six-stage process, founder credentials, reserved project disclosures and ten-field enquiry',
);
assert.match(work, /<h2 class="sr-only">Project index<\/h2>/);
assert.match(nerul, /31st floor/);
assert.match(nerul, /DY Patil Stadium/);
for (const slug of Object.keys(projectDefaults)) {
  const project = expectedProject(slug);
  const markup = markupFor(`/work/${slug}`);
  const range = (markup.match(/<input\b[^>]*>/g) || []).find((input) =>
    input.includes('type="range"'),
  );
  const hasComparison =
    Boolean(project.photos.before && project.photos.after) ||
    (project.interiors && !project.photographyAdded);
  if (hasComparison) {
    assert.ok(range, `${slug} needs a real range input for its paired images`);
    assert.match(range, /aria-label="Before and after image comparison"/);
    assert.match(range, /aria-describedby="comparison-help"/);
    assert.match(range, /aria-valuetext="50% before, 50% after"/);
  } else {
    assert.equal(
      range,
      undefined,
      `${slug} must not show an unpaired or inapplicable comparison`,
    );
  }
  const frames = [
    ...markup.matchAll(
      /<figure\b[^>]*class="[^"]*\bfilm-frame\b[^"]*"[^>]*>[\s\S]*?<\/figure>/g,
    ),
  ].map((match) => match[0]);
  assert.equal(
    frames.length,
    project.galleryCount,
    `${slug} should render every gallery entry`,
  );
  const suppliedGallery = project.photos.gallery?.length
    ? project.photos.gallery
    : project.hero.startsWith('/images/projects/')
      ? [{ src: project.hero }]
      : [];
  for (const [index, supplied] of suppliedGallery.entries()) {
    const image = frames[index].match(/<img\b[^>]*>/)?.[0];
    assert.ok(image, `${slug} gallery image ${index + 1} should render`);
    assert.equal(
      imageSource(image),
      supplied.src,
      `${slug} gallery order should match the manifest`,
    );
    if (supplied.alt)
      assert.equal(
        attribute(image, 'alt'),
        supplied.alt,
        `${slug} should preserve the supplied image description`,
      );
    const caption =
      frames[index].match(/<figcaption>[\s\S]*?<\/figcaption>/)?.[0] ?? '';
    const captionText = decodeHtml(caption.replace(/<[^>]+>/g, ' ')).replace(
      /\s+/g,
      ' ',
    );
    assert.ok(
      captionText.includes(`${String(index + 1).padStart(2, '0')} /`),
      `${slug} gallery numbering should remain correct beyond nine images`,
    );
    if (supplied.title)
      assert.ok(
        captionText.includes(supplied.title),
        `${slug} should display its supplied caption`,
      );
  }
}
console.log(
  'PASS project photo selection, gallery counts/order/descriptions and paired comparison accessibility',
);
assert.equal(
  (await fetch(new URL('/work/nonexistent-project', origin))).status,
  404,
);
assert.equal((await fetch(new URL('/unrecognised-page', origin))).status, 404);
assert.equal((await fetch(new URL('/api/enquiry', origin))).status, 405);
const form = await fetch(new URL('/api/enquiry', origin), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{}',
});
assert.equal(
  form.status,
  503,
  'Smoke checks require delivery to remain disabled',
);
assert.match((await form.json()).error, /not been sent/i);
assert.equal((await fetch(new URL('/og.png', origin))).status, 200);
assert.equal((await fetch(new URL('/icon.svg', origin))).status, 200);
const imageNames = [
  'workspace-wide',
  'workspace-before',
  'living-room',
  'living-room-before',
  'courtyard-residence',
  'hospitality-court',
  'material-detail',
];
for (const name of imageNames) {
  const asset = await fetch(new URL(`/images/concepts/${name}.webp`, origin));
  assert.equal(asset.status, 200, `${name} should be available`);
  assert.match(asset.headers.get('content-type') || '', /image\/webp/);
  assert.ok(
    Number(asset.headers.get('content-length')) > 10000,
    `${name} should contain the generated image`,
  );
}
const imageResponse = await fetch(
  new URL(
    '/_next/image?url=%2Fimages%2Fconcepts%2Fworkspace-wide.webp&w=1080&q=75',
    origin,
  ),
);
assert.equal(
  imageResponse.status,
  200,
  'Responsive image optimisation should work',
);
assert.match(imageResponse.headers.get('content-type') || '', /image\//);
for (const [path, html] of pages) {
  const imagery = (html.match(/<img\b[^>]*>/g) || []).filter((img) =>
    imageSource(img)?.startsWith('/images/'),
  );
  const generated = imagery.filter((img) =>
    imageSource(img)?.startsWith('/images/concepts/'),
  );
  if (path !== '/contact')
    assert.ok(
      imagery.length > 0,
      `${path} should display concept or supplied project images`,
    );
  for (const img of generated)
    assert.match(
      img,
      /alt="AI-generated/,
      'Generated images must have truthful alternative text',
    );
}
const suppliedSources = new Set(
  Object.values(photoSets)
    .flatMap((photos) => [
      photos.hero,
      photos.thumbnail,
      photos.hover,
      photos.before,
      photos.after,
      ...(photos.gallery ?? []).map((image) => image.src),
    ])
    .filter(Boolean),
);
for (const src of suppliedSources) {
  const response = await fetch(new URL(src, origin));
  assert.equal(response.status, 200, `${src} should be available`);
  assert.match(response.headers.get('content-type') || '', /image\//);
  assert.ok(
    Number(response.headers.get('content-length')) > 0,
    `${src} should contain an image`,
  );
}
console.log(
  'PASS 404s, disabled delivery, concept and supplied assets, responsive image delivery and provenance',
);
