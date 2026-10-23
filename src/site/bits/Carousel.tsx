import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { prefersReducedMotion } from '@/site/lib/motion';

export interface CarouselItem {
  id: string;
  node: ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  /** Controlled slide. A change turns the cube. */
  index?: number;
  initialIndex?: number;
  onChange?: (index: number) => void;
  /**
   * False from the moment a turn starts until the spring has landed and the
   * pointer is up. Callers use this to keep foreign layers (map iframes) out
   * of the rotating face.
   */
  onSettledChange?: (settled: boolean) => void;
  radius?: number;
  /** Darkening of a face as it turns away. 0 keeps the slide’s own fill. */
  shade?: number;
  loop?: boolean;
  draggable?: boolean;
  className?: string;
  'aria-label'?: string;
}

type Settings = {
  count: number;
  width: number;
  cardWidth: number;
  loop: boolean;
  draggable: boolean;
  shade: number;
};

type Drag = {
  id: number;
  x: number;
  y: number;
  p: number;
  from: number;
  moved: boolean;
  samples: [number, number][];
};

type Engine = {
  goTo: (index: number) => void;
  sync: () => void;
};

const STIFFNESS = 150;
const DAMPING = 24;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (value: number, count: number) => ((value % count) + count) % count;
const nearest = (offset: number, count: number) => wrap(offset + count / 2, count) - count / 2;

const band = (value: number, max: number) => {
  if (value < 0) return -0.3 * (1 - Math.exp(value / 0.55));
  if (value > max) return max + 0.3 * (1 - Math.exp((max - value) / 0.55));
  return value;
};

const pose = (index: number, position: number, s: Settings) => {
  const offset = s.loop ? nearest(index - position, s.count) : index - position;
  const distance = Math.abs(offset);
  const near = Math.min(distance, 1);
  const half = s.cardWidth / 2;
  const turn = Math.sin(Math.PI * (position - Math.floor(position)));
  return {
    transform: `scale(${1 - 0.12 * turn}) translateZ(${-half}px) rotateY(${clamp(offset, -1, 1) * 90}deg) translateZ(${half}px)`,
    visible: distance < 1,
    layer: 10 - Math.min(9, Math.round(distance * 2)),
    shade: near * s.shade,
  };
};

const interactiveTarget = (event: Event) =>
  event.target instanceof Element &&
  Boolean(event.target.closest('a, button, input, textarea, select, iframe'));

/**
 * Cube carousel. No frame, arrows, or indicator — the page supplies its own
 * control. Drag and the cube spring match the React Bits carousel.
 */
