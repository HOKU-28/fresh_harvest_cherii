import React from 'react';

interface ProductPackshotProps {
  name: string;
  region: string;
  altitude: string;
  process: string;
  bagColor?: string;
  size?: 'card' | 'modal' | 'search';
}

export const ProductPackshot: React.FC<ProductPackshotProps> = ({
  name,
  region,
  altitude,
  process,
  bagColor = '#2E5D32',
  size = 'card',
}) => {
  const isModal = size === 'modal';
  const isSearch = size === 'search';

  return (
    <div
      className={`relative w-full flex select-none overflow-hidden transition-all duration-300 ${
        isModal
          ? 'h-64 sm:h-72 md:h-full min-h-[260px] md:min-h-[460px] bg-gradient-to-b from-[#F7F2E8] to-[#EBE4D6] p-6 sm:p-8 flex items-center justify-center'
          : isSearch
          ? 'h-full w-full bg-gradient-to-b from-[#FAF9F5] to-[#F3EFE6] p-2 flex items-center justify-center'
          : 'aspect-[4/3] bg-gradient-to-b from-[#FAF9F5] to-[#F3EFE6] px-3 py-3.5 sm:px-4 sm:py-4 flex items-center justify-center'
      }`}
    >
      {/* Background Subtle Tactile Texture Overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#DDD5C7_1px,transparent_1px)] [background-size:18px_18px] opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Specialty Coffee Pouch Vector Container */}
      <div
        className={`relative flex flex-col items-center justify-center ${
          isModal ? 'w-52 sm:w-60 md:w-64' : isSearch ? 'w-12 sm:w-14' : 'w-24 sm:w-26 md:w-28'
        }`}
      >
        {/* Realistic Multi-Layer Ground Shadows */}
        {/* Layer 1: Tight Contact Occlusion Shadow */}
        <div
          className={`absolute -bottom-1 w-[76%] ${isSearch ? 'h-1' : 'h-1.5'} bg-[#1F1F1F]/25 rounded-full blur-[1px]`}
          aria-hidden="true"
        />
        {/* Layer 2: Diffuse Ambient Tabletop Shadow */}
        <div
          className={`absolute ${isSearch ? '-bottom-2 w-[85%] h-2.5' : '-bottom-3 w-[90%] h-4'} bg-[#1F1F1F]/10 rounded-full blur-md`}
          aria-hidden="true"
        />

        {/* Pouch Body with Pillow/Curved Volume Shading & Inset Gusset Shadows */}
        <div
          className="relative w-full border border-[#DDD6CA] rounded-t-sm rounded-b-md overflow-hidden flex flex-col items-center text-center transition-shadow duration-300"
          style={{
            background:
              'linear-gradient(105deg, #EBE6DC 0%, #FAF8F5 16%, #FFFFFF 46%, #F5F1E8 80%, #DFD8CB 100%)',
            boxShadow:
              'inset 3px 0 6px -2px rgba(42, 36, 34, 0.09), inset -3px 0 6px -2px rgba(42, 36, 34, 0.09), 0 2px 5px -1px rgba(31, 31, 31, 0.06)',
          }}
        >
          {/* Top Seal / Heat Press Strip with Micro-Crimp Texture */}
          <div
            className={`w-full ${isSearch ? 'h-2' : 'h-3 sm:h-3.5'} border-b border-[#D8D0C2] flex items-center justify-center relative overflow-hidden`}
            style={{
              background:
                'repeating-linear-gradient(90deg, #E6E0D4, #E6E0D4 2px, #ECE6DC 2px, #ECE6DC 4px)',
            }}
          >
            {/* Center Heat-Seal Notch Indent */}
            <div className="w-[88%] h-[1px] bg-[#C8C0B2] shadow-xs" />
          </div>

          {/* Clean Pouch Top Header (Upper Kraft Margin without circular valve) */}
          <div className={`w-full ${isSearch ? 'h-1' : 'h-2 sm:h-2.5'}`} />

          {/* Primary Terroir Label Plaque */}
          <div
            className={`w-[85%] ${
              isSearch
                ? 'mb-1.5 p-1'
                : 'mb-2 sm:mb-2.5 p-2 sm:p-2.5'
            } bg-white border border-[#E8E0D6] rounded-sm flex flex-col items-center`}
            style={{
              boxShadow:
                '0 2px 4px rgba(31,31,31,0.04), 0 1px 2px rgba(31,31,31,0.03)',
            }}
          >
            {/* Brand Wordmark Emblem */}
            <span
              className={`${
                isSearch ? 'text-[4.5px] pb-0.5' : 'text-[6.5px] sm:text-[7px] pb-1'
              } font-bold tracking-[0.2em] uppercase text-[#1F1F1F]/70 border-b border-[#E8E0D6] w-full text-center block truncate`}
            >
              The Fresh Harvest
            </span>

            {/* Terroir Color Pill */}
            <div
              className={`w-full ${isSearch ? 'h-0.5 my-0.5' : 'h-1 sm:h-1.5 my-1.5'} rounded-full`}
              style={{ backgroundColor: bagColor }}
            />

            {/* Coffee Name with Standardized Height for Zero Jump */}
            {isSearch ? (
              <span className="font-serif text-[7.5px] font-semibold text-[#1F1F1F] leading-tight truncate w-full block text-center my-0.5">
                {name}
              </span>
            ) : (
              <div className="h-6 sm:h-7 flex items-center justify-center my-0.5 w-full">
                <span className="font-serif text-[10.5px] sm:text-[11.5px] font-semibold text-[#1F1F1F] leading-tight line-clamp-2 text-center">
                  {name}
                </span>
              </div>
            )}

            {/* Region & Elevation */}
            <span
              className={`${
                isSearch ? 'text-[5px] mt-0' : 'text-[7.5px] sm:text-[8px] mt-0.5'
              } uppercase tracking-wider text-[#2E5D32] font-semibold truncate max-w-full block`}
            >
              {region}
            </span>
            <span
              className={`${
                isSearch ? 'text-[4.5px] mt-0' : 'text-[7px] sm:text-[7.5px] mt-0.5'
              } text-[#1F1F1F]/60 font-mono truncate max-w-full block`}
            >
              {altitude} · {process}
            </span>

            {/* Specialty Verification Footnote (Hidden on search mini thumbnail for clarity) */}
            {!isSearch && (
              <div className="mt-1 pt-1 border-t border-[#F0ECE1] w-full flex items-center justify-center text-[6px] sm:text-[6.5px] text-[#1F1F1F]/50 uppercase tracking-widest font-mono">
                <span>Specialty Single Origin</span>
              </div>
            )}
          </div>

          {/* Bottom Fold / Gusset Crease */}
          <div
            className={`w-full ${isSearch ? 'h-1' : 'h-1.5 sm:h-2'} bg-gradient-to-b from-[#EDE8DF] to-[#E3DDD1] border-t border-[#DCD5C7]`}
          />
        </div>
      </div>
    </div>
  );
};
