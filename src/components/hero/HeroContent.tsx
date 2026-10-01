import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const HeroContent: React.FC = () => {
  const { t } = useLanguage();

  const titleText = t('hero.title');

  // Renders divider between "Tempat" and "Tempat" with straight, non-italic, centered typography
  const renderHeadline = (text: string) => {
    const parts = text.split(/(Tempat)\s*[-–—]\s*(Tempat)/);
    if (parts.length === 4) {
      return (
        <>
          {parts[0]}
          {parts[1]}
          <span
            className="inline-block font-sans not-italic font-normal align-middle select-none text-[0.7em] mx-1.5 leading-none text-current"
            aria-hidden="true"
          >
            -
          </span>
          {parts[2]}
          {parts[3]}
        </>
      );
    }
    return text;
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-16 sm:pt-20 lg:pt-22 xl:pt-24 pointer-events-none">
      {/* 
        Positioned intentionally in the open sky pocket (between left botanical branch & right morning sun).
        lg:pl-[18%] xl:pl-[22%] creates comfortable breathing room past the coffee foliage.
      */}
      <div className="max-w-xl lg:max-w-2xl lg:pl-[18%] xl:pl-[22%] pointer-events-auto">
        
        {/* Eyebrow / Category Tag */}
        <div className="hero-anim-item inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] mb-3 text-[#2E5D32]">
          {t('hero.eyebrow')}
        </div>

        {/* Editorial Headline (Calibrated to 2-3 lines to fit entirely in the open sky) */}
        <h1 className="hero-anim-item font-serif text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-normal tracking-tight leading-[1.08] text-[#1F1F1F] drop-shadow-sm max-w-xl">
          {renderHeadline(titleText)}
        </h1>

        {/* Supporting Paragraph */}
        <p className="hero-anim-item mt-4 text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#1F1F1F]/85 max-w-lg">
          {t('hero.description')}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="hero-anim-item mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
          {/* Primary CTA */}
          <a
            href="#products"
            className="inline-flex items-center space-x-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 bg-[#1F1F1F] text-[#F8F8F5]"
          >
            <span>{t('hero.exploreCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA with warm cream background and darker border */}
          <a
            href="#story"
            className="inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 bg-[#F4EEE5] hover:bg-white border border-[#1F1F1F]/35 text-[#1F1F1F] shadow-sm hover:shadow-md"
          >
            <span>{t('hero.storyCta')}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
