import React from 'react';
import { ProductCard, Product } from './ProductCard';
import { SAMPLE_PRODUCTS } from '../../data/products';
import { useLanguage } from '../../i18n/LanguageContext';

export { SAMPLE_PRODUCTS };

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const { t } = useLanguage();

  return (
    <section id="products" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto bg-[#F8F8F5]">
      {/* Editorial Section Header */}
      <div className="max-w-2xl mb-12 sm:mb-16">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-forest-700 block mb-3">
          {t('catalog.eyebrow')}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal-900 leading-tight">
          {t('catalog.title')}
        </h2>
        <p className="mt-4 text-charcoal-800/80 text-sm sm:text-base leading-relaxed">
          {t('catalog.description')}
        </p>
      </div>

      {/* Unified Product Grid — Single cohesive catalog without duplicate rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SAMPLE_PRODUCTS.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};
