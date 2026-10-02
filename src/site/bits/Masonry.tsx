import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const read = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
      setSize(prev => (prev.width === next.width && prev.height === next.height ? prev : next));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img?: string;
  url?: string;
  height: number;
  content?: React.ReactNode;
  column?: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  columnCount?: number;
  /** Relative widths per column. Falls back to equal columns when omitted or mismatched. */
  columnFractions?: number[];
  gap?: number;
  exactHeight?: boolean;
  /** When false, tiles stay hidden at their start pose until it flips true. */
  active?: boolean;
  /** Opacity at the off-stage pose. 0 is a pure fade; higher keeps the stack-up readable. */
  fromOpacity?: number;
  /** Off-stage travel as a fraction of the container’s height. */
  travelRatio?: number;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  columnCount,
  columnFractions,
  gap = 16,
  exactHeight = false,
  active = true,
  fromOpacity = 0,
  travelRatio = 0.22
}) => {
  const mediaColumns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );
  const columns = columnCount ?? mediaColumns;

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    const rise = Math.max(containerRect.height * travelRatio, 180);

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: item.y - rise };
      case 'bottom':
        return { x: item.x, y: item.y + rise };
      case 'left':
        return { x: item.x - rise, y: item.y };
      case 'right':
        return { x: item.x + rise, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + rise };
    }
  };

  useEffect(() => {
    let cancelled = false;
    const urls = items.map(i => i.img).filter((src): src is string => Boolean(src));
    preloadImages(urls).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const fractions =
      columnFractions && columnFractions.length === columns
        ? columnFractions
        : new Array(columns).fill(1);
    const fracSum = fractions.reduce((sum, value) => sum + value, 0) || columns;
    const usable = width - totalGaps;
    const colWidths = fractions.map(value => (usable * value) / fracSum);
    const colX: number[] = [];
    let cursor = 0;
    for (let i = 0; i < columns; i += 1) {
      colX[i] = cursor;
      cursor += colWidths[i] + gap;
    }

    return items.map(child => {
      const pinned =
        typeof child.column === 'number'
          ? Math.min(Math.max(0, child.column), columns - 1)
          : colHeights.indexOf(Math.min(...colHeights));
      const columnWidth = colWidths[pinned];
      const x = colX[pinned];
      const height = exactHeight ? child.height : child.height / 2;
      const y = colHeights[pinned];

      colHeights[pinned] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columnFractions, columns, exactHeight, gap, items, width]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root || !imagesReady || grid.length === 0) return;

    const nodeOf = (id: string) =>
      root.querySelector<HTMLElement>(`[data-key="${CSS.escape(id)}"]`);

    const tweens: gsap.core.Tween[] = [];
    grid.forEach((item, index) => {
      const el = nodeOf(item.id);
      if (!el) return;
      const start = getInitialPosition(item);
      const hidden = {
        opacity: fromOpacity,
        x: start.x,
        y: start.y,
        width: item.w,
        height: item.h,
        ...(blurToFocus && { filter: 'blur(12px)' })
      };
      const shown = {
        opacity: 1,
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
        ...(blurToFocus && { filter: 'blur(0px)' })
      };

      if (!el.dataset.csPosed) {
        gsap.set(el, hidden);
        el.dataset.csPosed = '1';
      }

      tweens.push(
        active
          ? gsap.to(el, {
              ...shown,
              duration,
              ease,
              delay: index * stagger,
              overwrite: 'auto'
            })
          : gsap.to(el, {
              ...hidden,
              duration: duration * 0.55,
              ease: 'power3.out',
              delay: (grid.length - 1 - index) * 0.018,
              overwrite: 'auto'
            })
      );
    });

    return () => {
      tweens.forEach(tween => tween.kill());
    };
  }, [active, grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, fromOpacity, travelRatio]);

  const handleMouseEnter = (_id: string, element: HTMLElement) => {
    if (!active) return;
    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (_id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className={`absolute box-content ${item.url ? 'cursor-pointer' : ''}`}
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => {
            if (item.url) window.open(item.url, '_blank', 'noopener');
          }}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            data-placeholder={item.content ? undefined : 'visual'}
            className="relative h-full w-full overflow-hidden rounded-[10px] bg-black"
          >
            {item.img ? (
              <img
                src={item.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            {item.content}
            {colorShiftOnHover && (
              <div className="color-overlay pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
