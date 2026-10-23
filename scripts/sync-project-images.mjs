import {
  readFile,
  readdir,
  mkdir,
  writeFile,
  rename,
  unlink,
} from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

export const PROJECT_SLUGS = [
  'nerul-workspace',
  'residential-architecture',
  'residential-interiors',
  'hospitality-architecture',
  'ghatkopar-apartment',
  'ratnagiri-apartment',
  'anagha-salon',
  'andheri-apartment',
  'thane-apartment',
  'dahisar-3bhk',
  'vikhroli-bank',
  'ratnagiri-1bhk',
  'wakad-3bhk',
  'parijat-bungalow',
  'vishwabharti-bank',
  'patwardhan-house',
];

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const roles = new Set(['hero', 'thumbnail', 'hover', 'before', 'after']);
const ignoredFiles = new Set([
  '.gitkeep',
  '.DS_Store',
  'Thumbs.db',
  'README.md',
]);
const naturalOrder = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});
const positionToken =
  '(?:left|center|right|top|bottom|-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:%|px))';
const objectPositionPattern = new RegExp(
  `^${positionToken}(?: ${positionToken})?$`,
  'i',
);

function fail(relativePath, message) {
  throw new Error(`${relativePath}: ${message}`);
}

async function entries(directory) {
  try {
    return await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

function urlSegment(value) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function imageUrl(slug, version, ...segments) {
  return `/images/projects/${[slug, ...segments].map(urlSegment).join('/')}?v=${version}`;
}

function titleFromFilename(filename) {
  const title = path
    .basename(filename, path.extname(filename))
    .replace(/^\d+[\s._-]*/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return title ? title[0].toUpperCase() + title.slice(1) : 'Project view';
}

function requireImageFile(entry, relativePath) {
  if (!entry.isFile()) {
    fail(
      relativePath,
      'use a regular image file; nested folders and symbolic links are not supported.',
    );
  }
  if (!imageExtensions.has(path.extname(entry.name).toLowerCase())) {
    fail(
      relativePath,
      'unsupported file type. Use JPG, JPEG, PNG, WebP or AVIF.',
    );
  }
}

async function inspectImage(file, relativePath) {
  try {
    // Buffer input also releases Windows file handles immediately, so a photo
    // can be replaced after syncing while the development server stays open.
    const buffer = await readFile(file);
    const image = sharp(buffer, { failOn: 'error' });
    const metadata = await image.metadata();
    const expectedFormat = {
      '.jpg': 'jpeg',
      '.jpeg': 'jpeg',
      '.png': 'png',
      '.webp': 'webp',
      '.avif': 'heif',
    }[path.extname(file).toLowerCase()];
    if (metadata.format !== expectedFormat || (metadata.pages ?? 1) > 1) {
      throw new Error(
        'file content must match its extension and be a still image',
      );
    }
    // Decode pixels as well as headers, and publish a tiny preview without
    // rewriting the supplied photo. A preview can appear before its full image
    // finishes downloading; dimensions let contain viewers request the right size.
    const preview = await image
      .rotate()
      .resize(16, 16, { fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#eceee8' })
      .jpeg({ quality: 35 })
      .toBuffer();
    const rotates = [5, 6, 7, 8].includes(metadata.orientation);
    const width = rotates ? metadata.height : metadata.width;
    const height = rotates ? metadata.width : metadata.height;
    if (!width || !height)
      throw new Error('the image has no readable dimensions');
    const ratio = width / height;
    return {
      aspect: ratio > 1.1 ? 'landscape' : ratio < 0.9 ? 'portrait' : 'square',
      width,
      height,
      blurDataURL: `data:image/jpeg;base64,${preview.toString('base64')}`,
      // Changed image bytes produce a new Next.js image optimization cache key,
      // even when a replacement retains the same filename and dimensions.
      version: createHash('sha256').update(buffer).digest('hex').slice(0, 12),
    };
  } catch (error) {
    fail(
      relativePath,
      `cannot read this image (${error.message}). Export a valid JPG, JPEG, PNG, WebP or AVIF and try again.`,
    );
  }
}

async function readMetadata(directory, slug, galleryNames) {
  const metadataPath = path.join(directory, 'metadata.json');
  let metadata;
  try {
    metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    fail(`${slug}/metadata.json`, `invalid JSON (${error.message}).`);
  }
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    fail(`${slug}/metadata.json`, 'use an object keyed by gallery filename.');
  }
  for (const [filename, details] of Object.entries(metadata)) {
    const label = `${slug}/metadata.json → ${filename}`;
    if (!galleryNames.has(filename)) {
      fail(
        label,
        'no matching image in gallery/. Use the exact filename, including its extension.',
      );
    }
    if (!details || typeof details !== 'object' || Array.isArray(details)) {
      fail(label, 'image details must be an object.');
    }
    for (const [key, value] of Object.entries(details)) {
      if (!['title', 'alt', 'objectPosition'].includes(key)) {
        fail(
          label,
          `unknown field "${key}". Use title, alt or objectPosition.`,
        );
      }
      if (typeof value !== 'string' || !value.trim()) {
        fail(label, `"${key}" must be a non-empty string.`);
      }
      if (
        key === 'objectPosition' &&
        !objectPositionPattern.test(value.trim())
      ) {
        fail(
          label,
          'objectPosition must use one or two CSS positions, such as "50% 35%" or "center top".',
        );
      }
      if (key === 'title' && value.length > 160)
        fail(label, 'keep title under 160 characters.');
      if (key === 'alt' && value.length > 1000)
        fail(label, 'keep alt under 1000 characters.');
      details[key] = value.trim();
    }
  }
  return metadata;
}

/**
 * Discover project photos without writing files. Missing/empty folders leave no
 * overrides, so the site's existing concept imagery remains the fallback.
 */
export async function scanProjectImages({
  projectsDir = path.join(projectRoot, 'public', 'images', 'projects'),
} = {}) {
  const rootEntries = await entries(projectsDir);
  for (const entry of rootEntries) {
    if (ignoredFiles.has(entry.name) && entry.isFile()) continue;
    if (!PROJECT_SLUGS.includes(entry.name) || !entry.isDirectory()) {
      fail(
        entry.name,
        `expected a project folder: ${PROJECT_SLUGS.join(', ')}.`,
      );
    }
  }

  const result = {};
  for (const slug of PROJECT_SLUGS) {
    const directory = path.join(projectsDir, slug);
    const projectEntries = await entries(directory);
    const project = {};
    for (const entry of projectEntries) {
      const relativePath = `${slug}/${entry.name}`;
      if (ignoredFiles.has(entry.name) && entry.isFile()) continue;
      if (entry.name === 'metadata.json' && entry.isFile()) continue;
      if (entry.name === 'gallery' && entry.isDirectory()) continue;
      requireImageFile(entry, relativePath);
      const role = path
        .basename(entry.name, path.extname(entry.name))
        .toLowerCase();
      if (!roles.has(role)) {
        fail(
          relativePath,
          'name cover files hero, thumbnail, hover, before or after. Put all other project images in gallery/.',
        );
      }
      if (project[role])
        fail(
          relativePath,
          `duplicate ${role} image. Keep one file for each role.`,
        );
      const { version } = await inspectImage(
        path.join(directory, entry.name),
        relativePath,
      );
      project[role] = imageUrl(slug, version, entry.name);
    }
    // Avoid combining real photographs with a concept on the other slider side.
    if (Boolean(project.before) !== Boolean(project.after)) {
      fail(
        slug,
        'before and after must be supplied together, or both omitted.',
      );
    }

    const galleryEntries = (await entries(path.join(directory, 'gallery')))
      .filter((entry) => !(ignoredFiles.has(entry.name) && entry.isFile()))
      .sort(
        (left, right) =>
          naturalOrder.compare(left.name, right.name) ||
          left.name.localeCompare(right.name, 'en'),
      );
    const metadata = await readMetadata(
      directory,
      slug,
      new Set(galleryEntries.map((entry) => entry.name)),
    );
    const gallery = [];
    for (const entry of galleryEntries) {
      const relativePath = `${slug}/gallery/${entry.name}`;
      requireImageFile(entry, relativePath);
      const { aspect, width, height, blurDataURL, version } =
        await inspectImage(
          path.join(directory, 'gallery', entry.name),
          relativePath,
        );
      const details = metadata[entry.name] ?? {};
      const title = details.title ?? titleFromFilename(entry.name);
      gallery.push({
        src: imageUrl(slug, version, 'gallery', entry.name),
        title,
        alt: details.alt ?? title,
        aspect,
        width,
        height,
        blurDataURL,
        ...(details.objectPosition
          ? { objectPosition: details.objectPosition }
          : {}),
      });
    }
    if (gallery.length) project.gallery = gallery;
    if (Object.keys(project).length) result[slug] = project;
  }
  return result;
}

export async function syncProjectImages({
  projectsDir,
  outputFile = path.join(projectRoot, 'lib', 'project-images.generated.json'),
} = {}) {
  const result = await scanProjectImages({ projectsDir });
  const next = `${JSON.stringify(result, null, 2)}\n`;
  let previous;
  try {
    previous = await readFile(outputFile, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (previous !== next) {
    await mkdir(path.dirname(outputFile), { recursive: true });
    // A dev-server watcher must never read a partially written JSON manifest.
    const temporaryFile = `${outputFile}.${randomUUID()}.tmp`;
    try {
      await writeFile(temporaryFile, next, { encoding: 'utf8', flag: 'wx' });
      await rename(temporaryFile, outputFile);
    } finally {
      await unlink(temporaryFile).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
    }
  }
  return result;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const projects = await syncProjectImages();
    const galleries = Object.values(projects).reduce(
      (count, project) => count + (project.gallery?.length ?? 0),
      0,
    );
    console.log(
      `[project images] Synced ${Object.keys(projects).length} project photo folders and ${galleries} gallery images.`,
    );
    if (!Object.keys(projects).length)
      console.log(
        '[project images] No photos added yet; existing concept imagery is unchanged.',
      );
  } catch (error) {
    console.error(`[project images] ${error.message}`);
    process.exitCode = 1;
  }
}
