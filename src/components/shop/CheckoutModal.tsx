import React, { useEffect, useState, useMemo } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Building2, QrCode, Wallet } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type PaymentMethodType = 'va' | 'qris' | 'ewallet';

export const CheckoutModal: React.FC = () => {
  const { checkoutSummary, closeCheckout, clearCart } = useCart();
  const { t, formatPrice } = useLanguage();
  const isReducedMotion = useReducedMotion();

  const [step, setStep] = useState<'review' | 'success'>('review');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodType>('va');

  // Reset to review step and default payment whenever a new checkout summary is opened
  useEffect(() => {
    if (checkoutSummary) {
      setStep('review');
      setSelectedPayment('va');
    }
  }, [checkoutSummary]);

  // Lock background scroll and listen for Escape key
  useEffect(() => {
    if (!checkoutSummary) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCheckout();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [checkoutSummary, closeCheckout]);

  if (!checkoutSummary) return null;

  const { items } = checkoutSummary;

  const totalNumeric = useMemo(() => {
    return items.reduce((sum, item) => {
      const priceNum =
        typeof item.product.price === 'number'
          ? item.product.price
          : parseFloat(String(item.product.price).replace(/[^0-9.]/g, '')) || 0;
      return sum + priceNum * item.quantity;
    }, 0);
  }, [items]);

  const handleConfirmOrder = () => {
    clearCart();
    setStep('success');
  };

  const paymentOptions: { id: PaymentMethodType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'va', label: t('checkout.va'), icon: Building2 },
    { id: 'qris', label: t('checkout.qris'), icon: QrCode },
    { id: 'ewallet', label: t('checkout.ewallet'), icon: Wallet },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-[#14171A]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCheckout}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FAF9F5] border border-[#E8E0D6] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-left max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeCheckout}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EFECE3] text-[#1F1F1F] transition-colors focus:outline-none focus:ring-2 focus:ring-forest-700 z-20"
          aria-label={t('checkout.closeAria')}
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'review' ? (
          <>
            {/* Heading */}
            <div className="flex items-center space-x-2.5 mb-2 text-forest-700">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-xs uppercase tracking-[0.16em] font-semibold">
                {t('checkout.readyToShip')}
              </span>
            </div>
            <h3 id="checkout-title" className="font-serif text-2xl sm:text-3xl text-charcoal-900 mb-4">
              {t('checkout.title')}
            </h3>

            {/* Product Items List (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 mb-4 space-y-2.5 max-h-[30vh]">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3 bg-[#EFECE3]/70 border border-[#E8E0D6] rounded-lg flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] uppercase tracking-wider text-forest-700 font-semibold block mb-0.5">
                      {t(`categories.${product.category}`) || product.category} · {product.region}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-medium text-charcoal-900 leading-snug truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs text-charcoal-800/70 font-mono">
                      Qty: {quantity} × {formatPrice(product.price)}
                    </span>
                  </div>
                  <span className="font-serif text-sm sm:text-base font-semibold text-charcoal-900 shrink-0 font-mono">
                    {formatPrice((parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment Method Selector */}
            <div className="mb-4">
              <label className="text-xs uppercase tracking-wider font-semibold text-charcoal-800/80 block mb-2">
                {t('checkout.paymentMethod')}
              </label>
              <div
                role="radiogroup"
                aria-label={t('checkout.paymentMethod')}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                {paymentOptions.map(({ id, label, icon: Icon }) => {
                  const isSelected = selectedPayment === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedPayment(id)}
                      className={`p-2.5 sm:p-3 rounded-lg border text-left flex items-center justify-between sm:justify-start sm:flex-col sm:items-start gap-1.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest-700 ${
                        isSelected
                          ? 'border-forest-700 bg-forest-50/60 text-forest-900 ring-1 ring-forest-700 shadow-sm'
                          : 'border-[#E8E0D6] bg-[#FAF9F5] text-charcoal-800 hover:border-[#D0C5B4] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-1.5">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-forest-700' : 'text-charcoal-800/60'}`} />
                        <span className="text-xs font-medium font-sans leading-tight">
                          {label}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-700 shrink-0 sm:hidden" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Row */}
            <div className="flex items-center justify-between border-t border-[#E8E0D6] pt-3 mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-800/80">
                {t('checkout.totalPayment')}
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 font-mono">
                {formatPrice(totalNumeric)}
              </span>
            </div>

            {/* Terroir & Quality Guarantee */}
            <div className="flex items-start space-x-2 mb-5 text-[11px] sm:text-xs text-charcoal-800/80">
              <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <p>{t('checkout.guarantee')}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-[#1F1F1F] hover:bg-forest-800 text-[#F8F8F5] shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-forest-700"
              >
                <span>{t('checkout.confirmBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={closeCheckout}
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase text-charcoal-800 hover:bg-[#EFECE3] border border-[#E8E0D6] transition-colors focus:outline-none"
              >
                {t('checkout.backBtn')}
              </button>
            </div>
          </>
        ) : (
          /* Success State (Step 2: In-Modal Animated Order Confirmation) */
          <div className="py-4 sm:py-6 flex flex-col items-center text-center">
            {/* SVG Circle & Checkmark Animation */}
            <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
              <svg
                viewBox="0 0 72 72"
                className="w-20 h-20 text-forest-700"
                fill="none"
                aria-hidden="true"
              >
                {/* 1. Circle Outline */}
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="3"
                  className={isReducedMotion ? '' : 'anim-checkout-circle'}
                />
                {/* 2. Checkmark Path */}
                <path
                  d="M23 37 L32 46 L49 26"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isReducedMotion ? '' : 'anim-checkout-check'}
                />
              </svg>
            </div>

            {/* Success Eyebrow Badge */}
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-forest-700 block mb-2 ${
                isReducedMotion ? '' : 'anim-checkout-heading'
              }`}
            >
              {t('checkout.successBadge')}
            </span>

            {/* Success Heading */}
            <h3
              id="checkout-title"
              className={`font-serif text-2xl sm:text-3xl text-charcoal-900 mb-3 ${
                isReducedMotion ? '' : 'anim-checkout-heading'
              }`}
            >
              {t('checkout.successTitle')}
            </h3>

            {/* Supporting Description */}
            <p
              className={`text-xs sm:text-sm text-charcoal-800/80 leading-relaxed max-w-sm mb-6 ${
                isReducedMotion ? '' : 'anim-checkout-text'
              }`}
            >
              {t('checkout.successSubtitle')}
            </p>

            {/* Order Summary Recap Box */}
            <div
              className={`w-full p-4 rounded-lg bg-[#EFECE3]/70 border border-[#E8E0D6] mb-6 text-left text-xs ${
                isReducedMotion ? '' : 'anim-checkout-text'
              }`}
            >
              <div className="flex justify-between items-center py-1">
                <span className="text-charcoal-800/70 font-mono">
                  {t('checkout.selectedMethodPrefix')}:
                </span>
                <span className="font-semibold text-charcoal-900 font-mono">
                  {t(`checkout.${selectedPayment}`)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-[#E8E0D6]/80 mt-1.5 pt-1.5">
                <span className="text-charcoal-800/70 font-mono">
                  {t('checkout.totalPayment')}:
                </span>
                <span className="font-serif text-base font-bold text-charcoal-900 font-mono">
                  {formatPrice(totalNumeric)}
                </span>
              </div>
            </div>

            {/* Final Action Button */}
            <button
              type="button"
              onClick={closeCheckout}
              className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-[#1F1F1F] hover:bg-forest-800 text-[#F8F8F5] shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-forest-700 ${
                isReducedMotion ? '' : 'anim-checkout-action'
              }`}
            >
              {t('checkout.doneBtn')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
