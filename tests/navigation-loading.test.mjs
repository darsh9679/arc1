import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import ts from 'typescript';

function compile(path) {
  return ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
}
const component = compile('../components/motion-provider.tsx');
const loader = compile('../lib/loader-progress.ts');

// Drive the real component's effects and loader clock without a browser renderer.
function harness(initialPath = '/', reducedMotion = false) {
  const hooks = [],
    pendingEffects = [],
    listeners = new Map(),
    attached = new Set();
  const animations = [],
    timers = new Map(),
    frames = new Map();
  const manualNavigations = [],
    linkNavigations = [];
  let pathname = initialPath,
    hookIndex = 0,
    clockId = 0;
  const bar = { value: 0, setAttribute() {} };
  const counter = { textContent: '0%' };
  const curtain = {
    style: {},
    querySelector: (selector) => (selector === 'progress' ? bar : counter),
  };
  const cursor = {};
  const OpeningSequence = () => {};
  const setTimer = (callback, delay) => {
    const id = ++clockId;
    timers.set(id, { callback, delay });
    return id;
  };
  const document = {
    visibilityState: 'visible',
    getElementById: () => ({ focus() {} }),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name, callback) => {
      if (listeners.get(name) === callback) listeners.delete(name);
    },
  };
  const window = {
    location: new URL(initialPath, 'https://studio.example'),
    matchMedia: () => ({ matches: reducedMotion }),
    setTimeout: setTimer,
    clearTimeout: (id) => timers.delete(id),
    requestAnimationFrame: (callback) => {
      const id = ++clockId;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  const globals = {
    window,
    document,
    URL,
    setTimeout: setTimer,
    clearTimeout: window.clearTimeout,
  };
  const loaderExports = {};
  new Script(loader).runInNewContext({ ...globals, exports: loaderExports });
  const apply = (target, values) => {
    for (const key of ['y', 'yPercent', 'progress'])
      if (key in values) target[key] = values[key];
  };
  const animate = (kind, target, values) => {
    const animation = { kind, target, values, killed: false, completed: false };
    animations.push(animation);
    return animation;
  };
  const gsap = {
    matchMedia: () => ({ add() {}, revert() {} }),
    killTweensOf: (target) => {
      for (const animation of animations)
        if (animation.target === target && !animation.completed)
          animation.killed = true;
    },
    set: apply,
    to: (target, values) => animate('to', target, values),
    fromTo: (target, from, to) => {
      apply(target, from);
      return animate('fromTo', target, to);
    },
  };
  const exports = {};
  new Script(component).runInNewContext({
    ...globals,
    exports,
    require(name) {
      if (name === 'react/jsx-runtime')
        return {
          jsx: (type, props) => ({ type, props }),
          jsxs: (type, props) => ({ type, props }),
        };
      if (name === 'react')
        return {
          useCallback: (callback) => callback,
          useRef: (value) => {
            const index = hookIndex++;
            return (hooks[index] ??= { current: value });
          },
          useState: (initializer) => {
            const index = hookIndex++;
            hooks[index] ??= {
              value:
                typeof initializer === 'function' ? initializer() : initializer,
            };
            return [hooks[index].value, () => {}];
          },
          useEffect: (effect, deps) => {
            const index = hookIndex++,
              previous = hooks[index];
            if (
              !previous ||
              deps.some((value, i) => !Object.is(value, previous.deps[i]))
            ) {
              hooks[index] = { deps };
              pendingEffects.push(() => {
                previous?.cleanup?.();
                hooks[index].cleanup = effect();
              });
            }
          },
        };
      if (name === 'next/navigation')
        return {
          usePathname: () => pathname,
          useRouter: () => ({ push: (url) => manualNavigations.push(url) }),
        };
      if (name === 'lenis') return class {};
      if (name === '@/lib/motion')
        return {
          gsap,
          ScrollTrigger: { refresh() {} },
          desktopMotion: 'desktop',
        };
      if (name === '@/lib/loader-progress') return loaderExports;
      if (name === '@/components/opening-sequence') return { OpeningSequence };
      if (name === '@/components/brand-logo') return { BrandLogo: () => {} };
      if (name === '@/components/scroll-reveals')
        return { ScrollReveals: () => {} };
      if (name === '@/components/scroll-lock-context')
        return { ScrollLockContext: { Provider: 'provider' } };
      assert.equal(name, './opening-sequence.module.css');
      return {};
    },
  });
  const visitTree = (tree, visitor) => {
    if (!tree || typeof tree !== 'object') return;
    if (Array.isArray(tree)) {
      tree.forEach((child) => visitTree(child, visitor));
      return;
    }
    visitor(tree);
    visitTree(tree.props?.children, visitor);
  };
  const render = (nextPath = pathname) => {
    pathname = nextPath;
    window.location = new URL(nextPath, window.location);
    hookIndex = 0;
    const tree = exports.MotionProvider({ children: 'Page content' });
    let intro;
    visitTree(tree, (node) => {
      if (node.props?.ref) {
        const target =
          node.props.className === 'route-curtain' ? curtain : cursor;
        node.props.ref.current = target;
        if (!attached.has(target) && node.props.style)
          Object.assign((target.style ??= {}), node.props.style);
        attached.add(target);
      }
      if (node.type === OpeningSequence) intro = node.props.autoPlay;
    });
    while (pendingEffects.length) pendingEffects.shift()();
    return { intro };
  };
  const click = (href, options = {}) => {
    const {
      target: anchorTarget = '',
      attributes = [],
      ...eventOptions
    } = options;
    const anchor = {
      href: new URL(href, window.location).href,
      target: anchorTarget,
      hasAttribute: (name) => attributes.includes(name),
    };
    const event = {
      button: 0,
      defaultPrevented: false,
      target: { closest: () => anchor },
      preventDefault() {
        this.defaultPrevented = true;
      },
      ...eventOptions,
    };
    listeners.get('click')?.(event);
    return event;
  };
  const completeAnimation = (predicate) => {
    const animation = animations.find(
      (item) => !item.killed && !item.completed && predicate(item),
    );
    assert.ok(animation, 'Expected a pending animation');
    animation.completed = true;
    apply(animation.target, animation.values);
    animation.values.onUpdate?.();
    animation.values.onComplete?.();
  };
  render();
  return {
    render,
    click,
    animations,
    timers,
    curtain,
    bar,
    counter,
    manualNavigations,
    linkNavigations,
    completeAnimation,
    finishLink(event, href) {
      if (!event.defaultPrevented) linkNavigations.push(href);
    },
    frame() {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback());
    },
    timer(delay) {
      const entry = [...timers].find(([, timer]) => timer.delay === delay);
      assert.ok(entry, `Expected a ${delay}ms timer`);
      timers.delete(entry[0]);
      entry[1].callback();
    },
  };
}

