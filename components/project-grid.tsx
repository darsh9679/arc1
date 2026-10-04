'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { ScrollTrigger } from '@/lib/motion';
import { PlaceholderImage } from '@/components/placeholder-image';
import { projects, type Project } from '@/lib/content';
import { isConceptImage } from '@/lib/imagery';
import { browseProjects, pageNumbers } from '@/lib/portfolio';
import styles from './project-grid.module.css';

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const concept = isConceptImage(project.thumbnail);
  return (
    <article className="project-card">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="View ↗"
        aria-label={`${project.title} — ${project.typology}, ${project.location} — view project`}
      >
        <div
          className={`project-visual ${!project.thumbnail ? 'project-visual-editorial' : ''}`}
        >
          {project.thumbnail ? (
            <PlaceholderImage
              src={project.thumbnail}
              sizes="(max-width: 560px) 100vw, (max-width: 1050px) 50vw, 33vw"
              objectPosition={project.thumbnailPosition}
              variant={project.drawing}
              alt={
                project.gallery[0]?.alt ||
                `${project.title}, ${project.typology.toLowerCase()} interior.`
              }
              priority={priority}
            />
          ) : (
            <div className="project-editorial-cover" aria-hidden="true">
              <span className="project-cover-kicker">
                {project.propertyType} / {project.area}
              </span>
              <strong>{project.coverLabel || 'Interior'}</strong>
              <span className="project-cover-style">{project.style}</span>
              <span className="project-cover-location">{project.location}</span>
            </div>
          )}
          <span className="project-number" aria-hidden="true">
            {project.number}
          </span>
          <span className="project-status">
            {concept
              ? 'Design study'
              : project.thumbnail
                ? 'Selected project'
                : 'Project story'}
          </span>
        </div>
        <div className="project-caption">
          <div>
            <p className="eyebrow">
              {project.propertyType} / {project.style}
            </p>
            <h3>{project.title}</h3>
            <p className="project-location">
              {project.location} <span>·</span> {project.area}
            </p>
          </div>
          <span className="project-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ProjectGrid({
  filterable = false,
  limit,
}: {
  filterable?: boolean;
  limit?: number;
}) {
  if (filterable) return <PortfolioBrowser />;
  return (
    <div
      className="project-grid featured-grid"
      onFocusCapture={(event) => {
        const rail = event.currentTarget;
        const card = (event.target as HTMLElement).closest('.project-card');
        if (!card || getComputedStyle(rail).overflowX !== 'auto') return;
        // Run after native focus scrolling, and move only this horizontal rail.
        requestAnimationFrame(() => {
          const frame = rail.getBoundingClientRect();
          const item = card.getBoundingClientRect();
          if (item.left < frame.left || item.right > frame.right) {
            rail.scrollTo({
              left: rail.scrollLeft + item.left - frame.left,
              behavior: 'instant',
            });
          }
        });
      }}
    >
      {(limit ? projects.slice(0, limit) : projects).map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

function PortfolioBrowser() {
  const [filter, setFilter] = useState('All projects');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const results = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const result = browseProjects(projects, { filter, query, page });
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter, query, result.page]);
  const filters = [
    'All projects',
    ...new Set(projects.map((project) => project.typology)),
  ];
  const changePage = (next: number) => {
    setPage(next);
    // Move keyboard focus back to the new results without losing the filter/search controls.
    results.current?.focus({ preventScroll: true });
    results.current?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };
  const reset = () => {
    setFilter('All projects');
    setQuery('');
    setPage(1);
  };
  return (
    <div className={styles.browser} ref={results} tabIndex={-1}>
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">The project collection</p>
          <h2>
            Selected <em>work.</em>
          </h2>
        </div>
        <div className={styles.search}>
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="portfolio-search">
            Search projects
          </label>
          <input
            ref={search}
            id="portfolio-search"
            type="search"
            value={query}
            placeholder="Search a place, style or project"
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear project search"
              onClick={() => {
                setQuery('');
                setPage(1);
                search.current?.focus();
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <div className={styles.toolbar}>
        <select
          className={styles.mobileFilter}
          aria-label="Filter projects"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setPage(1);
          }}
        >
          {filters.map((item) => (
            <option key={item} value={item}>
              {item} (
              {item === 'All projects'
                ? projects.length
                : projects.filter((project) => project.typology === item)
                    .length}
              )
            </option>
          ))}
        </select>
        <fieldset className={styles.filters}>
          <legend className="sr-only">Filter projects</legend>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              aria-controls="portfolio-results"
              onClick={() => {
                setFilter(item);
                setPage(1);
              }}
            >
              {item}
              <span>
                {item === 'All projects'
                  ? projects.length
                  : projects.filter((p) => p.typology === item).length}
              </span>
            </button>
          ))}
        </fieldset>
        <output className={styles.status} aria-live="polite" aria-atomic="true">
          {result.total
            ? `${result.first === result.last ? result.first : `${result.first}–${result.last}`} of ${result.total} ${result.total === 1 ? 'project' : 'projects'}`
            : 'No matching projects'}
        </output>
      </div>
      <div
        id="portfolio-results"
        className={styles.grid}
        key={`${filter}-${query}-${result.page}`}
      >
        {result.items.map((project, index) => (
          <div
            key={project.slug}
            className={styles.card}
            style={{ '--card-order': index } as CSSProperties}
          >
            <ProjectCard project={project} priority={index < 3} />
          </div>
        ))}
      </div>
      {!result.total && (
        <div className={styles.empty}>
          <h3>No projects found.</h3>
          <p>Try another location or style, or explore the full collection.</p>
          <button type="button" onClick={reset}>
            View all projects <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
      {result.pageCount > 1 && (
        <nav className={styles.pagination} aria-label="Project pages">
          <button
            type="button"
            disabled={result.page === 1}
            onClick={() => changePage(result.page - 1)}
            aria-label="Previous project page"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Previous</span>
          </button>
          <div className={styles.pageNumbers}>
            {pageNumbers(result.page, result.pageCount).map((number) => (
              <button
                type="button"
                key={number}
                aria-label={`Project page ${number}`}
                aria-current={number === result.page ? 'page' : undefined}
                onClick={() => changePage(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={result.page === result.pageCount}
            onClick={() => changePage(result.page + 1)}
            aria-label="Next project page"
          >
            <span>Next</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p>
            Page {result.page} of {result.pageCount}
          </p>
        </nav>
      )}
    </div>
  );
}
