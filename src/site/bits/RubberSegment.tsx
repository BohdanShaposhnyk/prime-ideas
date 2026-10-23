import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '@/site/hooks/media';

export type RubberSegmentSize = 'sm' | 'md' | 'lg';
export type RubberSegmentItem = string | { value: string; label: ReactNode };

export interface RubberSegmentProps {
  items: RubberSegmentItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, index: number) => void;
  trackColor?: string;
  thumbColor?: string;
  textColor?: string;
  activeTextColor?: string;
  size?: RubberSegmentSize;
  radius?: number;
  inset?: number;
  equalSlots?: boolean;
  stretch?: number;
  squash?: number;
  speed?: number;
  /** Allow a label to wrap onto a second line. The thumb grows with the track. */
  wrap?: boolean;
  draggable?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

type Slot = { l: number; r: number };
type Sample = [number, number];
type Drag = {
  id: number;
  x0: number;
  slot: number;
  onThumb: boolean;
  live: boolean;
  offset: number;
  w: number;
  hist: Sample[];
};

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
const DILATE = 0.19;
const HANDOFF = 0.15;
const FLICK = 110;
const DEADZONE = 4;
const SLOP = 10;
const RUBBER = 0.55;
const SIZES: Record<RubberSegmentSize, { height: number; font: number; pad: number; min: number }> = {
  sm: { height: 28, font: 12, pad: 10, min: 36 },
  md: { height: 36, font: 13, pad: 14, min: 44 },
  lg: { height: 44, font: 14, pad: 18, min: 48 },
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const rubber = (over: number, dim: number) => (over * dim * RUBBER) / (dim + RUBBER * Math.abs(over));
const project = (v: number, glide: number) => {
  const d = 1 - 0.1 * Math.pow(0.05, glide / 100);
  return ((v / 1000) * d) / (1 - d);
};
const velocityOf = (hist: Sample[], now: number) => {
  const recent = hist.filter(([t]) => now - t <= 100);
  if (recent.length < 2) return 0;
  const [t0, x0] = recent[0];
  const [t1, x1] = recent[recent.length - 1];
  return t1 - t0 >= 8 ? ((x1 - x0) / (t1 - t0)) * 1000 : 0;
};
const nearestSlot = (slots: Slot[], x: number) => {
  let best = 0;
  for (let i = 1; i < slots.length; i++) {
    if (Math.abs((slots[i].l + slots[i].r) / 2 - x) < Math.abs((slots[best].l + slots[best].r) / 2 - x)) best = i;
  }
  return best;
};

/**
 * Segmented control whose thumb stretches across the gap and squashes into place.
 * GSAP drives the thumb. Labels can wrap to two lines when `wrap` is set.
 */
export default function RubberSegment({
  items,
  value,
  defaultValue,
  onChange,
  trackColor = '#27272a',
  thumbColor = '#fafafa',
  textColor = '#fafafa',
  activeTextColor = '#18181b',
  size = 'md',
  radius = 10,
  inset = 3,
  equalSlots = true,
  stretch = 100,
  squash = 3,
  speed = 1,
  wrap = false,
  draggable = true,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Segmented control',
}: RubberSegmentProps) {
  const list = items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));
  const [inner, setInner] = useState(defaultValue ?? list[0]?.value);
  const current = value !== undefined ? value : inner;
  const index = Math.max(0, list.findIndex((item) => item.value === current));
  const reduce = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slots = useRef<Slot[]>([]);
  const box = useRef<DOMRect | null>(null);
  const committed = useRef(index);
  const edges = useRef({ l: 0, r: 0 });
  const innerW = useRef(0);
  const drag = useRef<Drag | null>(null);
  const skipTravel = useRef(false);
  const gen = useRef(0);
  const handoff = useRef<gsap.core.Tween | null>(null);
  const glide = 75;
  const thumbRadius = Math.max(0, radius - inset);

  const paint = () => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const width = innerW.current;
    const left = Math.max(0, edges.current.l);
    const right = Math.max(0, width - edges.current.r);
    thumb.style.clipPath = `inset(0 ${right}px 0 ${left}px round ${thumbRadius}px)`;
  };

  const killMotion = () => {
    handoff.current?.kill();
    handoff.current = null;
    gsap.killTweensOf(edges.current);
  };

  const jumpTo = (i: number) => {
    const slot = slots.current[i];
    if (!slot) return;
    killMotion();
    gen.current += 1;
    edges.current.l = slot.l;
    edges.current.r = slot.r;
    paint();
  };

  const t = (seconds: number) => seconds / speed;

  const land = (to: number, flick: boolean, withSquash: boolean) => {
    const slot = slots.current[to];
    if (!slot) return;
    const token = ++gen.current;
    killMotion();
    gen.current = token;
    if (reduce) {
      jumpTo(to);
      return;
    }
    const dir = Math.sign((slot.l + slot.r) / 2 - (edges.current.l + edges.current.r) / 2) || 1;
    const leadKey = dir > 0 ? 'r' : 'l';
    const trailKey = dir > 0 ? 'l' : 'r';
    const leadTo = dir > 0 ? slot.r : slot.l;
    const trailTo = dir > 0 ? slot.l : slot.r;
    const duration = t(flick ? 0.4 : 0.3);
    gsap.to(edges.current, {
      [leadKey]: leadTo,
      duration,
      ease: flick ? 'back.out(1.4)' : 'power3.out',
      onUpdate: paint,
    });
    if (!withSquash || squash <= 0) {
      gsap.to(edges.current, {
        [trailKey]: trailTo,
        duration: t(0.3),
        ease: 'power3.out',
        onUpdate: paint,
      });
      return;
    }
    gsap.to(edges.current, {
      [trailKey]: trailTo + dir * squash,
      duration: t(0.3),
      ease: 'power3.out',
      onUpdate: paint,
      onComplete: () => {
        if (gen.current !== token) return;
        gsap.to(edges.current, {
          [trailKey]: trailTo,
          duration: t(0.16),
          ease: 'power2.out',
          onUpdate: paint,
        });
      },
    });
  };

  const travel = (from: number, to: number) => {
    const origin = slots.current[from];
    const destination = slots.current[to];
    if (!origin || !destination) return;
    killMotion();
    gen.current += 1;
    if (reduce) {
      jumpTo(to);
      return;
    }
    const token = gen.current;
    const u = stretch / 100;
    gsap.to(edges.current, {
      l: destination.l + (Math.min(origin.l, destination.l) - destination.l) * u,
      r: destination.r + (Math.max(origin.r, destination.r) - destination.r) * u,
      duration: t(DILATE),
      ease: 'power3.out',
      onUpdate: paint,
    });
    handoff.current = gsap.delayedCall(t(HANDOFF), () => {
      if (gen.current !== token) return;
      land(to, false, true);
    });
  };

  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    box.current = rect;
    slots.current = list.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return { l: 0, r: 0 };
      const r = el.getBoundingClientRect();
      return { l: r.left - rect.left - inset, r: r.right - rect.left - inset };
    });
    innerW.current = rect.width - inset * 2;
    jumpTo(committed.current);
  };

  const listKey = list.map((item) => item.value).join('|');
  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
    // measure closes over the latest slots; listKey covers item changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listKey, size, inset, equalSlots, wrap]);

  useEffect(() => {
    if (skipTravel.current) {
      skipTravel.current = false;
      committed.current = index;
      return;
    }
    if (drag.current?.live) return;
    if (committed.current === index) return;
    const from = committed.current;
    committed.current = index;
    travel(from, index);
    // travel is recreated each render and only needs to run when the index changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => () => killMotion(), []);

  const select = (i: number, fromDrag = false) => {
    if (fromDrag) skipTravel.current = i !== index;
    if (i === index) return;
    if (value === undefined) setInner(list[i].value);
    onChange?.(list[i].value, i);
  };

  const localX = (e: { clientX: number }) => e.clientX - (box.current ? box.current.left : 0) - inset;

  const handlePointerDown = (e: React.PointerEvent, i: number) => {
    if (disabled || drag.current || e.button !== 0) return;
    box.current = trackRef.current?.getBoundingClientRect() ?? null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture can fail if the pointer already ended */
    }
    const x = localX(e);
    const onThumb = draggable && x >= edges.current.l && x <= edges.current.r;
    drag.current = { id: e.pointerId, x0: x, slot: i, onThumb, live: false, offset: 0, w: 0, hist: [[e.timeStamp, x]] };
    if (onThumb) {
      killMotion();
      gen.current += 1;
    } else if (!reduce && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.dataset.pressed = '';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id || !d.onThumb) return;
    const x = localX(e);
    d.hist.push([e.timeStamp, x]);
    if (d.hist.length > 8) d.hist.shift();
    if (!d.live) {
      if (Math.abs(x - d.x0) < DEADZONE) return;
      d.live = true;
      d.offset = x - edges.current.l;
      d.w = edges.current.r - edges.current.l;
      if (trackRef.current) trackRef.current.dataset.held = '';
    }
    const width = innerW.current;
    const left = x - d.offset;
    const maxL = width - d.w;
    if (reduce) {
      const c = clamp(left, 0, maxL);
      edges.current.l = c;
      edges.current.r = c + d.w;
    } else if (left < 0) {
      edges.current.l = 0;
      edges.current.r = d.w - rubber(-left, d.w);
    } else if (left > maxL) {
      edges.current.r = width;
      edges.current.l = maxL + rubber(left - maxL, d.w);
    } else {
      edges.current.l = left;
      edges.current.r = left + d.w;
    }
    paint();
  };

  const release = () => {
    const d = drag.current as Drag;
    drag.current = null;
    if (trackRef.current) delete trackRef.current.dataset.held;
    const el = itemRefs.current[d.slot];
    if (el) delete el.dataset.pressed;
    return d;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    release();
    const x = localX(e);
    if (!d.live) {
      if (Math.abs(x - d.x0) <= SLOP) select(d.slot);
      return;
    }
    const v = velocityOf(d.hist, e.timeStamp);
    const flick = Math.abs(v) > FLICK;
    let to = nearestSlot(slots.current, (edges.current.l + edges.current.r) / 2 + project(v, glide));
    if (flick && to === committed.current) to = clamp(to + Math.sign(v), 0, list.length - 1);
    select(to, true);
    if (reduce) jumpTo(to);
    else land(to, flick, flick);
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    release();
    if (!d.live) return;
    if (reduce) jumpTo(committed.current);
    else land(committed.current, false, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const last = list.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(last, index + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(0, index - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null || next === index) return;
    e.preventDefault();
    select(next);
    itemRefs.current[next]?.focus();
  };

  const preset = SIZES[size] || SIZES.md;
  const itemClass = wrap
    ? 'flex h-auto min-h-[calc(var(--rs-h)-var(--rs-inset)*2)] w-full min-w-0 items-center justify-center m-0 border-0 bg-transparent px-[var(--rs-pad)] py-1.5 rounded-[var(--rs-thumb-radius)] [font:inherit] text-[length:var(--rs-font)] font-medium outline-none'
    : 'inline-flex h-[calc(var(--rs-h)-var(--rs-inset)*2)] min-w-[var(--rs-min)] items-center justify-center gap-1.5 m-0 border-0 bg-transparent px-[var(--rs-pad)] py-0 rounded-[var(--rs-thumb-radius)] [font:inherit] text-[length:var(--rs-font)] font-medium leading-none whitespace-nowrap outline-none';
  const label = (text: ReactNode) =>
    wrap ? <span className="line-clamp-2 w-full min-w-0 text-center leading-tight text-balance">{text}</span> : text;

  return (
    <div
      ref={trackRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      data-cs-x-pan=""
      data-equal={equalSlots ? '' : undefined}
      data-draggable={draggable && !disabled ? '' : undefined}
      className={`group relative grid w-full grid-flow-col auto-cols-auto select-none touch-pan-y [font-family:inherit] [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] p-[var(--rs-inset)] rounded-[var(--rs-radius)] [background:var(--rs-track)] data-[equal]:auto-cols-[minmax(0,1fr)] data-[held]:cursor-grabbing aria-disabled:pointer-events-none aria-disabled:opacity-50${className ? ` ${className}` : ''}`}
      style={
        {
          '--rs-track': trackColor,
          '--rs-thumb': thumbColor,
          '--rs-ink': textColor,
          '--rs-ink-active': activeTextColor,
          '--rs-radius': `${radius}px`,
          '--rs-inset': `${inset}px`,
          '--rs-thumb-radius': `${thumbRadius}px`,
          '--rs-h': `${preset.height}px`,
          '--rs-font': `${preset.font}px`,
          '--rs-pad': `${preset.pad}px`,
          '--rs-min': `${preset.min}px`,
          '--rs-ease-out': EASE,
        } as CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
    >
      {list.map((item, i) => (
        <button
          key={item.value}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === index}
          tabIndex={i === index ? 0 : -1}
          disabled={disabled}
          className={`${itemClass} cursor-pointer [color:var(--rs-ink)] opacity-70 [transition:opacity_160ms_ease,transform_160ms_var(--rs-ease-out)] motion-reduce:[transition:opacity_160ms_ease] aria-checked:cursor-default group-data-[draggable]:aria-checked:cursor-grab group-data-[held]:cursor-grabbing data-[pressed]:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:[outline-color:var(--rs-thumb)] [@media(hover:hover)_and_(pointer:fine)]:[&[aria-checked=false]:hover]:opacity-90`}
          onPointerDown={(e) => handlePointerDown(e, i)}
          onKeyDown={handleKeyDown}
        >
          {label(item.label)}
        </button>
      ))}
      <div
        ref={thumbRef}
        className="pointer-events-none absolute inset-[var(--rs-inset)] grid grid-flow-col auto-cols-auto group-data-[equal]:auto-cols-[minmax(0,1fr)] [background:var(--rs-thumb)] [color:var(--rs-ink-active)]"
        aria-hidden="true"
      >
        {list.map((item) => (
          <span key={item.value} className={`${itemClass} cursor-default [color:inherit]`}>
            {label(item.label)}
          </span>
        ))}
      </div>
    </div>
  );
}
