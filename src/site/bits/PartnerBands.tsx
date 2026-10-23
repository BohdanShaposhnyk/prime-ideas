import { useEffect, useRef } from 'react';
import { gsap } from '@/site/lib/gsap';
import { usePrefersReducedMotion } from '@/site/hooks/media';
import { intersectsSnapPort, observeSnapPort } from '@/site/hooks/snap-in-view';

export type PartnerMark = {
  name: string;
  src?: string;
};

const COPIES = 4;
const BASE_SPEED = 24;
const markClass =
  'h-[1.15rem] w-auto max-w-[7.75rem] object-contain opacity-70 md:h-[1.45rem] md:max-w-[10rem]';
const wordClass =
  'font-[family-name:var(--cs-body)] text-[0.78rem] leading-none font-medium tracking-[0.16em] text-[var(--cs-ice)] uppercase opacity-70 md:text-[0.92rem]';

const fadeClass =
  'overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Mark({ partner }: { partner: PartnerMark }) {
  if (partner.src) {
    return <img src={partner.src} alt="" draggable={false} className={markClass} />;
  }
  return <span className={wordClass}>{partner.name}</span>;
}

function Row({
  partners,
  direction,
  reduced,
}: {
  partners: PartnerMark[];
  direction: 1 | -1;
  reduced: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    const scroller = track.closest<HTMLElement>('[data-cs-scroll]');
    const copy = () => track.querySelector<HTMLElement>('[data-partner-copy]');
    let loop = copy()?.offsetWidth ?? 0;
    let offset = direction < 0 ? loop * 0.5 : 0;
    let boost = 0;
    let lastY = scroller?.scrollTop ?? 0;
    let last = performance.now();
    let visible = intersectsSnapPort(track);

    const measure = () => {
      loop = copy()?.offsetWidth ?? 0;
    };
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    const unwatch = observeSnapPort(track, (next) => {
      visible = next;
    });

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const y = scroller?.scrollTop ?? lastY;
      if (!visible || document.hidden || loop <= 0) {
        lastY = y;
        boost = 0;
        return;
      }
      const instant = clamp((y - lastY) / Math.max(dt, 0.001), -2500, 2500);
      lastY = y;
      boost += (instant - boost) * Math.min(1, dt * 7);
      const speed = BASE_SPEED * direction + clamp(boost * 0.12, -160, 160);
      offset += speed * dt;
      offset = ((offset % loop) + loop) % loop;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      resize.disconnect();
      unwatch();
    };
  }, [direction, reduced]);

  return (
    <div className={fadeClass}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            data-partner-copy=""
            className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14"
          >
            {partners.map((partner) => (
              <li key={partner.name} className="flex h-7 items-center md:h-8">
                <Mark partner={partner} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PartnerBands({ rows }: { rows: [PartnerMark[], PartnerMark[]] }) {
  const reduced = usePrefersReducedMotion();
  const names = rows.flat().map((partner) => partner.name);

  return (
    <div className="pointer-events-none relative z-20 shrink-0 pt-1 pb-[max(0.7rem,env(safe-area-inset-bottom))]">
      <p className="sr-only">Partners</p>
      <ul className="sr-only">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div aria-hidden className="flex flex-col gap-2 md:gap-2.5">
        <Row partners={rows[0]} direction={1} reduced={reduced} />
        <Row partners={rows[1]} direction={-1} reduced={reduced} />
      </div>
    </div>
  );
}
