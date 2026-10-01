import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#14171A] text-[#E8E0D6] py-16 px-6 lg:px-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-serif text-2xl font-bold tracking-[0.14em] uppercase text-cream-50 block mb-4">
            The Fresh Harvest
          </span>
          <p className="text-sm text-cream-300/80 leading-relaxed max-w-md">
            {t('footer.brandBio')}
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-cream-100 mb-4">
            {t('footer.navigationTitle')}
          </h4>
          <ul className="space-y-2 text-sm text-cream-300/70">
            <li><a href="#hero" className="hover:text-cream-50 transition-colors">{t('footer.homeLink')}</a></li>
            <li><a href="#products" className="hover:text-cream-50 transition-colors">{t('footer.productsLink')}</a></li>
            <li><a href="#story" className="hover:text-cream-50 transition-colors">{t('footer.storyLink')}</a></li>
            <li><a href="#reviews" className="hover:text-cream-50 transition-colors">{t('footer.reviewsLink')}</a></li>
            <li><a href="#contact" className="hover:text-cream-50 transition-colors">{t('footer.contactLink')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-cream-100 mb-4">
            {t('footer.originTitle')}
          </h4>
          <p className="text-sm text-cream-300/70 leading-relaxed whitespace-pre-line">
            {t('footer.originCoop')}
          </p>
          <p className="text-xs text-cream-300/50 mt-6">
            © {new Date().getFullYear()} The Fresh Harvest. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
