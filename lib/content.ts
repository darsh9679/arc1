import type { DrawingVariant } from '@/components/placeholder-image';
import { conceptImages } from '@/lib/imagery';
import projectImages from '@/lib/project-images.generated.json';
import projectReferences from '@/lib/project-references.generated.json';

/** Client-approved facts only. Null values intentionally do not render as invented details. */
export const studio = {
  name: 'Trayaksh Architeqts',
  principal: 'Ar. Sharvari Pawaskar',
  title:
    'Founder | Architect | Interior Designer | M.Arch. (Project Management) | Vastu Shastra Consultant',
  city: 'Mumbai',
  instagram: 'https://www.instagram.com/trayaksh_architeqts/',
  handle: '@trayaksh_architeqts',
  logoSrc: '/brand/trayaksh-horizontal.svg',
  logoStackedSrc: '/brand/trayaksh-stacked.svg',
  portraitSrc: '/images/studio/founder-sharvari-portrait-v1.webp' as
    | string
    | null,
  portraitIsPlaceholder: false,
  email: null as string | null,
  phone: '9890849232',
  phoneHref: '+919890849232',
  address: '3rd Floor, Vidya Bhuvan,\nShivaji Park, Dadar West,\nMumbai',
  practiceAreas: ['Mumbai', 'Navi Mumbai', 'Ratnagiri', 'Pune', 'Pan India'],
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Vidya%20Bhuvan%2C%20Shivaji%20Park%2C%20Dadar%20West%2C%20Mumbai&z=16&output=embed',
  mapSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Vidya%20Bhuvan%2C%20Shivaji%20Park%2C%20Dadar%20West%2C%20Mumbai',
};
export const award = {
  name: 'Trusted & Innovative Architect & Designer of the Year 2025 – Maharashtra',
  category: 'Excellent Consultancy Category',
  event: 'Design & Vision D&V’25 Built Environment Leadership Awards',
  location: 'Goa',
  date: '28 November 2025',
  presenter: 'Padma Shri Architect G. Shankar',
};
export type Project = {
  slug: string;
  number: string;
  title: string;
  category: 'Architecture' | 'Interiors';
  typology: 'Workplace' | 'Residential' | 'Hospitality';
  propertyType: string;
  location: string;
  area: string;
  style: string;
  coverLabel?: string;
  description: string;
  drawing: DrawingVariant;
  hero: string | null;
  thumbnail: string | null;
  thumbnailPosition?: string;
  hover: string | null;
  before: string | null;
  after: string | null;
  photographyAdded?: boolean;
  gallery: {
    title: string;
    alt?: string;
    src: string | null;
    sourceUrl?: string;
    isReference?: boolean;
    objectPosition?: string;
    variant: DrawingVariant;
    aspect: 'landscape' | 'portrait' | 'square';
  }[];
};
const projectRecords: Project[] = [
  {
    slug: 'ghatkopar-apartment',
    number: '01',
    title: 'Warmth in the everyday',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '2BHK apartment',
    location: 'Ghatkopar, Mumbai',
    area: '555 sq. ft. carpet area',
    style: 'Minimal',
    description:
      'Designed and executed as a warm, minimal home with a focus on comfort and everyday functionality. Soft neutral tones, natural wood and subtle blue accents bring a calm, timeless character to the space. Thoughtful storage, natural light and simple detailing make the most of the available area.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [
      {
        title: 'Living and dining',
        alt: 'Warm timber joinery and a calm living and dining space in a Ghatkopar apartment.',
        src: null,
        variant: 'perspective',
        aspect: 'landscape',
      },
    ],
  },
  {
    slug: 'ratnagiri-apartment',
    number: '02',
    title: 'A home with character',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '2BHK apartment',
    location: 'Ratnagiri, Maharashtra',
    area: '900 sq. ft.',
    style: 'Contemporary with bold accents',
    description:
      'A contemporary two-bedroom home designed to feel warm and easy to live in. Bold orange accents bring personality to the interiors, balanced by wood tones and earthy neutrals. A TV unit and swing create a welcoming focal point, while clean lines and natural light keep the home feeling open and comfortable.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [
      {
        title: 'Window seat',
        alt: 'A quiet window seat with teal cushions, plants and natural daylight in a Ratnagiri apartment.',
        src: null,
        variant: 'perspective',
        aspect: 'landscape',
      },
    ],
  },
  {
    slug: 'anagha-salon',
    number: '03',
    title: 'Anagha’s Salon & Academy',
    category: 'Interiors',
    typology: 'Hospitality',
    propertyType: 'Salon & academy',
    location: 'Juinagar, Navi Mumbai',
    area: '550 sq. ft. duplex',
    style: 'Contemporary',
    description:
      'A compact duplex salon where colour, warmth and function work together. Deep teal furniture brings character, balanced by warm wood and a soft neutral palette. Open shelving, mirrors and carefully planned lighting keep the space bright and practical.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [
      {
        title: 'Salon floor',
        alt: 'Teal salon chairs, mirrors and open shelving arranged across the bright salon floor.',
        src: null,
        variant: 'perspective',
        aspect: 'landscape',
      },
    ],
  },
  {
    slug: 'andheri-apartment',
    number: '04',
    title: 'A quieter kind of home',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '2BHK apartment',
    location: 'Andheri, Mumbai',
    area: '650 sq. ft.',
    style: 'Contemporary minimal',
    description:
      'A home shaped by warm wood, beige and muted olive. Light-toned furniture and marble surfaces keep the palette fresh, while warmer finishes add depth and texture. Minimal detailing lets the materials speak without making the rooms feel overdesigned.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [
      {
        title: 'Living room',
        alt: 'A warm, understated living room with light upholstery and timber finishes in an Andheri apartment.',
        src: null,
        variant: 'perspective',
        aspect: 'landscape',
      },
    ],
  },
  {
    slug: 'thane-apartment',
    number: '05',
    title: 'Modern Classic, made livable',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '2BHK apartment',
    location: 'Thane, Maharashtra',
    area: '900 sq. ft.',
    style: 'Modern Classic',
    description:
      'A contemporary home balancing elegance, warmth and everyday comfort. Cream, beige, warm wood and subtle teal create a fresh atmosphere, while marble detailing, refined gold accents and layered lighting bring depth to the interiors.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [
      {
        title: 'Living and media wall',
        alt: 'A Modern Classic living room with teal seating, marble-look detailing, warm timber and layered lighting.',
        src: null,
        variant: 'perspective',
        aspect: 'landscape',
      },
    ],
  },
  {
    slug: 'dahisar-3bhk',
    number: '06',
    title: 'Japandi, with a bohemian edge',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '3BHK apartment',
    location: 'Dahisar East, Mumbai',
    area: '910 sq. ft. carpet area',
    style: 'Japandi · Boho · Minimal',
    coverLabel: '3BHK',
    description:
      'A three-bedroom home bringing the calm simplicity of Japandi design together with the warmth of Boho elements. A neutral base, natural textures and carefully selected materials create interest without overwhelming the rooms. Personal artefacts, artwork and client-specific touches give the home its own character.',
    drawing: 'plan',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [],
  },
  {
    slug: 'vikhroli-bank',
    number: '07',
    title: 'A more welcoming branch',
    category: 'Interiors',
    typology: 'Workplace',
    propertyType: 'Bank interior',
    location: 'Vikhroli, Mumbai',
    area: '550 sq. ft.',
    style: 'Contemporary',
    coverLabel: 'Bank',
    description:
      'A contemporary bank interior designed to feel professional, welcoming and vibrant. A bright white and marble-look base is balanced with teal accents and warm oak tones, bringing clarity and comfort to the compact space.',
    drawing: 'detail',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [],
  },
];
type ProjectPhotoSet = {
  hero?: string;
  thumbnail?: string;
  hover?: string;
  before?: string;
  after?: string;
  gallery?: Omit<Project['gallery'][number], 'variant'>[];
};

