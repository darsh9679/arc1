import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { Script } from 'node:vm';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';
import ts from 'typescript';

const require = createRequire(import.meta.url);
function compile(relative) {
  const compiled = ts.transpileModule(
    readFileSync(new URL(relative, import.meta.url), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
  const exports = {};
  new Script(compiled).runInNewContext({
    exports,
    require(name) {
      if (name.endsWith('.module.css'))
        return {
          __esModule: true,
          default: new Proxy({}, { get: (_target, key) => String(key) }),
        };
      if (name === '@/components/scroll-lock-context')
        return { useScrollLock: () => () => () => {} };
      return require(name);
    },
  });
  return exports;
}
const { RecognitionMedia } = compile('../components/recognition-media.tsx');
const { recognitionPhotos, recognitionFilm } = compile(
  '../lib/recognition-media.ts',
);
const props = {
  photos: recognitionPhotos,
  videoSrc: recognitionFilm.src,
  videoPoster: recognitionFilm.poster,
  videoWidth: recognitionFilm.width,
  videoHeight: recognitionFilm.height,
  videoDuration: recognitionFilm.duration,
};

void test('initial recognition media renders photographs and a play button without mounting or preloading the MP4', () => {
  const html = renderToStaticMarkup(createElement(RecognitionMedia, props));
  assert.match(html, /aria-label="Watch the award moment"/);
  assert.doesNotMatch(html, /<video\b|<source\b|<audio\b|reg\.mp4/);
  for (const photo of recognitionPhotos) {
    assert.ok(html.includes(photo.caption));
    assert.ok(html.includes(photo.alt.replaceAll('&', '&amp;')));
  }
  assert.equal(
    (html.match(/aria-label="Enlarge photograph:/g) || []).length,
    recognitionPhotos.length,
  );
});

void test('the film preview remains available without any event photographs', () => {
  const html = renderToStaticMarkup(
    createElement(RecognitionMedia, { ...props, photos: [] }),
  );
  assert.match(html, /Watch the award moment/);
  assert.doesNotMatch(html, /Enlarge photograph|<video\b|reg\.mp4/);
});

void test('recognition photo files decode and match their declared dimensions without embedded EXIF', async () => {
  for (const photo of recognitionPhotos) {
    const bytes = readFileSync(
      new URL(`../public${photo.src}`, import.meta.url),
    );
    const info = await sharp(bytes).metadata();
    assert.equal(info.width, photo.width);
    assert.equal(info.height, photo.height);
    assert.equal(info.exif, undefined);
    await sharp(bytes).raw().toBuffer();
    assert.ok(bytes.length < 300_000, `${photo.src} stays compact`);
  }
  assert.ok(
    recognitionPhotos.some((photo) => photo.src === recognitionFilm.poster),
  );
  const film = readFileSync(
    new URL(`../public${recognitionFilm.src}`, import.meta.url),
  );
  assert.equal(film.toString('ascii', 4, 8), 'ftyp');
  assert.ok(
    film.includes(Buffer.from('avc1')),
    'supplied MP4 includes H.264 video',
  );
  assert.ok(film.length < 5_000_000, 'short original film remains below 5 MB');
});
