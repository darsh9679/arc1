'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
export { gsap, ScrollTrigger };
export const desktopMotion =
  '(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
export const pinnedMotion = `${desktopMotion} and (min-height: 700px)`;
