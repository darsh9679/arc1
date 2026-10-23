export const PORTFOLIO_PAGE_SIZE = 6;
export const GALLERY_PAGE_SIZE = 6;

export function collectionPage<T>(
  items: readonly T[],
  requestedPage = 1,
  size = 6,
) {
  const pageSize = Number.isFinite(size) ? Math.max(1, Math.floor(size)) : 6;
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Number.isFinite(requestedPage)
    ? Math.max(1, Math.min(pageCount, Math.floor(requestedPage)))
    : 1;
  const offset = (page - 1) * pageSize;
  return {
    items: items.slice(offset, offset + pageSize),
    page,
    pageCount,
    total,
    first: total ? offset + 1 : 0,
    last: Math.min(offset + pageSize, total),
  };
}

type SearchableProject = {
  title: string;
  category?: string;
  typology: string;
  location: string;
  propertyType: string;
  style: string;
  area: string;
};

/** Discipline and building-type filters share one matcher for results and counts. */
export function matchesProjectFilter(
  project: SearchableProject,
  filter: string,
) {
  return (
    filter === 'All projects' ||
    project.category === filter ||
    project.typology === filter
  );
}

export function browseProjects<T extends SearchableProject>(
  projects: readonly T[],
  { filter = 'All projects', query = '', page = 1 } = {},
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = projects.filter((project) => {
    if (!matchesProjectFilter(project, filter)) return false;
    const text = [
      project.title,
      project.category,
      project.typology,
      project.location,
      project.propertyType,
      project.style,
      project.area,
    ]
      .join(' ')
      .toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
  return collectionPage(matches, page, PORTFOLIO_PAGE_SIZE);
}

/** Keep the pager bounded even when the portfolio grows beyond twenty-five projects. */
export function pageNumbers(page: number, pageCount: number) {
  const first = Math.max(1, Math.min(page - 2, pageCount - 4));
  return Array.from(
    { length: Math.min(5, pageCount) },
    (_, index) => first + index,
  );
}
