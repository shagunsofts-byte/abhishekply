import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteItem {
  productId: string;
  productSlug: string;
  productName: string;
  brand: string;
  category: string;
  image: string;
  selectedVariant?: string;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

interface QuoteStore {
  items: QuoteItem[];
  addItem: (item: QuoteItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearQuote: () => void;
  
  isQuoteDrawerOpen: boolean;
  setQuoteDrawerOpen: (isOpen: boolean) => void;
}

export const useStore = create<QuoteStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        // Simple logic for matching products (could be improved with variant matching)
        const existing = state.items.find(i => i.productId === newItem.productId);
        if (existing) {
          return {
            items: state.items.map(i => i.productId === newItem.productId ? { ...i, quantity: i.quantity + newItem.quantity } : i),
            isQuoteDrawerOpen: true
          };
        }
        return { items: [...state.items, newItem], isQuoteDrawerOpen: true };
      }),
      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity <= 0
          ? state.items.filter(i => i.productId !== productId)
          : state.items.map(i => i.productId === productId ? { ...i, quantity } : i)
      })),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      clearQuote: () => set({ items: [] }),
      
      isQuoteDrawerOpen: false,
      setQuoteDrawerOpen: (isOpen) => set({ isQuoteDrawerOpen: isOpen }),
    }),
    {
      name: 'abhishek-quote-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);
