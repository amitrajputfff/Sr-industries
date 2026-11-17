'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The page's one reveal, plus the year roll on [data-roll].
 * Rules: content is visible by default; only elements still below the fold
 * when the page hydrates are hidden and brought in, once, with transform and
 * opacity only. Every tween is reverted on route change, so nothing can be
 * left half-faded. Elements touched here carry no CSS transition on
 * transform or opacity.
 */

/* Page entry. The h1 is set word by word, each word rising and unclipping
   (clip-path, so line spacing never changes), then the lead and actions, then the first screen of cards in
   one short stagger. Runs on every page and on a catalogue category change.
   The original text nodes are put back afterwards so React keeps owning them. */
const HEAD = 'main h1';
const AFTER = '.crumbs, .page-head .lead, .page-head .btn-row, .pd-grid .lead, .pd-grid .code, .hero .lead, .hero .btn-row';
const ITEMS = '.cat-tabs, .filters, .grid-products > *, .contact-grid > *, .story > *, .pd-media, .pd-block, .viewer';

function splitWords(h: HTMLElement) {
  const saved = [...h.childNodes];
  const words: HTMLElement[] = [];
  const out: Node[] = [];
  for (const n of saved) {
    if (n.nodeType !== Node.TEXT_NODE) { out.push(n.cloneNode(true)); continue; }
    for (const part of (n.textContent ?? '').split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { out.push(document.createTextNode(part)); continue; }
      const w = document.createElement('span');
      w.className = 'w-word';
      w.textContent = part;
      words.push(w);
      out.push(w);
    }
  }
  if (!h.hasAttribute('aria-label')) h.setAttribute('aria-label', h.textContent ?? '');
  h.replaceChildren(...out);
  return { words, restore: () => { h.replaceChildren(...saved); h.removeAttribute('aria-label'); } };
}

function useIntro(key: string) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const done = () => root.classList.remove('intro-wait');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return; }
    const h = document.querySelector<HTMLElement>(HEAD);
    const split = h ? splitWords(h) : null;
    const fold = window.innerHeight;
    const items = gsap.utils.toArray<HTMLElement>(ITEMS).filter((el) => el.getBoundingClientRect().top < fold).slice(0, 12);
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => { split?.restore(); gsap.set(items, { clearProps: 'transform,opacity,visibility' }); },
    });
    if (split) tl.from(split.words, { yPercent: 70, clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 0, duration: 0.8, stagger: 0.06, ease: 'power4.out' });
    tl.from(AFTER, { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, split ? 0.3 : 0);
    if (items.length) tl.from(items, { y: 22, autoAlpha: 0, duration: 0.65, stagger: 0.05 }, split ? 0.45 : 0.1);
    done();
    return () => { tl.kill(); split?.restore(); gsap.set(items, { clearProps: 'transform,opacity,visibility' }); };
  }, [key]);
}

export function Motion() {
  const pathname = usePathname();
  const category = useSearchParams().get('category') ?? '';
  useIntro(pathname + '?' + category);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const fold = window.innerHeight;

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        if (el.getBoundingClientRect().top < fold * 0.92) return;
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-roll]').forEach((el) => {
        const digits = el.querySelectorAll('span');
        if (!digits.length) return;
        gsap.from(digits, {
          yPercent: 105,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.07,
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    });

    // images loading late can shift trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