export default function Carousel({
  items,
  index,
  initialIndex = 0,
  onChange,
  onSettledChange,
  radius = 14,
  shade = 0.6,
  loop = false,
  draggable = true,
  className = '',
  'aria-label': ariaLabel = 'Carousel',
}: CarouselProps) {
  const count = items.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const engineRef = useRef<Engine | null>(null);
  const onChangeRef = useRef(onChange);
  const onSettledRef = useRef(onSettledChange);

  const [size, setSize] = useState({ width: 320, height: 480 });
  const [active, setActive] = useState(() => clamp(Math.round(initialIndex), 0, Math.max(0, count - 1)));
  const startRef = useRef(active);
  const reportedRef = useRef(active);

  const cardWidth = Math.max(1, size.width);
  const cardHeight = Math.max(1, size.height);
  const settings: Settings = {
    count,
    width: cardWidth,
    cardWidth,
    loop: loop && count > 1,
    draggable: draggable && count > 1,
    shade,
  };
  const settingsRef = useRef(settings);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const box = stage.getBoundingClientRect();
      setSize({
        width: Math.max(1, Math.round(box.width)),
        height: Math.max(1, Math.round(box.height)),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    if (!root || !viewport) return undefined;

    const reduce = prefersReducedMotion();
    const state = {
      p: startRef.current,
      v: 0,
      target: startRef.current,
      shown: startRef.current,
      settled: true,
      holding: false,
      drag: null as Drag | null,
      wheeling: false,
      wheelTimer: 0,
      suppress: false,
      last: 0,
    };
    let raf = 0;
    let alive = true;

    const limit = (s: Settings, value: number) => (s.loop ? value : clamp(value, 0, s.count - 1));

    const publishSettled = (next: boolean) => {
      if (state.settled === next) return;
      state.settled = next;
      onSettledRef.current?.(next);
    };

    const apply = () => {
      const s = settingsRef.current;
      for (let i = 0; i < s.count; i++) {
        const slide = slideRefs.current[i];
        if (!slide) continue;
        const next = pose(i, state.p, s);
        slide.style.transform = next.transform;
        slide.style.visibility = next.visible ? 'visible' : 'hidden';
        slide.style.zIndex = String(next.layer);
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = String(next.shade);
      }
    };

    const announce = () => {
      const s = settingsRef.current;
      if (!s.count) return;
      const next = s.loop ? wrap(Math.round(state.target), s.count) : clamp(Math.round(state.target), 0, s.count - 1);
      if (next === state.shown) return;
      state.shown = next;
      setActive(next);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const dt = state.last ? Math.min(0.05, (now - state.last) / 1000) : 1 / 60;
      state.last = now;
      let busy = false;
      if (!state.drag?.moved && !state.wheeling) {
        if (reduce) {
          state.p = state.target;
          state.v = 0;
        } else {
          const steps = Math.ceil(dt * 240);
          const h = dt / steps;
          for (let k = 0; k < steps; k++) {
            state.v += (STIFFNESS * (state.target - state.p) - DAMPING * state.v) * h;
            state.p += state.v * h;
          }
          if (Math.abs(state.target - state.p) < 0.0004 && Math.abs(state.v) < 0.004) {
            state.p = state.target;
            state.v = 0;
          } else {
            busy = true;
          }
        }
        const s = settingsRef.current;
        if (!busy && s.loop && s.count) {
          state.target = wrap(Math.round(state.target), s.count);
          state.p = state.target;
        }
      }
      apply();
      const resting =
        !state.holding &&
        !state.drag?.moved &&
        !state.wheeling &&
        !busy &&
        Math.abs(state.target - state.p) < 0.0004;
      publishSettled(resting);
      if (busy || state.drag?.moved || state.wheeling) raf = requestAnimationFrame(tick);
      else state.last = 0;
    };

    const wake = () => {
      if (!raf && alive) raf = requestAnimationFrame(tick);
    };

    const moveTo = (target: number) => {
      const leaving = Math.abs(target - state.p) >= 0.0004;
      state.target = target;
      if (leaving) publishSettled(false);
      announce();
      apply();
      wake();
    };

    const goTo = (next: number) => {
      const s = settingsRef.current;
      if (!s.count) return;
      const goal = clamp(Math.round(next), 0, s.count - 1);
      const current = Math.round(state.target);
      const at =
        (s.loop ? wrap(current, s.count) : clamp(current, 0, s.count - 1)) === goal &&
        Math.abs(state.target - current) < 0.001 &&
        Math.abs(state.p - state.target) < 0.001;
      if (at) return;
      moveTo(s.loop ? current + nearest(goal - wrap(current, s.count), s.count) : goal);
    };

    const onPointerDown = (event: PointerEvent) => {
      const s = settingsRef.current;
      if (!s.draggable || (event.pointerType === 'mouse' && event.button !== 0)) return;
      state.drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        p: state.p,
        from: 0,
        moved: false,
        samples: [],
      };
      if (!interactiveTarget(event)) {
        state.holding = true;
        publishSettled(false);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = state.drag;
      if (!drag || event.pointerId !== drag.id) return;
      const s = settingsRef.current;
      if (!drag.moved) {
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          state.drag = null;
          state.holding = false;
          publishSettled(Math.abs(state.target - state.p) < 0.0004);
          return;
        }
        drag.moved = true;
        drag.x = event.clientX;
        drag.p = state.p;
        drag.from = Math.round(state.target);
        state.holding = true;
        publishSettled(false);
        viewport.setPointerCapture?.(event.pointerId);
        viewport.dataset.dragging = 'true';
      }
      const raw = drag.p - (event.clientX - drag.x) / s.cardWidth;
      state.p = s.loop ? raw : band(raw, s.count - 1);
      state.v = 0;
      state.target = Math.round(limit(s, state.p));
      drag.samples.push([event.timeStamp, event.clientX]);
      if (drag.samples.length > 8) drag.samples.shift();
      announce();
      apply();
    };

    const onPointerUp = (event: PointerEvent) => {
      const drag = state.drag;
      if (!drag || event.pointerId !== drag.id) return;
      state.drag = null;
      state.holding = false;
      delete viewport.dataset.dragging;
      if (!drag.moved) {
        publishSettled(Math.abs(state.target - state.p) < 0.0004);
        wake();
        return;
      }
      state.suppress = true;
      window.setTimeout(() => {
        state.suppress = false;
      }, 0);
      const s = settingsRef.current;
      const sample: [number, number] =
        drag.samples.find(([time]) => event.timeStamp - time < 90) ?? [event.timeStamp, event.clientX];
      const elapsed = Math.max(16, event.timeStamp - sample[0]);
      const velocity = clamp(((sample[1] - event.clientX) / elapsed) * (1000 / s.cardWidth), -12, 12);
      const travelled = state.p - drag.from;
      let target = Math.round(state.p + velocity * 0.2);
      if (target === drag.from) {
        if (Math.abs(velocity) > 0.8) target += Math.sign(velocity);
        else if (Math.abs(travelled) > 0.18) target += Math.sign(travelled);
      }
      if (!s.loop) target = clamp(target, 0, s.count - 1);
      const inside = s.loop || (state.p >= 0 && state.p <= s.count - 1);
      state.v = inside ? velocity : 0;
      moveTo(target);
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!state.suppress) return;
      event.preventDefault();
      event.stopPropagation();
      state.suppress = false;
    };

    const onWheel = (event: WheelEvent) => {
      const s = settingsRef.current;
      if (!s.draggable || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const raw = state.p + event.deltaX / s.cardWidth;
      state.p = s.loop ? raw : clamp(raw, -0.15, s.count - 0.85);
      state.v = 0;
      state.wheeling = true;
      state.target = Math.round(limit(s, state.p));
      publishSettled(false);
      announce();
      apply();
      window.clearTimeout(state.wheelTimer);
      state.wheelTimer = window.setTimeout(() => {
        state.wheeling = false;
        moveTo(Math.round(limit(settingsRef.current, state.p)));
      }, 120);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
      }
      const s = settingsRef.current;
      const keys: Record<string, () => void> = {
        ArrowRight: () => goTo(state.shown + 1),
        ArrowLeft: () => goTo(state.shown - 1),
        Home: () => goTo(0),
        End: () => goTo(s.count - 1),
      };
      const run = keys[event.key];
      if (!run) return;
      event.preventDefault();
      run();
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('click', onClickCapture, true);
    viewport.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('keydown', onKeyDown);

    engineRef.current = {
      goTo,
      sync: () => {
        const s = settingsRef.current;
        if (!s.loop && s.count) {
          state.target = clamp(Math.round(state.target), 0, s.count - 1);
          state.p = clamp(state.p, -0.3, s.count - 0.7);
        }
        announce();
        apply();
        wake();
      },
    };
    engineRef.current.sync();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(state.wheelTimer);
      engineRef.current = null;
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('click', onClickCapture, true);
      viewport.removeEventListener('wheel', onWheel);
      root.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    settingsRef.current = settings;
    onChangeRef.current = onChange;
    onSettledRef.current = onSettledChange;
    engineRef.current?.sync();
  });

  useLayoutEffect(() => {
    if (index === undefined) return;
    engineRef.current?.goTo(index);
  }, [index]);

  useEffect(() => {
    if (reportedRef.current === active) return;
    reportedRef.current = active;
    onChangeRef.current?.(active);
  }, [active]);

  const perspective = `${Math.round(cardWidth * 2.6)}px`;

  return (
    <div
      ref={rootRef}
      className={`relative h-full min-h-0 w-full outline-none [-webkit-tap-highlight-color:transparent] ${className}`}
      style={{ '--carousel-radius': `${Math.max(0, radius)}px` } as CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div ref={stageRef} className="absolute inset-0">
        <div
          ref={viewportRef}
          data-cs-x-pan=""
          data-draggable={settings.draggable ? 'true' : undefined}
          className="absolute inset-0 touch-pan-y select-none [transform-style:preserve-3d] data-[draggable=true]:cursor-grab data-[dragging=true]:cursor-grabbing"
          style={{ perspective }}
        >
          {items.map((item, itemIndex) => {
            const initial = pose(itemIndex, active, settings);
            return (
              <div
                key={item.id}
                ref={(element) => {
                  slideRefs.current[itemIndex] = element;
                }}
                className="absolute top-0 [backface-visibility:hidden] will-change-transform"
                style={{
                  left: 0,
                  width: cardWidth,
                  height: cardHeight,
                  transform: initial.transform,
                  visibility: initial.visible ? 'visible' : 'hidden',
                  zIndex: initial.layer,
                }}
                data-current={itemIndex === active ? 'true' : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${itemIndex + 1} of ${count}`}
              >
                <div className="h-full w-full overflow-hidden rounded-[var(--carousel-radius)]">{item.node}</div>
                <span
                  ref={(element) => {
                    shadeRefs.current[itemIndex] = element;
                  }}
                  className="pointer-events-none absolute inset-0 rounded-[var(--carousel-radius)] bg-black"
                  style={{ opacity: initial.shade }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
