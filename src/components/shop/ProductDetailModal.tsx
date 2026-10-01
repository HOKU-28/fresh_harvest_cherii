import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product, renderProductBadge } from './ProductCard';
import { ProductPackshot } from './ProductPackshot';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart, buyNow } = useCart();
  const { t, formatPrice } = useLanguage();
  const [addedSuccess, setAddedSuccess] = useState(false);

  // 1. Lock background scroll & handle Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset feedback state on modal open / product change
  useEffect(() => {
    setAddedSuccess(false);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    buyNow(product, 1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Frosted Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[#14171A]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-[880px] max-h-[92vh] sm:max-h-[88vh] bg-[#FAF9F5] border border-[#E2DACF] rounded-2xl shadow-[0_25px_60px_-15px_rgba(20,23,26,0.3)] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row z-10 transition-all duration-300">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-9 h-9 rounded-full bg-[#FAF9F5] hover:bg-[#EFECE3] text-[#1F1F1F] border border-[#E8E0D6] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700 shadow-xs cursor-pointer"
          aria-label={t('productModal.closeAria')}
        >
          <X className="w-4 h-4 text-charcoal-800" strokeWidth={2} />
        </button>

        {/* Left Column: Product Stage Canvas with Top-Left Badge */}
        <div className="w-full md:w-[44%] bg-[#F5EFEB] border-b md:border-b-0 md:border-r border-[#E8E0D6] relative flex flex-col justify-center shrink-0 overflow-hidden">
          {product.badge && (
            <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10 pointer-events-none">
              {renderProductBadge(product.badge, t(`badges.${product.badge}`))}
            </div>
          )}
          <ProductPackshot
            name={product.name}
            region={product.region}
            altitude={product.altitude}
            process={product.process}
            bagColor={product.bagColor}
            size="modal"
          />
        </div>

        {/* Right Column: Full Product Specs, Narrative & Shopping Actions */}
        <div className="w-full md:w-[56%] p-6 sm:p-7 md:p-8 md:overflow-y-auto flex flex-col justify-between bg-[#FAF9F5]">
          <div>
            {/* Category & Origin Tags */}
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-800 mb-2">
              <span>{t(`categories.${product.category}`) || product.category}</span>
              <span className="mx-1.5 opacity-60">·</span>
              <span>{product.region}</span>
            </div>

            {/* Product Title */}
            <h2
              id="modal-product-title"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-charcoal-900 leading-[1.18] mb-3"
            >
              {product.name}
            </h2>

            {/* Price Line with Unit Spec */}
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 font-mono tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-charcoal-800/50 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-charcoal-800/60 font-medium ml-2">
                {t('productModal.unitSpec')}
              </span>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="border-t border-[#E8E0D6] my-4" />

            {/* Origin & Terroir Story */}
            <div className="mb-4">
              <h4 className="text-[11px] uppercase tracking-[0.18em] font-bold text-charcoal-900 mb-2">
                {t('productModal.originStoryHeading')}
              </h4>
              <p className="text-[13px] sm:text-[13.5px] text-charcoal-800/85 leading-relaxed">
                {t(`productDescriptions.${product.id}.description`) || product.description}
              </p>
            </div>

            {/* Terroir & Process Metrics (3-column specification panel) */}
            <div className="grid grid-cols-3 gap-2 p-3 sm:p-3.5 bg-[#F3EFE6]/75 border border-[#E6E0D6] rounded-lg mb-4 text-left">
              <div className="pr-2 border-r border-[#E2DAD0]/60">
                <span className="block text-[9.5px] sm:text-[10px] uppercase tracking-wider text-charcoal-800/60 font-medium mb-0.5">
                  {t('productModal.elevation')}
                </span>
                <span className="font-semibold text-charcoal-900 font-mono text-xs sm:text-[13px]">
                  {product.altitude}
                </span>
              </div>
              <div className="px-2 border-r border-[#E2DAD0]/60">
                <span className="block text-[9.5px] sm:text-[10px] uppercase tracking-wider text-charcoal-800/60 font-medium mb-0.5">
                  {t('productModal.process')}
                </span>
                <span className="font-semibold text-charcoal-900 text-xs sm:text-[13px] truncate block">
                  {product.process}
                </span>
              </div>
              <div className="pl-2">
                <span className="block text-[9.5px] sm:text-[10px] uppercase tracking-wider text-charcoal-800/60 font-medium mb-0.5">
                  {t('productModal.roastLevel')}
                </span>
                <span className="font-semibold text-charcoal-900 text-xs sm:text-[13px]">
                  {t(`roastLevels.${product.roast}`) || product.roast}
                </span>
              </div>
            </div>

            {/* Flavor Profile / Tasting Notes */}
            {product.notes && product.notes.length > 0 && (
              <div className="mb-5">
                <h4 className="text-[11px] uppercase tracking-[0.18em] font-bold text-charcoal-900 mb-2">
                  {t('productModal.flavorProfileHeading')}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs px-3 py-1 rounded-full bg-[#FAF9F5] text-charcoal-900 font-medium border border-[#DDD6CA] shadow-2xs"
                    >
                      {t(`productNotes.${note}`) || note}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Primary Shopping Actions */}
          <div className="pt-4 border-t border-[#E8E0D6] flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full sm:flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 sm:py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
                addedSuccess
                  ? 'bg-forest-800 text-cream-50 border-forest-800 shadow-sm'
                  : 'bg-[#F4EEE5] hover:bg-white text-[#1F1F1F] border-[#1F1F1F]/40 hover:border-[#1F1F1F] shadow-2xs'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-cream-100" />
                  <span>{t('productModal.addedSuccess')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('productModal.addToCart')}</span>
                </>
              )}
            </button>

            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 sm:py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 bg-[#1F1F1F] hover:bg-forest-800 text-[#F8F8F5] shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{t('productModal.buyNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
