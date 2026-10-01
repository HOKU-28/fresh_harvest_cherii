import React, { useMemo } from 'react';
import { SAMPLE_PRODUCTS } from '../../data/products';

interface CoffeeRegionTickerProps {
  isReducedMotion?: boolean;
}

export const CoffeeRegionTicker: React.FC<CoffeeRegionTickerProps> = ({ isReducedMotion = false }) => {
  // Extract strictly verified regions from SAMPLE_PRODUCTS (zero invented origins)
  const regions = useMemo(() => {
    return Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.region)));
  }, []);

  // Repeat sequence so that each track is wide enough for seamless continuous marquee on widescreen monitors
  const repeatedRegions = useMemo(() => {
    return [...regions, ...regions, ...regions];
  }, [regions]);

  return (
    <section
      aria-label="Kawasan Asal Kopi Terpilih"
      className="relative w-full overflow-hidden bg-[#FAF9F5] border-y border-[#E8E0D6]/80 py-3.5 sm:py-4 select-none"
    >
      {/* Edge gradient fade masks for smooth editorial edge feathering */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#FAF9F5] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#FAF9F5] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Reduced Motion View: Static, accessible, no moving marquee */}
      {isReducedMotion ? (
        <div className="flex items-center justify-center flex-wrap gap-y-2 px-4 max-w-7xl mx-auto">
          {regions.map((region, idx) => (
            <span
              key={region}
              className="inline-flex items-center mx-4 sm:mx-6 text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] text-charcoal-800/85 font-medium whitespace-nowrap"
            >
              <span>{region}</span>
              {idx < regions.length - 1 && (
                <span className="ml-4 sm:ml-6 text-forest-700/50 select-none" aria-hidden="true">
                  ✦
                </span>
              )}
            </span>
          ))}
        </div>
      ) : (
        /* Animated Seamless Loop: Dual identical tracks moving with gentle smooth jazz cadence */
        <div className="flex w-max anim-ticker-scroll">
          {/* Primary Track */}
          <div className="flex shrink-0 items-center">
            {repeatedRegions.map((region, idx) => (
              <span
                key={`track1-${region}-${idx}`}
                className="inline-flex items-center mx-4 sm:mx-6 text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] text-charcoal-800/85 font-medium whitespace-nowrap transition-colors duration-300 hover:text-forest-800"
              >
                <span>{region}</span>
                <span className="ml-4 sm:ml-6 text-forest-700/50 select-none" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Secondary Track (Identical clone for seamless continuous -50% loop) */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {repeatedRegions.map((region, idx) => (
              <span
                key={`track2-${region}-${idx}`}
                className="inline-flex items-center mx-4 sm:mx-6 text-[11px] sm:text-xs font-sans uppercase tracking-[0.24em] text-charcoal-800/85 font-medium whitespace-nowrap transition-colors duration-300 hover:text-forest-800"
              >
                <span>{region}</span>
                <span className="ml-4 sm:ml-6 text-forest-700/50 select-none">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
