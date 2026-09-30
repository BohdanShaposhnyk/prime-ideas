import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

/** Page scroller for window-scroll mode. An overflow ancestor (c20 snap port) wins; otherwise the document. */
function pageScroller(node: HTMLElement, useWindow: boolean): HTMLElement | Window {
  if (!useWindow) return node;
  let el = node.parentElement;
  while (el) {
    if (el === document.body || el === document.documentElement) return window;
    const oy = getComputedStyle(el).overflowY;
    if (oy === 'auto' || oy === 'scroll' || oy === 'overlay') return el;
    el = el.parentElement;
  }
  return window;
}

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'expandOnApproach'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  /**
   * After a flick settles on this scene, play the expand once.
   * Scroll itself is left alone (so a hero exit parallax is not sharing frames
   * with the clip). `smoothing` is the playback length in seconds.
   * `scrollDistance` does not add track height.
   */
  expandOnApproach?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  /** Unclipped layer on the sticky stage — sits above the expanding frame. */
  stageOverlay?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  expandOnApproach = false,
  enabled = true,
  children,
  stageOverlay,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    expandOnApproach,
    enabled
  });

  useLayoutEffect(() => {
    propsRef.current = {
      startWidth,
      startHeight,
      startRadius,
      endRadius,
      mediaZoom,
      scrollDistance,
      holdDistance,
      smoothing,
      overlayScrim,
      useWindowScroll,
      expandOnApproach,
      enabled
    };
  }, [
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    expandOnApproach,
    enabled
  ]);

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
    frame.style.setProperty('--se-progress', String(p));

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      const scroller = pageScroller(root, c.useWindowScroll);
      if (scroller instanceof HTMLElement) {
        const h = c.useWindowScroll ? scroller.clientHeight : root.clientHeight;
        if (h <= 0) return;
        stage.style.height = `${h}px`;
        stageH = h;
      } else {
        // 100lvh — never shorter than the iOS chrome-hidden screen (innerHeight tracks the toolbar).
        stage.style.height = '100lvh';
        stageH = stage.getBoundingClientRect().height || window.innerHeight;
      }
      const runway = c.expandOnApproach
        ? Math.max(0, c.holdDistance)
        : Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance);
      track.style.height = `${stageH * (1 + runway)}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    if (expandOnApproach) {
      let played = false;
      let arrival = 0;
      let ratio = 0;
      let quiet: number[] = [];
      const scroller = pageScroller(root, useWindowScroll);
      const portEl = scroller instanceof HTMLElement ? scroller : null;

      const stopArrival = () => {
        if (arrival) cancelAnimationFrame(arrival);
        arrival = 0;
      };

      const clearQuiet = () => {
        for (const id of quiet) window.clearTimeout(id);
        quiet = [];
      };

      /** One geometry read. Not called from the scroll event itself. */
      const trackTop = () => {
        const portTop = portEl ? portEl.getBoundingClientRect().top : 0;
        const portH = portEl && portEl.clientHeight > 0 ? portEl.clientHeight : window.innerHeight;
        return { top: track.getBoundingClientRect().top - portTop, portH };
      };

      const playArrival = () => {
        if (!propsRef.current.enabled) {
          stopArrival();
          current = 1;
          applyProgress(1);
          played = true;
          return;
        }
        if (played) return;
        played = true;
        const from = current;
        const t0 = performance.now();
        const ms = reduceMotion ? 0 : Math.round(clamp(propsRef.current.smoothing, 0.36, 0.85) * 1000);
        const step = (now: number) => {
          const t = ms <= 0 ? 1 : Math.min(1, (now - t0) / ms);
          const e = t * t * (3 - 2 * t);
          current = from + (1 - from) * e;
          applyProgress(current);
          arrival = t < 1 ? requestAnimationFrame(step) : 0;
        };
        stopArrival();
        arrival = requestAnimationFrame(step);
      };

      const onQuiet = () => {
        const { top, portH } = trackTop();
        if (top > portH * 0.72) {
          ratio = 0;
          if (played || current > 0.001) {
            stopArrival();
            played = false;
            current = 0;
            applyProgress(0);
          }
          return;
        }
        // Prefer a settled snap. A high intersection covers an iOS commit
        // whose rect is still a few pixels short of the snap line.
        const seated = top <= portH * 0.2 || (ratio >= 0.9 && top <= portH * 0.4);
        if (seated) playArrival();
      };

      const poke = () => {
        clearQuiet();
        quiet = [120, 480].map((ms) => window.setTimeout(onQuiet, ms));
      };

      const onArrive = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        ratio = entry.intersectionRatio;
        if (ratio >= 0.6 || ratio <= 0.15) poke();
      };

      measure();
      current = propsRef.current.enabled ? 0 : 1;
      applyProgress(current);
      if (!propsRef.current.enabled) played = true;

      const io = new IntersectionObserver(onArrive, {
        root: portEl,
        threshold: [0, 0.15, 0.6, 0.92],
      });
      io.observe(stage);

      scroller.addEventListener('scroll', poke, { passive: true });
      scroller.addEventListener('scrollend', poke);
      window.addEventListener('resize', measure);
      const vv = window.visualViewport;
      vv?.addEventListener('resize', measure);
      const ro = new ResizeObserver(measure);
      if (portEl) ro.observe(portEl);
      poke();

      return () => {
        clearQuiet();
        stopArrival();
        io.disconnect();
        scroller.removeEventListener('scroll', poke);
        scroller.removeEventListener('scrollend', poke);
        window.removeEventListener('resize', measure);
        vv?.removeEventListener('resize', measure);
        ro.disconnect();
      };
    }

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = pageScroller(root, useWindowScroll);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    if (scroller instanceof HTMLElement) ro.observe(scroller);
    if (scroller !== root) ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      vv?.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll, expandOnApproach, startWidth, startHeight, startRadius, enabled, scrollDistance, holdDistance]);

  const hasSrc = Boolean(src);
  const open = !enabled;
  const startInsetX = open ? 0 : Math.max(0, (100 - startWidth) / 2);
  const startInsetY = open ? 0 : Math.max(0, (100 - startHeight) / 2);
  const startClip = `inset(${startInsetY}% ${startInsetX}% ${startInsetY}% ${startInsetX}% round ${open ? endRadius : startRadius}px)`;

  const media = hasSrc ? (
    mediaType === 'video' ? (
      <video
        className="absolute inset-0 h-full w-full origin-center object-cover select-none"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        className="absolute inset-0 h-full w-full origin-center object-cover select-none"
        src={src}
        alt={alt}
        draggable={false}
      />
    )
  ) : (
    children
  );

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${useWindowScroll ? '' : 'h-full overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full">
        <div ref={stageRef} className="sticky top-0 h-[100lvh] w-full overflow-hidden bg-black [--se-title-size:4rem]">
          <div
            ref={frameRef}
            className="absolute inset-0 [will-change:clip-path]"
            style={{ clipPath: startClip, '--se-progress': open ? '1' : '0' } as CSSProperties}
          >
            <div
              ref={mediaRef}
              className="absolute inset-0 size-full origin-center [will-change:transform]"
            >
              {media}
            </div>
            <div
              ref={scrimRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.35))] opacity-0"
            />
            {hasSrc && children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center p-[6%] text-center opacity-0 [will-change:opacity,transform]"
              >
                {children}
              </div>
            ) : null}
          </div>
          {stageOverlay ? (
            <div className="pointer-events-none absolute inset-0 z-[2]">{stageOverlay}</div>
          ) : null}
          {title ? (
            <div
              ref={titleRef}
              className="absolute inset-0 flex items-center justify-center m-0 px-[6%] text-center font-bold leading-none tracking-[-0.03em] text-white [font-size:var(--se-title-size)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] pointer-events-none [will-change:opacity,transform]"
            >
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="absolute inset-x-0 bottom-5 text-center text-[0.8125rem] tracking-[0.02em] text-white/55 pointer-events-none [will-change:opacity,transform]"
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
