import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SAMPLE_REVIEWS } from '../../data/reviews';
import { ReviewCard } from './ReviewCard';

interface ReviewsSectionProps {
  isReducedMotion?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ isReducedMotion = false }) => {
  const { t } = useLanguage();

  return (
    <section
      id="reviews"
      className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F8F7F3] border-b border-cream-300"
      aria-label="Customer Reviews"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-forest-700 block mb-3 font-mono">
            {t('reviews.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal-900 leading-tight">
            {t('reviews.title')}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/80 font-light mt-4 leading-relaxed max-w-2xl">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* 3-Review Editorial Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SAMPLE_REVIEWS.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
