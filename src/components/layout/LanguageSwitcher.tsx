import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label={locale === 'id' ? 'Pilih bahasa antarmuka' : 'Select interface language'}
      className="inline-flex items-center rounded-full p-0.5 bg-[#FAF9F5] border border-[#E8E0D6] shadow-2xs text-[10px] sm:text-[11px] font-semibold tracking-wider select-none shrink-0"
    >
      <button
        type="button"
        onClick={() => setLocale('id')}
        className={`px-2 py-0.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-forest-700 ${
          locale === 'id'
            ? 'bg-[#1F1F1F] text-[#F8F8F5] shadow-xs'
            : 'text-charcoal-800/60 hover:text-charcoal-900'
        }`}
        aria-pressed={locale === 'id'}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <span className="text-[#E8E0D6] text-[10px] mx-0.5 font-light" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-2 py-0.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-forest-700 ${
          locale === 'en'
            ? 'bg-[#1F1F1F] text-[#F8F8F5] shadow-xs'
            : 'text-charcoal-800/60 hover:text-charcoal-900'
        }`}
        aria-pressed={locale === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
