import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, PRODUCTS as SEED_PRODUCTS } from '../data/catalog';
import { fetchAllProducts } from '../lib/productsService';

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  /** true once real Firestore data has successfully loaded and replaced the starter catalog */
  isLive: boolean;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Render instantly with the bundled starter catalog so there's never a loading
  // spinner on first paint — then quietly swap in live Firestore data if available.
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    try {
      const live = await fetchAllProducts();
      if (live.length > 0) {
        setProducts(live);
        setIsLive(true);
      }
    } catch (e) {
      // Offline, network blocked, or Firestore not reachable — keep showing the
      // bundled starter catalog rather than breaking the storefront.
      console.warn('Live product catalog unavailable, showing starter catalog:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <ProductsContext.Provider value={{ products, loading, isLive, refetch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider');
  return ctx;
};
