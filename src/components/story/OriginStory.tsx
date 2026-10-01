import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { OriginIllustration } from './OriginIllustration';

export const OriginStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#EFECE3] border-t border-b border-cream-300 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Interactive Illustrated Origin Composition */}
        <div className="lg:col-span-6 flex justify-center items-center w-full">
          <OriginIllustration />
        </div>

        {/* Right Column: Editorial Origin Story & Terroir Metrics */}
        <div className="lg:col-span-6 space-y-6 text-charcoal-800/85 text-sm sm:text-base leading-relaxed">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-forest-700 block mb-3">
              {t('story.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal-900 leading-tight">
              {t('story.title')}
            </h2>
          </div>

          <p>
            {t('story.p1')}
          </p>
          <p>
            {t('story.p2')}
          </p>

          {/* 3-Stat Metric Row */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-charcoal-800/15">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold block">
                {t('story.elevationValue')}
              </span>
              <span className="text-xs uppercase tracking-wider text-charcoal-800/70">
                {t('story.elevationLabel')}
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold block">
                {t('story.harvestValue')}
              </span>
              <span className="text-xs uppercase tracking-wider text-charcoal-800/70">
                {t('story.harvestLabel')}
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-semibold block">
                {t('story.cupScoreValue')}
              </span>
              <span className="text-xs uppercase tracking-wider text-charcoal-800/70">
                {t('story.cupScoreLabel')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
