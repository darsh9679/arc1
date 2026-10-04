import test from 'node:test';
import assert from 'node:assert/strict';
import {
  holdLoaderCompletion,
  updateLoaderProgress,
} from '../lib/loader-progress.ts';

function fixture(initial = 0) {
  const attributes = new Map();
  const bar = {
    value: initial,
    setAttribute: (name, value) => attributes.set(name, value),
  };
  const counter = { textContent: `${initial}%` };
  const root = {
    querySelector: (selector) => (selector === 'progress' ? bar : counter),
  };
  let now = 0;
  let nextId = 0;
  let hidden = false;
  const frames = new Map();
  const timers = new Map();
  const clock = {
    requestFrame(callback) {
      const id = ++nextId;
      frames.set(id, callback);
      return id;
    },
    cancelFrame(id) {
      frames.delete(id);
    },
    setTimer(callback, delay) {
      const id = ++nextId;
      timers.set(id, { at: now + delay, callback });
      return id;
    },
    clearTimer(id) {
      timers.delete(id);
    },
    isHidden: () => hidden,
  };
  return {
    root,
    bar,
    counter,
    attributes,
    clock,
    hide() {
      hidden = true;
    },
    frame() {
      const current = [...frames.values()];
      frames.clear();
      for (const callback of current) callback();
    },
    advance(milliseconds) {
      const end = now + milliseconds;
      for (;;) {
        const due = [...timers]
          .filter(([, timer]) => timer.at <= end)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!due) break;
        const [id, timer] = due;
        timers.delete(id);
        now = timer.at;
        timer.callback();
      }
      now = end;
    },
    pending: () => frames.size + timers.size,
  };
}

await test('a cached route at 35% paints 100% before it can start exiting', () => {
  const f = fixture(35);
  let exits = 0;
  holdLoaderCompletion(f.root, () => exits++, f.clock);
  assert.equal(f.bar.value, 100);
  assert.equal(f.counter.textContent, '100%');
  assert.equal(f.attributes.get('aria-valuetext'), '100% complete');
  assert.equal(exits, 0);
  f.frame();
  f.advance(500);
  assert.equal(exits, 0, 'the first frame must not dismiss the loader');
  f.frame();
  f.advance(219);
  assert.equal(exits, 0, '100% remains visible during the hold');
  f.advance(1);
  assert.equal(exits, 1);
  assert.equal(f.pending(), 0);
});

await test('a stalled intro at 30% cannot skip the completion paint when its timeout fires', () => {
  const f = fixture();
  updateLoaderProgress(f.root, 30);
  let exits = 0;
  holdLoaderCompletion(f.root, () => exits++, f.clock);
  f.advance(2600); // Simulate a foreground browser that has not produced a frame.
  assert.equal(f.counter.textContent, '100%');
  assert.equal(exits, 0);
  f.frame();
  f.frame();
  f.advance(220);
  assert.equal(exits, 1);
});

await test('skip or teardown cancels pending completion and cannot dismiss a later replay', () => {
  const f = fixture(30);
  let exits = 0;
  const cancel = holdLoaderCompletion(f.root, () => exits++, f.clock);
  f.frame();
  cancel();
  f.frame();
  f.advance(5000);
  assert.equal(exits, 0);
  assert.equal(f.pending(), 0);
});

await test('a tab hidden after completion does not retain a lock while its frames are paused', () => {
  const f = fixture(35);
  let exits = 0;
  holdLoaderCompletion(f.root, () => exits++, f.clock);
  f.hide();
  f.advance(1200);
  assert.equal(exits, 1);
  assert.equal(f.pending(), 0);
});

await test('completion in an already hidden tab releases immediately and only once', () => {
  const f = fixture(35);
  f.hide();
  let exits = 0;
  const cancel = holdLoaderCompletion(f.root, () => exits++, f.clock);
  cancel();
  f.frame();
  f.advance(5000);
  assert.equal(exits, 1);
  assert.equal(f.pending(), 0);
});
