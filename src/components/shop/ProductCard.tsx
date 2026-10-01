import React from 'react';
import { ProductPackshot } from './ProductPackshot';
import { useLanguage } from '../../i18n/LanguageContext';

export type ProductBadgeType =
  | 'BEST SELLER'
  | 'RECOMMENDED'
  | 'NEW'
  | 'LIMITED EDITION'
  | 'SALE'
  | 'BUNDLE & SAVE'
  | 'LOW STOCK';

export interface Product {
  id: string;
  name: string;
  category: string;
  region: string;
  altitude: string;
  process: string;
  harvestYear?: string;
  notes: string[];
  price: string;
  originalPrice?: string;
  roast: 'Light' | 'Medium' | 'Medium-Dark';
  roastDescription?: string;
  description: string;
  badge?: ProductBadgeType;
  bagColor: string;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const renderProductBadge = (badge?: ProductBadgeType, labelOverride?: string) => {
  if (!badge) return null;

  const styles: Record<ProductBadgeType, string> = {
    'BEST SELLER': 'bg-[#2E5D32] text-[#F8F8F5] border border-[#2E5D32]',
    'RECOMMENDED': 'bg-[#F4EEE5] text-[#1F1F1F] border border-[#1F1F1F]/30',
    'NEW': 'bg-[#8FA187]/25 text-[#162D19] border border-[#8FA187]/45',
    'LIMITED EDITION': 'bg-[#EAA063]/25 text-[#2A2422] border border-[#EAA063]/50',
    'SALE': 'bg-[#C26E54]/20 text-[#8E2818] border border-[#C26E54]/45',
    'BUNDLE & SAVE': 'bg-[#EFECE3] text-[#1F4223] border border-[#2E5D32]/35',
    'LOW STOCK': 'bg-[#FBD087]/30 text-[#2A2422] border border-[#EAA063]/50',
  };

  const displayText = labelOverride || badge;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase shadow-xs ${styles[badge]}`}
    >
      {displayText}
    </span>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { t, formatPrice } = useLanguage();
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      aria-label={`Lihat detail kopi ${product.name}`}
      className="bg-[#FAF9F5] border border-[#E8E0D6] rounded-sm p-4 sm:p-5 flex flex-col justify-between shadow-[0_1px_3px_rgba(31,31,31,0.06),0_1px_2px_rgba(31,31,31,0.04)] hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:shadow-[0_14px_28px_-8px_rgba(31,31,31,0.12),0_6px_12px_-4px_rgba(31,31,31,0.06)] hover:border-forest-700/40 active:translate-y-0 active:shadow-[0_2px_4px_rgba(31,31,31,0.08)] active:duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 motion-reduce:hover:transform-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer text-left"
    >
      <div>
        {/* Dedicated Reserved Badge Zone (Option 1: Reserved row above product image) */}
        <div className="h-6 sm:h-6.5 flex items-center mb-2 px-0.5" aria-hidden={!product.badge}>
          {product.badge ? (
            renderProductBadge(product.badge, t(`badges.${product.badge}`))
          ) : (
            <div className="invisible select-none text-[9px] py-0.5 leading-none" aria-hidden="true">
              &nbsp;
            </div>
          )}
        </div>

        {/* Product Packshot Container */}
        <div className="relative w-full rounded-sm overflow-hidden mb-4 bg-[#F3EFE6]">
          <ProductPackshot
            name={product.name}
            region={product.region}
            altitude={product.altitude}
            process={product.process}
            bagColor={product.bagColor}
            size="card"
          />
        </div>

        {/* Category & Region Metadata */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-forest-700 font-semibold mb-1.5">
          <span>{t(`categories.${product.category}`) || product.category}</span>
          <span className="text-charcoal-800/60 font-normal">{product.region}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-900 mb-2.5 leading-snug group-hover:text-forest-700 transition-colors">
          {product.name}
        </h3>

        {/* Tasting Notes (Visually distinct from promotional badges) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.map((note) => (
            <span
              key={note}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[#EFECE3] text-charcoal-800/90 font-medium border border-[#E8E0D6]"
            >
              {t(`productNotes.${note}`) || note}
            </span>
          ))}
        </div>
      </div>

      {/* Price & Terroir Altitude Footer */}
      <div className="pt-3 border-t border-[#E8E0D6]/70 flex items-center justify-between mt-auto">
        <div className="flex items-baseline space-x-2">
          <span className="font-serif text-lg sm:text-xl font-semibold text-charcoal-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-charcoal-800/50 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <span className="text-[11px] text-charcoal-800/60 uppercase tracking-wider font-mono">
          {product.altitude}
        </span>
      </div>
    </article>
  );
};
