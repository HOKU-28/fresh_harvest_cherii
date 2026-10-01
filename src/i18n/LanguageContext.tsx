import React, { createContext, useContext, useState, useEffect } from 'react';
import { id } from './locales/id';
import { en } from './locales/en';

export type Locale = 'id' | 'en';

type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

const dictionaries: Record<Locale, NestedTranslation> = {
  id,
  en,
};

export const USD_TO_IDR_RATE = 16000;

export function formatCurrency(priceInput: string | number | undefined | null, locale: Locale): string {
  if (priceInput === undefined || priceInput === null || priceInput === '') return '';
  let numericValue = 0;
  if (typeof priceInput === 'number') {
    numericValue = priceInput;
  } else {
    const str = String(priceInput).trim();
    if (str.startsWith('Rp')) {
      const cleanIdr = str.replace(/[^0-9]/g, '');
      const parsedIdr = parseInt(cleanIdr, 10) || 0;
      numericValue = parsedIdr / USD_TO_IDR_RATE;
    } else {
      numericValue = parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
    }
  }

  if (locale === 'id') {
    const idrAmount = Math.round(numericValue * USD_TO_IDR_RATE);
    const formattedIdr = idrAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp${formattedIdr}`;
  }

  return `$${numericValue.toFixed(2)}`;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  formatPrice: (priceInput?: string | number | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'id';
    try {
      const saved = localStorage.getItem('cheri_locale');
      if (saved === 'id' || saved === 'en') return saved;
    } catch {
      // Fallback
    }
    return 'id';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('cheri_locale', newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = (path: string, params?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let current: any = dictionaries[locale];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary if key is missing in ID
        let fallback: any = dictionaries.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== 'string') {
      return path;
    }

    let result = current;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }

    return result;
  };

  const formatPrice = (priceInput?: string | number | null): string => {
    return formatCurrency(priceInput, locale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
