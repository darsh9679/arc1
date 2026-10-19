import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(
  readFileSync(
    new URL('../components/use-gallery-navigation.ts', import.meta.url),
    'utf8',
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const photo = {
  src: '/images/projects/test/gallery/room.webp?v=photo-version',
  width: 1600,
  height: 2400,
  aspect: 'portrait',
};

function harness({ browser = true } = {}) {
  const images = [],
    requests = [],
    exports = {};
  class Image {
    constructor() {
      this.assignments = [];
      this.decoded = new Promise((resolve) => {
        this.finishDecode = resolve;
      });
      images.push(this);
    }
    decode() {
      return this.decoded;
    }
  }
  for (const name of ['sizes', 'srcset', 'src', 'fetchPriority']) {
    Object.defineProperty(Image.prototype, name, {
      get() {
        return this[`_${name}`];
      },
      set(value) {
        this.assignments.push({ name, value });
        this[`_${name}`] = value;
      },
    });
  }
  new Script(compiled).runInNewContext({
    exports,
    require(name) {
      if (name === 'react') return {};
      assert.equal(name, 'next/image');
      return {
        getImageProps(input) {
          requests.push(input);
          return {
            props: {
              src: `/optimized?src=${encodeURIComponent(input.src)}&w=1280`,
              srcSet: '/optimized?w=320 320w, /optimized?w=1280 1280w',
              sizes: input.sizes,
            },
          };
        },
      };
    },
    ...(browser
      ? {
          window: {
            Image,
            innerWidth: 1280,
            innerHeight: 800,
            devicePixelRatio: 2,
          },
        }
      : {}),
  });
  return { ...exports, images, requests };
}

void test('responsive sizes and srcSet are assigned before src starts the image request', async () => {
  for (const view of ['gallery', 'fullscreen']) {
    const h = harness();
    const pending = h.prepareGalleryImage(photo, view);
    const image = h.images[0],
      request = h.requests[0];
    assert.equal(image.sizes, h.galleryImageSizes(photo, view));
    assert.equal(image.sizes, request.sizes);
    assert.equal(
      image.srcset,
      '/optimized?w=320 320w, /optimized?w=1280 1280w',
    );
    assert.ok(image.src.includes(encodeURIComponent(photo.src)));
    const order = image.assignments.map(({ name }) => name);
    assert.ok(order.indexOf('sizes') < order.indexOf('src'));
    assert.ok(order.indexOf('srcset') < order.indexOf('src'));
    image.onload();
    image.finishDecode();
    assert.equal(await pending, true);
  }
});

void test('adjacent preload is deduplicated and becomes high priority when selected', async () => {
  const h = harness();
  const first = h.prepareGalleryImage(photo);
  assert.equal(h.images[0].fetchPriority, 'low');
  assert.equal(h.prepareGalleryImage(photo), first);
  const demand = h.prepareGalleryImage(photo, 'gallery', 'high');
  assert.equal(demand, first);
  assert.equal(h.images.length, 1);
  assert.equal(h.requests.length, 1);
  assert.equal(h.images[0].fetchPriority, 'high');
  h.images[0].onload();
  h.images[0].finishDecode();
  assert.equal(await demand, true);
  assert.equal(await h.prepareGalleryImage(photo), true);
  assert.equal(h.images.length, 1);
});

void test('a downloaded photo is not ready for navigation until decoding finishes', async () => {
  const h = harness();
  let ready = false;
  const pending = h.prepareGalleryImage(photo).then((result) => {
    ready = true;
    return result;
  });
  h.images[0].onload();
  await Promise.resolve();
  assert.equal(ready, false);
  h.images[0].finishDecode();
  assert.equal(await pending, true);
  assert.equal(ready, true);
});

void test('a failed request can be retried instead of remaining cached as a failure', async () => {
  const h = harness();
  const failed = h.prepareGalleryImage(photo);
  h.images[0].onerror();
  assert.equal(await failed, false);
  const retry = h.prepareGalleryImage(photo, 'gallery', 'high');
  assert.equal(h.images.length, 2);
  h.images[1].onload();
  h.images[1].finishDecode();
  assert.equal(await retry, true);
});

void test('drawings and server rendering create no image requests', async () => {
  for (const [h, item] of [
    [harness(), { ...photo, src: null }],
    [harness({ browser: false }), photo],
  ]) {
    assert.equal(await h.prepareGalleryImage(item), true);
    assert.equal(h.images.length, 0);
    assert.equal(h.requests.length, 0);
  }
});
