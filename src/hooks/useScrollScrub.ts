import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface UseScrollScrubOptions {
  isReducedMotion: boolean;
  manualState?: 'morning' | 'golden';
}

/**
 * Initializes hero theme variables and subtle editorial motion.
 */
export function useScrollScrub(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options: UseScrollScrubOptions
) {
  const { isReducedMotion } = options;
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 1. Establish high-contrast morning theme variables
    document.documentElement.style.setProperty('--nav-color', '#1F1F1F');
    el.style.setProperty('--hero-headline-color', '#1F1F1F');
    el.style.setProperty('--hero-subtext-color', '#1F1F1F');
    el.style.setProperty('--hero-eyebrow-color', '#2E5D32');
    el.style.setProperty('--hero-btn-bg', '#1F1F1F');
    el.style.setProperty('--hero-btn-text', '#F8F8F5');
    el.style.setProperty('--hero-btn-border', 'rgba(31, 31, 31, 0.22)');

    // Reset unpinned flag on mount
    document.documentElement.removeAttribute('data-hero-unpinned');
    window.dispatchEvent(new CustomEvent('hero-unpin-change', { detail: { unpinned: false } }));

    // 2. Reduced motion fallback: completely static presentation
    if (isReducedMotion) {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      const bgImg = el.querySelector('#hero-bg-artwork');
      if (bgImg) gsap.set(bgImg, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    // 3. Calm editorial motion context
    const ctx = gsap.context(() => {
      const bgImg = el.querySelector('#hero-bg-artwork');
      const contentElements = el.querySelectorAll('.hero-anim-item');
      const indicator = el.querySelector('#hero-scroll-indicator');

      // Subtle entrance animation on initial load (keeps content fully visible by default)
      if (bgImg) {
        gsap.from(bgImg, {
          scale: 1.05,
          duration: 1.2,
          ease: 'power2.out',
        });
      }

      if (contentElements.length > 0) {
        gsap.from(contentElements, {
          y: 12,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }

      // Restrained parallax depth on desktop screens (>= 1024px)
      if (bgImg && window.innerWidth >= 1024) {
        gsap.to(bgImg, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Scroll indicator fade-out on initial scroll
      if (indicator) {
        gsap.to(indicator, {
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '120 top',
            scrub: true,
          },
        });
      }

      // Navbar backdrop trigger: engages frosted glass as hero scrolls past 40px
      triggerRef.current = ScrollTrigger.create({
        trigger: el,
        start: 'top -40px',
        onEnter: () => {
          document.documentElement.setAttribute('data-hero-unpinned', 'true');
          window.dispatchEvent(new CustomEvent('hero-unpin-change', { detail: { unpinned: true } }));
        },
        onLeaveBack: () => {
          document.documentElement.removeAttribute('data-hero-unpinned');
          window.dispatchEvent(new CustomEvent('hero-unpin-change', { detail: { unpinned: false } }));
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [containerRef, isReducedMotion]);
}
