import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let started = false;

export function initMotion() {
  if (started) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  started = true;
  document.documentElement.dataset.motion = 'ready';

  gsap.registerPlugin(ScrollTrigger);

  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  const revealPassed = () => {
    const pending: HTMLElement[] = [];
    const line = window.innerHeight * 0.92;
    for (const el of items) {
      if (el.dataset.shown) continue;
      if (el.getBoundingClientRect().top < line) {
        el.dataset.shown = '1';
        pending.push(el);
      }
    }
    if (!pending.length) return;
    gsap.to(pending, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: { amount: Math.min(0.4, pending.length * 0.04) },
      overwrite: true,
    });
  };

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: revealPassed,
    onRefresh: revealPassed,
  });
  revealPassed();

  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
  const pairs = links
    .map((link) => {
      const id = link.getAttribute('href');
      const section = id ? document.querySelector<HTMLElement>(id) : null;
      return section ? { link, section } : null;
    })
    .filter((pair): pair is { link: HTMLAnchorElement; section: HTMLElement } => pair !== null);

  if (pairs.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        for (const pair of pairs) {
          const on = pair.section === visible.target;
          if (on) pair.link.setAttribute('aria-current', 'true');
          else pair.link.removeAttribute('aria-current');
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    );
    for (const pair of pairs) observer.observe(pair.section);
  }

  void document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
