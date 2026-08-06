import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase_config';
import { PRODUCTS } from '../data/catalog'; // We'll keep this as a fallback if DB is empty

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  subcategory?: string;
  brand: string;
  description: string;
  shortDescription?: string;
  price?: number | string | null;
  priceLabel?: string;
  images: string[];
  thumbnail: string;
  sizes?: string[];
  colors?: string[];
  finish?: string;
  material?: string;
  usage?: string[];
  specifications?: Record<string, string>;
  features?: string[];
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  availability?: string;
  whatsappMessage?: string;
  sortOrder?: number;
  
  // backwards compatibility while transitioning
  image?: string; 
  inStock?: boolean;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        if (!snapshot.empty) {
          const dbProducts = snapshot.docs.map(doc => {
            const data = doc.data() as Product;
            // Use slug as id so URL-based lookup works (/product/:id uses slug)
            // If product has a slug, use that as id; otherwise use Firestore doc id
            return {
              ...data,
              id: data.slug || data.id || doc.id,
            } as Product;
          });
          setProducts(dbProducts);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // On error, keep static products so page still works
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { products, loading };
}

export async function createOrder(customerDetails: any, items: any[]) {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      customerDetails,
      items,
      status: 'pending',
      createdAt: serverTimestamp(),
      userId: 'guest' // For now, can be updated with auth
    });
    return orderRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
