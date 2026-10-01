import React, { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    items,
    totalCount,
    subtotal,
    updateQuantity,
    removeItem,
    checkoutCart,
  } = useCart();
  const { t, formatPrice } = useLanguage();

  // Scroll lock and Escape key listener
  useEffect(() => {
    if (!isCartOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleExploreClick = () => {
    closeCart();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-[#14171A]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF9F5] border-l border-[#E8E0D6] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#E8E0D6] flex items-center justify-between bg-[#F8F8F5]">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-forest-700" />
            <h2 id="cart-drawer-title" className="font-serif text-xl sm:text-2xl font-medium text-charcoal-900">
              {t('cart.title')}
            </h2>
            {totalCount > 0 && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-700 bg-forest-700/10 px-2 py-0.5 rounded-full">
                {totalCount === 1 ? t('cart.itemCount', { count: totalCount }) : t('cart.itemsCount', { count: totalCount })}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-[#EFECE3] text-charcoal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700"
            aria-label={t('cart.closeAria')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EFECE3] flex items-center justify-center mb-4 text-forest-700">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl text-charcoal-900 mb-2">
              {t('cart.emptyTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-800/75 leading-relaxed max-w-xs mb-6">
              {t('cart.emptyDesc')}
            </p>
            <button
              type="button"
              onClick={handleExploreClick}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-forest-800 hover:bg-forest-900 text-cream-50 shadow-sm transition-colors"
            >
              <span>{t('cart.exploreBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Populated Cart Item List */
          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 divide-y divide-[#E8E0D6]/80">
            {items.map((item) => (
              <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex items-start space-x-4">
                {/* Packshot Miniature Visual */}
                <div
                  className="w-16 h-20 rounded-sm flex items-center justify-center p-1.5 border border-[#E8E0D6] shrink-0 relative overflow-hidden shadow-xs"
                  style={{ backgroundColor: '#F3EFE6' }}
                >
                  <div
                    className="w-8 h-12 rounded-t-sm shadow-xs flex flex-col justify-end items-center p-0.5"
                    style={{ backgroundColor: item.product.bagColor }}
                  >
                    <div className="w-5 h-4 bg-[#FAF9F5]/90 rounded-2xs flex items-center justify-center mb-0.5">
                      <span className="text-[5px] font-bold text-charcoal-900 tracking-tighter">FH</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-forest-700 block">
                        {item.product.category} · {item.product.region}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-medium text-charcoal-900 leading-snug line-clamp-1 mt-0.5">
                        {item.product.name}
                      </h4>
                    </div>
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="text-charcoal-800/40 hover:text-red-700 p-1 transition-colors"
                      aria-label={t('cart.removeAria', { name: item.product.name })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper Controls */}
                    <div className="inline-flex items-center border border-[#E8E0D6] rounded-full bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-charcoal-800 hover:bg-[#EFECE3] rounded-full transition-colors focus:outline-none"
                        aria-label={t('cart.decreaseAria', { name: item.product.name })}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs px-2.5 min-w-[2rem] text-center font-medium text-charcoal-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-charcoal-800 hover:bg-[#EFECE3] rounded-full transition-colors focus:outline-none"
                        aria-label={t('cart.increaseAria', { name: item.product.name })}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item Total Price */}
                    <span className="font-serif text-sm sm:text-base font-semibold text-charcoal-900">
                      {formatPrice((parseFloat(String(item.product.price).replace(/[^0-9.]/g, '')) || 0) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#E8E0D6] bg-[#F8F8F5]">
            {/* Subtotal Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-800/80">
                {t('cart.subtotal')}
              </span>
              <span className="font-serif text-xl sm:text-2xl font-semibold text-charcoal-900 font-mono">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Primary Checkout CTA */}
            <button
              type="button"
              onClick={checkoutCart}
              className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-full bg-[#1F1F1F] hover:bg-forest-800 text-[#F8F8F5] text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-md transition-all duration-200"
            >
              <span>{t('cart.checkoutBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Continue Shopping link */}
            <button
              type="button"
              onClick={closeCart}
              className="w-full text-center text-xs uppercase tracking-wider font-medium text-charcoal-800/70 hover:text-charcoal-900 mt-3 py-1 transition-colors"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
