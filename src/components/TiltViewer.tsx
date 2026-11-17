'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * A part on a white tile. When the finish changes, the old part turns and
 * slides out while the new one turns into place from the other side, the way
 * product pages show a phone changing colour. GSAP owns x, rotation, scale
 * and opacity of each .viewer-layer; no CSS transition touches them.
 * `index` gives direction: a higher index enters from the right.
 */
type Layer = { id: number; src: string; alt: string };

export function TiltViewer({
  src,
  alt,
  index = 0,
  photo = false,
  priority = false,
  sizes = '(max-width: 960px) 80vw, 480px',
}: {
  src: string;
  alt: string;
  index?: number;
  photo?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const [layers, setLayers] = useState<Layer[]>([{ id: 0, src, alt }]);
  const lastSrc = useRef(src);
  const lastIndex = useRef(index);
  const dir = useRef(1);
  const objRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);

  if (src !== lastSrc.current) {
    dir.current = index >= lastIndex.current ? 1 : -1;
    lastSrc.current = src;
    lastIndex.current = index;
    seq.current += 1;
    const next = { id: seq.current, src, alt };
    setLayers((ls) => [...ls.slice(-1), next]);
  }

  useLayoutEffect(() => {
    if (layers.length < 2) return;
    const root = objRef.current!;
    const [outEl, inEl] = Array.from(root.querySelectorAll<HTMLElement>('.viewer-layer')).slice(-2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const d = dir.current;
    const done = () => setLayers((ls) => ls.slice(-1));
    if (reduce) {
      done();
      return;
    }
    const tl = gsap.timeline({ onComplete: done, defaults: { ease: 'power3.inOut' } });
    if (photo) {
      tl.fromTo(inEl, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0)
        .to(outEl, { autoAlpha: 0, duration: 0.45 }, 0);
    } else {
      tl.to(outEl, { xPercent: -70 * d, rotation: -40 * d, scale: 0.86, autoAlpha: 0, duration: 0.6 }, 0)
        .fromTo(
          inEl,
          { xPercent: 70 * d, rotation: 50 * d, scale: 0.86, autoAlpha: 0 },
          { xPercent: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 0.75, ease: 'power3.out' },
          0.12,
        );
    }
    return () => {
      tl.kill();
    };
  }, [layers, photo]);

  return (
    <div className="viewer-stage">
      <div className={`studio${photo ? ' studio--photo' : ''}`} aria-hidden style={{ position: 'absolute', inset: 0 }} />
      <div ref={objRef} className={`viewer-obj${photo ? ' is-photo' : ''}`}>
        {layers.map((l, i) => (
          <div key={l.id} className="viewer-layer" aria-hidden={i < layers.length - 1 || undefined}>
            <Image src={l.src} alt={l.alt} fill sizes={sizes} priority={priority && l.id === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
