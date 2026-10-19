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
    width?: number;
    height?: number;
    blurDataURL?: string;
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
      'A duplex salon where warm timber, sculptural screens and illuminated arched mirrors bring the spaces together. Terracotta styling chairs and soft pink details give each service area its own character. Integrated display shelves and dedicated nail, pedicure, wash and treatment areas balance a welcoming atmosphere with everyday function.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [
      {
        title: 'Reception and styling floor',
        alt: 'Salon reception with a fluted timber counter, orange styling chairs and illuminated arched mirrors.',
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
    slug: 'ratnagiri-1bhk',
    number: '06',
    title: 'Ratnagiri 1BHK residence',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '1BHK apartment',
    location: 'Ratnagiri, Maharashtra',
    area: '',
    style: 'Warm contemporary',
    coverLabel: '1BHK',
    description:
      'Cream cabinetry, warm timber accents and layered lighting connect the living, dining and kitchen spaces of this one-bedroom home. A timber-framed kitchen opening brings definition to the shared spaces, while soft pink textiles and integrated storage give the bedroom a warm, settled character.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [],
  },
  {
    slug: 'wakad-3bhk',
    number: '07',
    title: 'Wakad 3BHK residence',
    category: 'Interiors',
    typology: 'Residential',
    propertyType: '3BHK apartment',
    location: 'Wakad, Pune',
    area: '',
    style: 'Contemporary',
    coverLabel: '3BHK',
    description:
      'A light palette runs through this three-bedroom home, with pale tiled floors, grey seating and warm timber framing. White kitchen cabinetry and a peninsula with a fluted timber face continue the material language, while recessed ceiling lighting adds definition to the living space.',
    drawing: 'perspective',
    hero: null,
    thumbnail: null,
    hover: null,
    before: null,
    after: null,
    gallery: [],
  },
  {
    slug: 'nerul-workspace',
    number: '08',
    title: 'Plan S office',
    category: 'Interiors',
    typology: 'Workplace',
    propertyType: 'Office interior',
    location: 'Nerul, Navi Mumbai',
    area: '',
    style: 'Contemporary',
    coverLabel: 'Office',
    description:
      'Warm timber finishes and stone-effect surfaces bring a consistent character to the shared workstations, private cabin and meeting room. A blue sofa marks the reception area, while glass partitions, pale floors and integrated lighting connect the spaces throughout the office.',
    drawing: 'perspective',
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
// Illustrative stock references are used only when project photography is unavailable.
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
      ...(hasPhotography ? [] : references).map((image) => ({
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
