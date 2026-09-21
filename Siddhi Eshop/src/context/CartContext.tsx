import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  addCustomItem: (item: Omit<CartItem, 'qty'>, quantity?: number) => void;
  updateQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('siddhi_eshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('siddhi_eshop_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const product = PRODUCTS_DATA.find((p: Product) => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, qty: item.qty + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            partNo: product.partNo,
            brand: product.brand,
            price: product.price,
            unit: product.unit,
            qty: quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} to cart!`);
    setIsCartOpen(true);
  }, [showToast]);

  const addCustomItem = useCallback((item: Omit<CartItem, 'qty'>, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id || i.partNo === item.partNo);
      if (existing) {
        return prev.map(i =>
          (i.id === item.id || i.partNo === item.partNo)
            ? { ...i, qty: i.qty + quantity }
            : i
        );
      } else {
        return [...prev, { ...item, qty: quantity }];
      }
    });

    showToast(`Added ${item.name} to quotation cart!`);
    setIsCartOpen(true);
  }, [showToast]);

  const updateQty = useCallback((productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const openCartDrawer = useCallback(() => setIsCartOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartOpen(false), []);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addCustomItem,
        updateQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCartDrawer,
        closeCartDrawer,
        totalItems,
        subtotal
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