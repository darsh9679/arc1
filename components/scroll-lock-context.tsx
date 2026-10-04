'use client';

import { createContext, useContext } from 'react';

/** Acquire a smooth-scroll lock; the returned release function is idempotent. */
export type AcquireScrollLock = () => () => void;

export const ScrollLockContext = createContext<AcquireScrollLock | null>(null);

export function useScrollLock() {
  const acquire = useContext(ScrollLockContext);
  if (!acquire) throw new Error('Scroll locks require MotionProvider.');
  return acquire;
}
