'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from 'react';
import { ArrowUpRight } from 'lucide-react';
import { clientCopy } from '@/lib/client-copy';
import projectImages from '@/lib/project-images.generated.json';
import { gsap } from '@/lib/motion';
import styles from './spotlight-hero.module.css';

const sceneProjects = [
  {
    slug: 'thane-apartment',
    title: 'Thane apartment',
    location: 'Thane, Maharashtra',
    desktopPosition: '50% 55%',
    mobilePosition: '54% 50%',
  },
  {
    slug: 'andheri-apartment',
    title: 'Andheri apartment',
    location: 'Andheri, Mumbai',
    desktopPosition: '50% 58%',
    mobilePosition: '54% 55%',
  },
  {
    slug: 'ghatkopar-apartment',
    title: 'Ghatkopar apartment',
    location: 'Ghatkopar, Mumbai',
    desktopPosition: '50% 55%',
    mobilePosition: '58% 50%',
  },
  {
    slug: 'ratnagiri-apartment',
    title: 'Ratnagiri apartment',
    location: 'Ratnagiri, Maharashtra',
    desktopPosition: '50% 55%',
    mobilePosition: '45% 50%',
  },
  {
    slug: 'anagha-salon',
    title: 'Anagha’s Salon & Academy',
    location: 'Juinagar, Navi Mumbai',
    desktopPosition: '50% 50%',
    mobilePosition: '60% 50%',
  },
] as const;
const scenes = sceneProjects.map((project) => ({
  ...projectImages[project.slug].gallery[0],
  ...project,
  mobileSrc: `/images/mobile-hero/${project.slug}-portrait-v1.webp`,
  portraitPosition: project.slug === 'thane-apartment' ? '50% 35%' : '50% 65%',
  mobileAlt: `AI portrait visualization inspired by the ${project.title} interior; extended and recomposed from the original project photograph.`,
  href: `/work/${project.slug}`,
}));
const SCENE_DURATION = 6500;

export function SpotlightHero() {
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [loaded, setLoaded] = useState(() => scenes.map(() => false));
  const ready = loaded.every(Boolean);
  const motionPlaying = !paused && !reduced && inView && visible;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const phone = window.matchMedia('(width < 600px)');
    const updatePreference = () => setReduced(preference.matches);
    const updatePhone = () => setIsPhone(phone.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updatePreference();
    updatePhone();
    updateVisibility();
    preference.addEventListener('change', updatePreference);
    phone.addEventListener('change', updatePhone);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15),
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      preference.removeEventListener('change', updatePreference);
      phone.removeEventListener('change', updatePhone);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!motionPlaying || !ready) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % scenes.length),
      SCENE_DURATION,
    );
    return () => clearTimeout(timer);
  }, [active, motionPlaying, ready]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const entrance = gsap.fromTo(
        node.querySelectorAll('[data-hero-reveal]'),
        { y: 14 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          paused: true,
        },
      );
      const reveal = () => entrance.restart();
      const introTimer = window.setTimeout(() => {
        if (!document.querySelector('.opening-sequence')) reveal();
      }, 120);
      window.addEventListener('trayaksh:intro-complete', reveal);
      return () => {
        clearTimeout(introTimer);
        window.removeEventListener('trayaksh:intro-complete', reveal);
        entrance.kill();
      };
    });
    return () => media.revert();
  }, []);

  function markLoaded(index: number) {
    setLoaded((previous) =>
      previous[index]
        ? previous
        : previous.map((value, position) => position === index || value),
    );
  }
  function changeScene(direction: number) {
    setActive((index) => (index + direction + scenes.length) % scenes.length);
    setPaused(true);
  }
  function beginSwipe(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStart.current =
      event.touches.length === 1
        ? { x: touch.clientX, y: touch.clientY }
        : null;
  }
  function finishSwipe(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2)
      changeScene(dx < 0 ? 1 : -1);
  }
  const scene = scenes[active];

  return (
    <section
      ref={root}
      className={styles.hero}
      aria-labelledby="home-hero-title"
      data-motion={motionPlaying ? 'playing' : 'paused'}
      data-scene={scene.slug}
      data-slide={active + 1}
      data-slideshow={motionPlaying && ready ? 'playing' : 'paused'}
    >
      <div
        className={styles.background}
        onTouchStart={beginSwipe}
        onTouchEnd={finishSwipe}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        {scenes.map((image, index) => (
          <div
            className={styles.scene}
            key={image.src}
            data-active={index === active}
            aria-hidden={index !== active}
            style={
              {
                '--desktop-position': image.desktopPosition,
                '--mobile-position': image.mobilePosition,
                '--portrait-position': image.portraitPosition,
              } as CSSProperties
            }
          >
            <picture className={styles.picture}>
              <source
                media="(width < 600px)"
                type="image/webp"
                srcSet={image.mobileSrc}
              />
              <Image
                src={image.src}
                alt={isPhone ? image.mobileAlt : image.alt}
                fill
                sizes="100vw"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                onLoad={() => markLoaded(index)}
                className={styles.photograph}
                draggable={false}
              />
            </picture>
          </div>
        ))}
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <p className={styles.topline}>
        Mumbai & Ratnagiri <span>Architecture · Interiors</span>
      </p>
      <div className={styles.content} data-hero-content>
        <p className={styles.eyebrow} data-hero-reveal>
          Architecture & interiors
        </p>
        <h1
          id="home-hero-title"
          className={styles.title}
          aria-label={clientCopy.brand.tagline}
          data-hero-reveal
        >
          Design that sees
          <br />
          beyond the <em>obvious.</em>
        </h1>
        <p className={styles.description} data-hero-reveal>
          Considered spaces. A better way to live.
        </p>
        <div className={styles.actions} data-hero-reveal>
          <Link className={styles.primaryAction} href="/work">
            Explore our work <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link
            className={styles.secondaryAction}
            href="/contact#project-enquiry"
          >
            Begin your project <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.footer} data-hero-footer>
        <Link className={styles.projectCredit} href={scene.href}>
          <span className={styles.creditLabel}>
            {isPhone ? 'AI portrait visual' : 'In focus'}
          </span>
          <span>
            {scene.location} <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </Link>
        <fieldset className={styles.slideshow}>
          <legend className="sr-only">Choose a featured project image</legend>
          {scenes.map((image, index) => (
            <button
              key={image.slug}
              type="button"
              aria-label={`Show ${image.title} image`}
              aria-pressed={active === index}
              onClick={() => {
                setActive(index);
                setPaused(true);
              }}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </fieldset>
      </div>
    </section>
  );
}
