import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, SAMPLE_PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutSummary {
  items: CartItem[];
  totalPrice: string;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  formattedSubtotal: string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  buyNow: (product: Product, quantity?: number) => void;
  checkoutCart: () => void;
  checkoutSummary: CheckoutSummary | null;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to parse price string like "$28.00" -> 28
const parsePrice = (priceStr: string): number => {
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the 2 curated bags to match the editorial header badge (2)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (SAMPLE_PRODUCTS.length >= 2) {
      return [
        { product: SAMPLE_PRODUCTS[0], quantity: 1 },
        { product: SAMPLE_PRODUCTS[1], quantity: 1 },
      ];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('cart');
  });
  const [checkoutSummary, setCheckoutSummary] = useState<CheckoutSummary | null>(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + parsePrice(item.product.price) * item.quantity;
    }, 0);
  }, [items]);

  const formattedSubtotal = useMemo(() => {
    return `$${subtotal.toFixed(2)}`;
  }, [subtotal]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const buyNow = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    const itemTotal = parsePrice(product.price) * quantity;
    setCheckoutSummary({
      items: [{ product, quantity }],
      totalPrice: `$${itemTotal.toFixed(2)}`,
    });
  };

  const checkoutCart = () => {
    if (items.length === 0) return;
    setIsCartOpen(false);
    setCheckoutSummary({
      items: [...items],
      totalPrice: formattedSubtotal,
    });
  };

  const closeCheckout = () => {
    setCheckoutSummary(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        formattedSubtotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        buyNow,
        checkoutCart,
        checkoutSummary,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
