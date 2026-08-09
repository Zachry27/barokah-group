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

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const unique = nodes.filter((node, index) => nodes.indexOf(node) === index && !node.closest('[data-no-reveal]'));

    unique.forEach((node, index) => {
      node.classList.add('motion-reveal');
      node.style.setProperty('--motion-delay', `${Math.min((index % 6) * 65, 325)}ms`);
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    unique.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
