import React from 'react';
import { Mountain, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const OriginIllustration: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full max-w-[440px] lg:max-w-[480px] mx-auto select-none py-3 px-2 sm:px-4">
      {/* 1. FLOATING CIRCULAR BADGE (Top-Left Overlap) */}
      <div className="absolute -top-1.5 -left-1.5 sm:-top-3 sm:-left-3 z-30">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1F4223] text-[#FAF9F5] p-2 shadow-[0_8px_24px_rgba(22,45,25,0.32)] border-2 border-[#FAF9F5] flex flex-col items-center justify-center text-center">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAA063] mb-0.5" strokeWidth={2} />
          <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.14em] uppercase leading-tight font-sans">
            {t('story.badgeHand')}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.14em] uppercase leading-tight text-[#EAA063] font-sans">
            {t('story.badgeHarvested')}
          </span>
          <span className="text-[6px] sm:text-[6.5px] tracking-[0.16em] uppercase text-[#C5D2BE] mt-0.5 font-mono">
            {t('story.badgeOrigin')}
          </span>
        </div>
      </div>

      {/* 2. PRIMARY FRAMED ILLUSTRATION CARD (Hand-Painted Japanese Animated-Film Artwork) */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E8E0D6] shadow-[0_18px_40px_rgba(31,31,31,0.14),0_4px_14px_rgba(31,31,31,0.06)]">
        {/* Hand-Painted Japanese Animation Style Artwork */}
        <img
          src="/origin_anime_coffee_landscape.jpg"
          alt="Hand-painted Japanese animation style highland coffee farm at sunrise with misty terraces and ruby coffee cherries"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />

        {/* Subtle Inner Editorial Frame */}
        <div
          className="absolute inset-0 pointer-events-none border border-white/35 rounded-2xl"
          aria-hidden="true"
        />
      </div>

      {/* 3. SECONDARY OVERLAPPING MINI-CARD (Bottom-Right Overlap) */}
      <div className="absolute -bottom-3 -right-1.5 sm:-bottom-5 sm:-right-4 z-20 w-44 sm:w-52 p-3 sm:p-4 rounded-lg bg-[#FAF9F5]/95 backdrop-blur-md border border-[#E8E0D6] shadow-[0_14px_30px_rgba(31,31,31,0.14)]">
        <div className="flex items-center space-x-1.5 text-forest-700 mb-1">
          <Mountain className="w-3.5 h-3.5 text-forest-700 shrink-0" strokeWidth={2.2} />
          <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-forest-700 font-sans">
            {t('story.cardTerroir')}
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 font-mono">
            {t('story.elevationValue')}
          </span>
          <span className="text-[10px] text-charcoal-800/70 font-medium">
            {t('story.cardAltitude')}
          </span>
        </div>
        <p className="text-[9.5px] sm:text-[10px] text-charcoal-800/80 leading-snug mt-1 font-sans">
          {t('story.cardDescription')}
        </p>
      </div>

      {/* Decorative Accent */}
      <div className="absolute top-2 right-4 text-forest-700/30 pointer-events-none hidden sm:block">
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
};
