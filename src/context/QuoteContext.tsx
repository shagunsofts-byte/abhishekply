import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product } from '../data/catalog';

export interface QuoteItem {
  product: Product;
  qty: number;
}

interface QuoteContextValue {
  items: QuoteItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToQuote: (product: Product, qty?: number) => void;
  removeFromQuote: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearQuote: () => void;
  totalItems: number;
  isInQuote: (productId: string) => boolean;
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

const STORAGE_KEY = 'abhishek_quote_cart_v1';

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // storage full or unavailable — non-fatal
    }
  }, [items, hydrated]);

  const addToQuote = useCallback((product: Product, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { product, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const removeFromQuote = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, qty } : i)));
  }, []);

  const clearQuote = useCallback(() => setItems([]), []);

  const isInQuote = useCallback((productId: string) => items.some((i) => i.product.id === productId), [items]);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        addToQuote,
        removeFromQuote,
        updateQty,
        clearQuote,
        totalItems,
        isInQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within a QuoteProvider');
  return ctx;
};
