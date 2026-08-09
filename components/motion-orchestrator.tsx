'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const selector = [
  'main section .eyebrow',
  'main section h1',
  'main section h2',
  'main section h3',
  'main section p',
  'main section .premium-card',
  'main section .dark-glass-card',
  'main section .service-card',
  'main section details',
  'main section article',
  'main section table',
  'main section [class*="rounded-"] > a',
  'main section [class*="rounded-"] > button',
  'footer > div > div'
].join(',');

const tiltSelector = '.premium-card,.dark-glass-card,.service-card,main article';

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const unique = nodes.filter((node, index) => nodes.indexOf(node) === index && !node.closest('[data-no-reveal]'));

    unique.forEach((node, index) => {
      node.classList.add('motion-reveal');
      node.style.setProperty('--motion-delay', `${Math.min((index % 7) * 85, 510)}ms`);

      if (node.matches('h1,h2,.eyebrow')) node.dataset.motion = 'rise';
      else if (node.matches('.premium-card,.service-card,article')) node.dataset.motion = index % 2 === 0 ? 'left' : 'right';
      else if (node.matches('.dark-glass-card,table')) node.dataset.motion = 'zoom';
      else node.dataset.motion = 'soft';
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -4% 0px' });

    unique.forEach((node) => observer.observe(node));

    const root = document.documentElement;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        root.style.setProperty('--page-progress', String(Math.min(window.scrollY / max, 1)));
        root.style.setProperty('--scroll-y', `${window.scrollY}px`);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(tiltSelector));
    const cleanup: Array<() => void> = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      tiltCards.forEach((card) => {
        card.classList.add('motion-tilt');
        const move = (event: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (event.clientX - r.left) / r.width - .5;
          const py = (event.clientY - r.top) / r.height - .5;
          card.style.setProperty('--tilt-x', `${(-py * 5.5).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${(px * 6.5).toFixed(2)}deg`);
          card.style.setProperty('--glow-x', `${((px + .5) * 100).toFixed(0)}%`);
          card.style.setProperty('--glow-y', `${((py + .5) * 100).toFixed(0)}%`);
        };
        const leave = () => {
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        cleanup.push(() => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        });
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      cleanup.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
