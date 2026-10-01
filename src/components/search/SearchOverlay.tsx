import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, SAMPLE_PRODUCTS } from '../../data/products';
import { useLanguage } from '../../i18n/LanguageContext';
import { ProductPackshot } from '../shop/ProductPackshot';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const REGION_CHIPS = ['Semua', 'Colombia', 'Ethiopia', 'Guatemala', 'Kenya', 'Indonesia'];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState('Semua');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, formatPrice } = useLanguage();

  // Auto-focus input when opened & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    setQuery('');
    setSelectedChip('Semua');

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Client-side filtering across name, region, notes, category, process, and roast
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SAMPLE_PRODUCTS.filter((product) => {
      // 1. Chip filter
      if (selectedChip !== 'Semua') {
        const matchesChip =
          product.region.toLowerCase().includes(selectedChip.toLowerCase()) ||
          product.name.toLowerCase().includes(selectedChip.toLowerCase());
        if (!matchesChip) return false;
      }

      // 2. Text query filter
      if (!q) return true;

      const inName = product.name.toLowerCase().includes(q);
      const inRegion = product.region.toLowerCase().includes(q);
      const inCategory = product.category.toLowerCase().includes(q);
      const inProcess = product.process.toLowerCase().includes(q);
      const inRoast = product.roast.toLowerCase().includes(q);
      const inNotes = product.notes.some((note) => note.toLowerCase().includes(q));

      return inName || inRegion || inCategory || inProcess || inRoast || inNotes;
    });
  }, [query, selectedChip]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-start items-center p-3 sm:p-6 md:p-12 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={t('search.inputAria')}
    >
      {/* Frosted Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#14171A]/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Container Card */}
      <div className="relative w-full max-w-3xl bg-[#FAF9F5] border border-[#E8E0D6] rounded-md shadow-2xl overflow-hidden z-10 my-auto sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E0D6] bg-[#FAF9F5]">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-forest-700 shrink-0 mr-3 sm:mr-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.inputPlaceholder')}
            className="flex-1 font-serif text-base sm:text-xl md:text-2xl text-charcoal-900 placeholder:text-charcoal-800/40 bg-transparent focus:outline-none"
            aria-label={t('search.inputAria')}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full hover:bg-[#EFECE3] text-charcoal-800 transition-colors mr-2 focus:outline-none"
              aria-label={t('search.clearAria')}
            >
              <X className="w-4 h-4 text-charcoal-800/60" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFECE3] text-charcoal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700 shrink-0"
            aria-label={t('search.closeAria')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Origin Chips */}
        <div className="px-4 sm:px-6 py-3 bg-[#F3EFE6]/60 border-b border-[#E8E0D6] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] uppercase tracking-wider text-charcoal-800/60 font-semibold shrink-0 mr-1">
            {t('search.regionLabel')}
          </span>
          {REGION_CHIPS.map((chip) => {
            const isActive = selectedChip === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setSelectedChip(chip)}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                  isActive
                    ? 'bg-forest-800 text-cream-50 shadow-xs'
                    : 'bg-[#FAF9F5] text-charcoal-800 hover:bg-white border border-[#E8E0D6]'
                }`}
              >
                {chip === 'Semua' ? t('search.all') : chip}
              </button>
            );
          })}
        </div>

        {/* Search Results List */}
        <div className="max-h-[58vh] overflow-y-auto divide-y divide-[#E8E0D6]/70 p-2 sm:p-3">
          {filteredProducts.length === 0 ? (
            /* No Results */
            <div className="py-12 px-6 text-center">
              <p className="font-serif text-lg text-charcoal-900 mb-2">
                {t('search.noResultsTitle')}
              </p>
              <p className="text-xs sm:text-sm text-charcoal-800/70 max-w-md mx-auto mb-4">
                {t('search.noResultsDesc')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedChip('Semua');
                }}
                className="px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-forest-800 bg-[#EFECE3] hover:bg-[#E5E0D5] transition-colors"
              >
                {t('search.resetBtn')}
              </button>
            </div>
          ) : (
            /* Results Items */
            filteredProducts.map((prod) => (
              <article
                key={prod.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectProduct(prod)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(prod);
                  }
                }}
                className="p-3 sm:p-4 rounded-sm hover:bg-[#F3EFE6]/80 cursor-pointer flex items-center space-x-3 sm:space-x-4 group transition-colors focus:outline-none focus:ring-1 focus:ring-forest-700"
              >
                {/* Packshot Thumbnail Preview */}
                <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-sm flex items-center justify-center border border-[#E8E0D6] shrink-0 overflow-hidden shadow-sm bg-[#F5EFEB]">
                  <ProductPackshot
                    name={prod.name}
                    region={prod.region}
                    altitude={prod.altitude}
                    process={prod.process}
                    bagColor={prod.bagColor}
                    size="search"
                  />
                </div>

                {/* Product Metadata & Notes */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-forest-700 font-semibold mb-0.5">
                    <span>{t(`categories.${prod.category}`) || prod.category}</span>
                    <span>·</span>
                    <span className="text-charcoal-800/70 font-normal">{prod.region}</span>
                    <span>·</span>
                    <span className="text-charcoal-800/60 font-mono">{prod.process}</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal-900 leading-snug group-hover:text-forest-700 transition-colors truncate">
                    {prod.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {prod.notes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F5] text-charcoal-800 font-medium border border-[#E8E0D6]/90"
                      >
                        {t(`productNotes.${note}`) || note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Arrow */}
                <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 pl-2">
                  <span className="font-serif text-base sm:text-lg font-semibold text-charcoal-900">
                    {formatPrice(prod.price)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF9F5] group-hover:bg-forest-800 group-hover:text-white flex items-center justify-center border border-[#E8E0D6] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Search Footer Instruction */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#FAF9F5] border-t border-[#E8E0D6] flex items-center justify-between text-[11px] text-charcoal-800/60">
          <span>{t('search.showingCount', { count: filteredProducts.length })}</span>
          <span className="hidden sm:inline-flex items-center space-x-1 font-mono">
            <span>{t('search.pressKey')}</span>
            <kbd className="px-1.5 py-0.5 bg-[#EFECE3] border border-[#E8E0D6] rounded text-[10px]">Esc</kbd>
            <span>{t('search.escToClose')}</span>
          </span>
        </div>

      </div>
    </div>
  );
};
