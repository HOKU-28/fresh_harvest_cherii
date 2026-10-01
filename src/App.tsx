import { useState, useEffect } from 'react';
import { Navigation } from './components/layout/Navigation';
import { HeroSection } from './components/hero/HeroSection';
import { CoffeeRegionTicker } from './components/hero/CoffeeRegionTicker';
import { ProductGrid } from './components/shop/ProductGrid';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchOverlay } from './components/search/SearchOverlay';
import { CheckoutModal } from './components/shop/CheckoutModal';
import { OriginStory } from './components/story/OriginStory';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { useReducedMotion } from './hooks/useReducedMotion';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { Product, SAMPLE_PRODUCTS } from './data/products';

export function App() {
  const isReducedMotion = useReducedMotion();
  const [manualState, setManualState] = useState<'morning' | 'golden'>('morning');
  const [isSearchOpen, setIsSearchOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('search');
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const modalId = params.get('modal');
    return SAMPLE_PRODUCTS.find((p) => p.id === modalId) || null;
  });

  const isFocusProducts =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('focus_products');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const modalId = params.get('modal');
    if (modalId) {
      const prod = SAMPLE_PRODUCTS.find((p) => p.id === modalId);
      if (prod) setSelectedProduct(prod);
    }
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-[#1F1F1F]">
          {/* 1. Brand Header Navigation */}
          <Navigation
            isReducedMotion={isReducedMotion}
            onThemeToggle={setManualState}
            currentState={manualState}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* 2. Main Landmark */}
          <main className="flex-1">
            {!isFocusProducts && (
              <HeroSection
                isReducedMotion={isReducedMotion}
                manualState={manualState}
              />
            )}

            {/* Coffee Origin Region Ticker */}
            {!isFocusProducts && (
              <CoffeeRegionTicker isReducedMotion={isReducedMotion} />
            )}

            {/* Curated Single-Origin Beans Collection */}
            <div className={isFocusProducts ? 'pt-20 sm:pt-24' : ''}>
              <ProductGrid onSelectProduct={(prod) => setSelectedProduct(prod)} />
            </div>

            {!isFocusProducts && (
              <>
                <OriginStory />
                <ReviewsSection isReducedMotion={isReducedMotion} />
                <ContactSection />
              </>
            )}
          </main>

          {/* 3. Refined Brand Footer */}
          <Footer />

          {/* 4. Interactive Cart Drawer */}
          <CartDrawer />

          {/* 5. Editorial Search Overlay */}
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={(prod) => {
              setIsSearchOpen(false);
              setSelectedProduct(prod);
            }}
          />

          {/* 6. Product Detail Modal */}
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />

          {/* 7. Direct Purchase / Checkout Feedback Modal */}
          <CheckoutModal />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
