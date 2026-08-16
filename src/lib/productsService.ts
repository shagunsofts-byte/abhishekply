import { Product, PRODUCTS as SEED_PRODUCTS } from '../data/catalog';

async function getFirestoreRefs() {
  const [firestore, config] = await Promise.all([
    import('firebase/firestore'),
    import('../firebase_config'),
  ]);
  return { ...firestore, db: config.db };
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { collection, getDocs, db } = await getFirestoreRefs();
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map((d) => d.data() as Product);
}

/**
 * Creates or fully overwrites a product. The Firestore document ID is always
 * the product's slug — that keeps URLs, edits, and deletes all keyed off one
 * human-readable identifier instead of a separate opaque ID.
 */
export async function saveProduct(product: Product, previousSlug?: string): Promise<void> {
  const { doc, setDoc, deleteDoc, db } = await getFirestoreRefs();
  // If the slug changed during an edit, move the document: write the new one,
  // then remove the old one so we don't leave an orphaned duplicate behind.
  if (previousSlug && previousSlug !== product.slug) {
    await deleteDoc(doc(db, 'products', previousSlug));
  }
  await setDoc(doc(db, 'products', product.slug), product);
}

export async function deleteProductBySlug(slug: string): Promise<void> {
  const { doc, deleteDoc, db } = await getFirestoreRefs();
  await deleteDoc(doc(db, 'products', slug));
}

/**
 * One-time helper for the admin: pushes the bundled starter catalog (the
 * products that ship with the site template) into Firestore, so the admin
 * has something to edit instead of starting from a blank product list.
 * Safe to call more than once — it just overwrites by slug.
 */
export async function seedStarterCatalog(): Promise<number> {
  const { doc, writeBatch, db } = await getFirestoreRefs();
  const batch = writeBatch(db);
  SEED_PRODUCTS.forEach((p) => {
    batch.set(doc(db, 'products', p.slug), p);
  });
  await batch.commit();
  return SEED_PRODUCTS.length;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
