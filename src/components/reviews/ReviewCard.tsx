import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../data/reviews';
import { useLanguage } from '../../i18n/LanguageContext';

interface ReviewCardProps {
  review: Review;
  isReducedMotion?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, isReducedMotion = false }) => {
  const { locale } = useLanguage();

  return (
    <article
      className={`bg-[#FAF9F5] border border-[#E8E2D9] rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-[0_1px_4px_rgba(31,31,31,0.03)] ${
        isReducedMotion
          ? ''
          : 'transition-all duration-300 hover:shadow-lg hover:border-[#D6CCC0] hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Top bar: 5-Star Rating Badge & Associated Coffee Lot */}
        <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-[#EFEBE4]">
          {/* 5-Star Rating Badge (★★★★★) */}
          <div
            className="flex items-center space-x-1"
            aria-label={`${review.rating} / 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                className="w-3.5 h-3.5 text-amber-700 fill-amber-600"
                aria-hidden="true"
              />
            ))}
            <span className="text-xs font-mono font-medium text-[#7A746B] ml-1.5">
              5.0
            </span>
          </div>

          {/* Coffee lot reference chip */}
          <span className="inline-block text-[11px] font-mono tracking-wide text-[#3D3830] bg-[#EFEAE2] px-2.5 py-0.5 rounded-full border border-[#E0D8CC]">
            {review.productName}
          </span>
        </div>

        {/* Pull-quote Headline */}
        <blockquote className="mt-4">
          <p className="font-serif text-base sm:text-lg font-semibold text-[#1F1F1F] leading-snug">
            “{review.headline[locale]}”
          </p>
        </blockquote>

        {/* Review body */}
        <p className="text-[13px] sm:text-sm text-[#4E4840] leading-relaxed mt-3">
          {review.comment[locale]}
        </p>
      </div>

      {/* Footer: Reviewer Attribution (No date, no brew method) */}
      <div className="mt-6 pt-4 border-t border-[#EFEBE4]">
        <div className="font-serif text-sm font-semibold text-[#1F1F1F]">
          {review.name}
        </div>
        <div className="text-xs text-[#7A746B] font-mono mt-0.5">
          {review.location[locale]}
        </div>
      </div>
    </article>
  );
};
