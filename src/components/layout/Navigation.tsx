import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  cartCount?: number;
  onThemeToggle?: (state: 'morning' | 'golden') => void;
  currentState?: 'morning' | 'golden';
  isReducedMotion?: boolean;
  onOpenSearch?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount: propCartCount,
  onThemeToggle,
  currentState = 'morning',
  isReducedMotion = false,
  onOpenSearch,
}) => {
  const { totalCount, openCart } = useCart();
  const { t } = useLanguage();
  const cartCount = propCartCount !== undefined ? propCartCount : totalCount;
  const [isUnpinned, setIsUnpinned] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'products' | 'story' | 'reviews' | 'contact'>('hero');

  useEffect(() => {
    // 1. Listen for custom event from GSAP ScrollTrigger
    const handleUnpinChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ unpinned: boolean }>;
      setIsUnpinned(customEvent.detail.unpinned);
    };

    // 2. Passive scroll listener for responsive backdrop & active section scroll-spy
    const handleScroll = () => {
      setIsUnpinned(window.scrollY > 40);

      // If at bottom of page, activate 'contact'
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sectionIds: ('hero' | 'products' | 'story' | 'reviews' | 'contact')[] = ['hero', 'products', 'story', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const pageTop = rect.top + window.scrollY;
          if (scrollPosition >= pageTop) {
            setActiveSection(id);
            return;
          }
        }
      }

      setActiveSection('hero');
    };

    window.addEventListener('hero-unpin-change', handleUnpinChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('hero-unpin-change', handleUnpinChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (targetId: 'hero' | 'products' | 'story' | 'reviews' | 'contact' | 'top') => (e: React.MouseEvent) => {
    e.preventDefault();
    if (targetId === 'top' || targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    }
  };

  const getNavLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    return `hover:opacity-75 transition-opacity py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-forest-700 after:transition-transform ${
      isActive ? 'after:scale-x-100 font-semibold' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto ${
        isUnpinned
          ? 'bg-[#F8F8F5]/90 backdrop-blur-md border-b border-cream-300/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{
        color: isUnpinned ? '#1F1F1F' : 'var(--nav-color, #1F1F1F)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 sm:py-5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <a
            href="#hero"
            onClick={handleNavClick('hero')}
            className="flex items-baseline space-x-2 group focus:outline-none focus:ring-2 focus:ring-forest-700 rounded-sm"
          >
            <span
              className="font-serif text-sm sm:text-xl md:text-2xl font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase transition-colors duration-300"
              style={{ color: 'inherit' }}
            >
              The Fresh Harvest
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-[0.06em] uppercase"
          style={{ color: 'inherit' }}
        >
          <a
            href="#hero"
            onClick={handleNavClick('hero')}
            className={getNavLinkClass('hero')}
          >
            {t('nav.home')}
          </a>
          <a
            href="#products"
            onClick={handleNavClick('products')}
            className={getNavLinkClass('products')}
          >
            {t('nav.products')}
          </a>
          <a
            href="#story"
            onClick={handleNavClick('story')}
            className={getNavLinkClass('story')}
          >
            {t('nav.story')}
          </a>
          <a
            href="#reviews"
            onClick={handleNavClick('reviews')}
            className={getNavLinkClass('reviews')}
          >
            {t('nav.reviews')}
          </a>
          <a
            href="#contact"
            onClick={handleNavClick('contact')}
            className={getNavLinkClass('contact')}
          >
            {t('nav.contact')}
          </a>
        </nav>

        {/* Right Actions: Language Switcher, Reduced-Motion Toggle, Search, Cart */}
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0" style={{ color: 'inherit' }}>
          {/* Language Switcher (ID | EN) */}
          <LanguageSwitcher />

          {isReducedMotion && onThemeToggle && (
            <div className="flex items-center text-xs bg-cream-200/80 backdrop-blur-sm rounded-full p-1 border border-cream-300">
              <button
                type="button"
                onClick={() => onThemeToggle('morning')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  currentState === 'morning'
                    ? 'bg-charcoal-900 text-cream-100 shadow-sm'
                    : 'text-charcoal-800 hover:text-charcoal-950'
                }`}
                aria-label={t('nav.morningAria')}
              >
                Morning
              </button>
              <button
                type="button"
                onClick={() => onThemeToggle('golden')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  currentState === 'golden'
                    ? 'bg-amber-600 text-cream-50 shadow-sm'
                    : 'text-charcoal-800 hover:text-charcoal-950'
                }`}
                aria-label={t('nav.goldenAria')}
              >
                Golden
              </button>
            </div>
          )}

          {/* Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-forest-700 rounded-full"
            aria-label={t('nav.searchAria')}
          >
            <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
          </button>

          {/* Shopping Cart Button */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-1.5 sm:p-2 hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-forest-700 rounded-full"
            aria-label={t('nav.cartAria', { count: cartCount })}
          >
            <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0 bg-forest-700 text-cream-50 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
