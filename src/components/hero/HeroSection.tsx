import React, { useRef } from 'react';
import { HeroContent } from './HeroContent';
import { useScrollScrub } from '../../hooks/useScrollScrub';

interface HeroSectionProps {
  isReducedMotion: boolean;
  manualState?: 'morning' | 'golden';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isReducedMotion,
  manualState = 'morning',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize subtle editorial motion & scroll triggers
  useScrollScrub(containerRef, { isReducedMotion, manualState });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden select-none bg-[#EAEBE2]"
      aria-label="Highland Coffee Farm Morning Harvest Landscape"
    >
      {/* 1. Primary Responsive Artwork Foundation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          id="hero-bg-artwork"
          src="/fresh_harvest_morning.png"
          alt="Highland single-origin coffee farm at morning harvest with misty mountains and red coffee cherries"
          className="w-full h-full object-cover object-[28%_top] sm:object-[34%_top] md:object-[30%_top] lg:object-[20%_top] xl:object-[center_top] will-change-transform scale-[1.02]"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 2. Soft Text Readability Scrim (Localized to text area; preserves artwork depth & sun) */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(105deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.35) 32%, rgba(255, 255, 255, 0) 65%)',
        }}
        aria-hidden="true"
      />

      {/* 3. Atmospheric Bottom Mist Feathering (Blends dark ground into cream #products) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(248, 248, 245, 0.2) 45%, rgba(248, 248, 245, 0.75) 80%, #F8F8F5 100%)',
        }}
        aria-hidden="true"
      />

      {/* 3. Hero Editorial Content Overlay */}
      <HeroContent />

      {/* 4. Refined Bottom Scroll Indicator */}
      <div
        id="hero-scroll-indicator"
        className="relative z-20 pb-6 sm:pb-8 flex flex-col items-center pointer-events-none transition-opacity duration-300"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#1F1F1F]/80 mb-1.5 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
          Scroll to explore
        </span>
        <svg
          className="w-4 h-4 text-[#1F1F1F]/80 animate-bounce drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};
