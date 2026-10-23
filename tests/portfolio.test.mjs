import test from 'node:test';
import assert from 'node:assert/strict';
import {
  browseProjects,
  collectionPage,
  matchesProjectFilter,
  pageNumbers,
  GALLERY_PAGE_SIZE,
} from '../lib/portfolio.ts';

// These records exist only in this test; no invented projects enter the website.
const archive = Array.from({ length: 25 }, (_, index) => ({
  title: `Project ${index + 1}`,
  typology: index % 2 ? 'Workplace' : 'Residential',
  location: index % 3 ? 'Mumbai' : 'Ratnagiri',
  propertyType: 'Apartment',
  style: index % 2 ? 'Contemporary' : 'Minimal',
  area: '800 sq. ft.',
}));

void test('25 projects remain reachable across five bounded pages without duplicates', () => {
  const visited = [];
  for (let page = 1; page <= 5; page++) {
    const result = browseProjects(archive, { page });
    assert.equal(result.pageCount, 5);
    assert.ok(result.items.length <= 6);
    assert.equal(result.first, (page - 1) * 6 + 1);
    visited.push(...result.items);
  }
  assert.deepEqual(visited, archive);
  assert.equal(browseProjects(archive, { page: 5 }).last, 25);
});

void test('category and multi-word search combine, ignore case/space, and clamp a stale page', () => {
  const result = browseProjects(archive, {
    filter: 'Residential',
    query: '  RATNAGIRI   minimal ',
    page: 5,
  });
  assert.deepEqual(
    result.items.map((p) => p.title),
    ['Project 1', 'Project 7', 'Project 13', 'Project 19', 'Project 25'],
  );
  assert.equal(result.page, 1);
  assert.equal(result.pageCount, 1);
  assert.equal(browseProjects(archive, { query: '  ' }).total, 25);
});

void test('Architecture includes Patwardhan while Parijat remains a residential interior project', () => {
  const collection = [
    {
      ...archive[0],
      title: 'Patwardhan House',
      category: 'Architecture',
      area: '3,000 sq. ft. built-up area',
    },
    { ...archive[0], title: 'Parijat bungalow', category: 'Interiors' },
    { ...archive[0], title: 'Apartment interior', category: 'Interiors' },
    { ...archive[1], title: 'Bank interior', category: 'Interiors' },
  ];

  const architecture = browseProjects(collection, { filter: 'Architecture' });
  assert.deepEqual(
    architecture.items.map((project) => project.title),
    ['Patwardhan House'],
  );
  assert.equal(
    collection.filter((project) =>
      matchesProjectFilter(project, 'Architecture'),
    ).length,
    architecture.total,
  );
  assert.equal(browseProjects(collection, { filter: 'Residential' }).total, 3);
  assert.equal(browseProjects(collection, { filter: 'Workplace' }).total, 1);
  assert.equal(browseProjects(collection, { filter: 'All projects' }).total, 4);

  const searched = browseProjects(collection, {
    filter: 'Architecture',
    query: '  HOUSE  3,000 ',
    page: 99,
  });
  assert.equal(searched.total, 1);
  assert.equal(searched.items[0].title, 'Patwardhan House');
  assert.equal(searched.page, 1);
  assert.equal(
    browseProjects(collection, { query: 'architecture residential' }).total,
    1,
  );
  assert.equal(
    browseProjects(collection, { filter: 'Architecture', query: 'bank' }).total,
    0,
  );
});

void test('empty results and malformed page inputs have safe boundaries', () => {
  assert.deepEqual(collectionPage([], 99), {
    items: [],
    page: 1,
    pageCount: 1,
    total: 0,
    first: 0,
    last: 0,
  });
  assert.equal(browseProjects(archive, { query: 'not-a-project' }).total, 0);
  assert.equal(collectionPage(archive, -3).page, 1);
  assert.equal(collectionPage(archive, NaN).page, 1);
  assert.equal(collectionPage(archive, 999).page, 5);
});

void test('24 and 25 gallery images have at most six thumbnails per set, all reachable', () => {
  for (const count of [24, 25]) {
    const images = Array.from({ length: count }, (_, i) => i);
    const visited = [];
    for (let page = 1; page <= Math.ceil(count / GALLERY_PAGE_SIZE); page++) {
      const result = collectionPage(images, page, GALLERY_PAGE_SIZE);
      assert.ok(result.items.length <= GALLERY_PAGE_SIZE);
      visited.push(...result.items);
    }
    assert.deepEqual(visited, images);
    assert.equal(collectionPage(images, 99, GALLERY_PAGE_SIZE).last, count);
  }
});

void test('numbered controls stay bounded for larger portfolios', () => {
  assert.deepEqual(pageNumbers(1, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(pageNumbers(50, 100), [48, 49, 50, 51, 52]);
  assert.deepEqual(pageNumbers(100, 100), [96, 97, 98, 99, 100]);
});