void test('Link can navigate once immediately while its curtain animation is still pending', () => {
  const h = harness();
  const event = h.click('/work');
  assert.equal(event.defaultPrevented, false);
  h.finishLink(event, '/work');
  assert.deepEqual(h.linkNavigations, ['/work']);
  assert.equal(
    h.animations.some((animation) => !animation.completed),
    true,
  );
  assert.deepEqual(h.manualNavigations, []);
  h.completeAnimation(({ kind }) => kind === 'fromTo');
  assert.deepEqual(h.manualNavigations, []);
  assert.deepEqual(h.linkNavigations, ['/work']);
});

void test('modified clicks, external links, fragments and opted-out anchors keep their normal behavior', () => {
  const cases = [
    ['/studio', { ctrlKey: true }],
    ['/studio', { metaKey: true }],
    ['/studio', { shiftKey: true }],
    ['/studio', { altKey: true }],
    ['/studio', { button: 1 }],
    ['/studio', { defaultPrevented: true }],
    ['https://outside.example/studio', {}],
    ['/#studio', {}],
    ['/studio', { target: '_blank' }],
    ['/studio', { attributes: ['download'] }],
    ['/studio', { attributes: ['data-no-transition'] }],
  ];
  for (const [href, options] of cases) {
    const h = harness(),
      event = h.click(href, options);
    assert.equal(event.defaultPrevented, Boolean(options.defaultPrevented));
    assert.equal(
      h.animations.length,
      0,
      'Excluded anchors must not start a curtain',
    );
    assert.equal(h.timers.size, 0);
    assert.deepEqual(h.manualNavigations, []);
  }
  const reduced = harness('/', true);
  assert.equal(reduced.click('/studio').defaultPrevented, false);
  assert.equal(reduced.animations.length, 0);
});

void test('automatic introduction follows the initial entry rather than each internal route', () => {
  const home = harness('/');
  assert.equal(home.render('/').intro, false);
  assert.equal(home.render('/studio').intro, false);
  assert.equal(home.render('/contact').intro, false);
  const directStudio = harness('/studio');
  assert.equal(directStudio.render('/studio').intro, true);
  assert.equal(directStudio.render('/').intro, true);
  assert.equal(directStudio.render('/work').intro, true);
});

void test('an immediately committed route paints 100 percent before releasing its curtain', () => {
  const h = harness();
  h.click('/work');
  h.render('/work');
  assert.equal(
    [...h.timers.values()].some(({ delay }) => delay === 3500),
    false,
  );
  h.completeAnimation(({ values }) => values.progress === 100);
  assert.equal(h.bar.value, 100);
  assert.equal(h.counter.textContent, '100%');
  assert.equal(h.curtain.style.visibility, 'visible');
  h.frame();
  h.frame();
  assert.equal(h.curtain.style.visibility, 'visible');
  h.timer(220);
  h.completeAnimation(({ values }) => values.yPercent === -100);
  assert.equal(h.curtain.style.visibility, 'hidden');
  assert.equal(h.curtain.style.pointerEvents, 'none');
});
