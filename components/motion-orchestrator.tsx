'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const selector = [
  'main section .eyebrow',
  'main section h1',
  'main section h2',
  'main section h3',
  'main section .premium-card',
  'main section .dark-glass-card',
  'main section .service-card',
  'main section details',
  'main section article',
  'main section table',
  'footer > div > div'
].join(',');

const tiltSelector = '.premium-card,.dark-glass-card,.service-card,main article';

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const unique = nodes.filter((node, index) => nodes.indexOf(node) === index && !node.closest('[data-no-reveal]'));

    unique.forEach((node, index) => {
      node.classList.add('motion-reveal');
      node.style.setProperty('--motion-delay', `${isMobile ? Math.min((index % 3) * 45, 90) : Math.min((index % 6) * 70, 350)}ms`);

      if (node.matches('h1,h2,.eyebrow')) node.dataset.motion = 'rise';
      else if (!isMobile && node.matches('.premium-card,.service-card,article')) node.dataset.motion = index % 2 === 0 ? 'left' : 'right';
      else if (node.matches('.dark-glass-card,table')) node.dataset.motion = 'zoom';
      else node.dataset.motion = 'soft';
    });

    const reveal = (node: HTMLElement) => node.classList.add('is-visible');

    // Anything already in/near the viewport must never remain stuck in its hidden state.
    unique.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.08 && rect.bottom > -80) reveal(node);
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        obs.unobserve(entry.target);
      });
    }, { threshold: isMobile ? 0.03 : 0.1, rootMargin: isMobile ? '0px 0px 14% 0px' : '0px 0px -3% 0px' });

    unique.filter((node) => !node.classList.contains('is-visible')).forEach((node) => observer.observe(node));

    // Safari/iOS safety net: reveal everything if IntersectionObserver is delayed or interrupted.
    const safetyTimer = window.setTimeout(() => unique.forEach(reveal), isMobile ? 1400 : 2600);

    const root = document.documentElement;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        root.style.setProperty('--page-progress', String(Math.min(window.scrollY / max, 1)));
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const cleanup: Array<() => void> = [];
    if (!isMobile && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      Array.from(document.querySelectorAll<HTMLElement>(tiltSelector)).forEach((card) => {
        card.classList.add('motion-tilt');
        const move = (event: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (event.clientX - r.left) / r.width - .5;
          const py = (event.clientY - r.top) / r.height - .5;
          card.style.setProperty('--tilt-x', `${(-py * 4).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${(px * 5).toFixed(2)}deg`);
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
      window.clearTimeout(safetyTimer);
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      cleanup.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