// The project-photo manifest is shared by server pages and interactive portfolio cards.
// Illustrative stock references are appended from their own separate manifest below.
const photoSets = projectImages as Record<string, ProjectPhotoSet>;
const referenceSets = projectReferences as Record<
  string,
  Omit<Project['gallery'][number], 'variant'>[]
>;
export const projects: Project[] = projectRecords.map((project) => {
  const photoSet = photoSets[project.slug];
  const photos: ProjectPhotoSet = photoSet ?? {};
  const references = referenceSets[project.slug] ?? [];
  if (!photoSet && !references.length) return project;
  const gallery = photos.gallery?.map((image) => ({
    ...image,
    variant: project.drawing,
  }));
  const hero = photos.hero || gallery?.[0]?.src || photos.thumbnail;
  const hasPair = Boolean(photos.before && photos.after);
  const hasPhotography = Boolean(
    hero || photos.hover || photos.before || photos.after,
  );
  const projectGallery = gallery?.length
    ? gallery
    : hero
      ? [
          {
            title: 'The wider view',
            alt: `${project.title}: project overview`,
            src: hero,
            variant: project.drawing,
            aspect: 'landscape' as const,
          },
        ]
      : project.gallery;
  return {
    ...project,
    hero: hero || project.hero,
    thumbnail: photos.thumbnail || hero || project.thumbnail,
    thumbnailPosition: '50% 50%',
    hover: photos.hover || (hero ? gallery?.[1]?.src || hero : project.hover),
    // Never combine a supplied photograph with a fictional concept comparison.
    before: hasPair ? photos.before! : hasPhotography ? null : project.before,
    after: hasPair ? photos.after! : hasPhotography ? null : project.after,
    photographyAdded: hasPhotography,
    gallery: [
      ...projectGallery,
      ...references.map((image) => ({
        ...image,
        variant: project.drawing,
        isReference: true,
      })),
    ],
  };
});

export const processSteps = [
  {
    title: 'Understand',
    subtitle: '01 / We begin by listening',
    text: 'Understanding the client’s requirements, lifestyle, aspirations, budget and expectations.',
    drawing: 'plan' as const,
    src: null,
  },
  {
    title: 'Observe',
    subtitle: '02 / Site & surroundings',
    text: 'We study the site and its surroundings—the orientation, climate, context, light, views, existing conditions and opportunities.',
    drawing: 'elevation' as const,
    src: conceptImages.residence.src,
  },
  {
    title: 'Envision',
    subtitle: '03 / Design direction',
    text: 'The information comes together to form a design direction that responds to both the practical and experiential aspects of the project.',
    drawing: 'perspective' as const,
    src: conceptImages.workspace.src,
  },
  {
    title: 'Develop',
    subtitle: '04 / Planning & detail',
    text: 'The concept is translated into detailed planning, materials, lighting, furniture, architecture and technical documentation.',
    drawing: 'detail' as const,
    src: conceptImages.detail.src,
  },
  {
    title: 'Coordinate',
    subtitle: '05 / Design & execution',
    text: 'Design and execution are coordinated across consultants, contractors, vendors and site teams.',
    drawing: 'plan' as const,
    src: null,
  },
  {
    title: 'Realise',
    subtitle: '06 / Drawings become space',
    text: 'The final stage is where drawings become space—and the design begins to become part of everyday life.',
    drawing: 'perspective' as const,
    src: conceptImages.living.src,
  },
];
