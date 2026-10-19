import test from 'node:test';
import assert from 'node:assert/strict';
import { unstable_getResponseFromNextConfig } from 'next/experimental/testing/server.js';
import nextConfig from '../next.config.ts';

const origin = 'https://trayaksharchiteqts.com';
const photo = '/images/projects/ghatkopar-apartment/gallery/room.webp';

async function headersFor(path) {
  const response = await unstable_getResponseFromNextConfig({
    url: `${origin}${path}`,
    nextConfig,
  });
  return response.headers;
}

void test('content-versioned project photos receive a long browser cache', async () => {
  const headers = await headersFor(`${photo}?v=a2b7ed302af9`);
  assert.equal(headers.get('cache-control'), 'public, max-age=31536000, immutable');
  assert.equal(headers.get('x-content-type-options'), 'nosniff');
});

void test('unversioned and invalidly versioned photos retain default revalidation', async () => {
  for (const suffix of [
    '',
    '?v=',
    '?v=a2b7ed302af',
    '?v=a2b7ed302af90',
    '?v=not-a-hash',
    '?v=a2b7ed302afz',
    '?v=prefix-a2b7ed302af9',
  ]) {
    const headers = await headersFor(`${photo}${suffix}`);
    assert.equal(headers.get('cache-control'), null, suffix);
  }
});

void test('the photo cache rule does not apply to pages, APIs, or other images', async () => {
  for (const path of [
    '/',
    '/work/ghatkopar-apartment?v=a2b7ed302af9',
    '/contact?v=a2b7ed302af9',
    '/api/enquiry?v=a2b7ed302af9',
    '/images/studio/founder.webp?v=a2b7ed302af9',
    '/_next/image?url=%2Fimages%2Fprojects%2Ftest.webp%3Fv%3Da2b7ed302af9&w=750&q=75',
  ]) {
    const headers = await headersFor(path);
    assert.equal(headers.get('cache-control'), null, path);
  }
});
