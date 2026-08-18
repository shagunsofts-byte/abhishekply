import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  Plus, Search, Pencil, Trash2, AlertTriangle, RefreshCw, PackagePlus, ExternalLink,
} from 'lucide-react';
import { auth } from '../../firebase_config';
import { AdminNavBar } from '../../components/admin/AdminNavBar';
import { Product } from '../../data/catalog';
import { deleteProductBySlug, seedStarterCatalog } from '../../lib/productsService';

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const [query, setQuery] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) navigate('/admin/login');
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const [{ collection, onSnapshot }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('../../firebase_config'),
        ]);
        unsub = onSnapshot(
          collection(db, 'products'),
          (snap) => {
            setProducts(snap.docs.map((d) => d.data() as Product));
            setPermissionError(false);
            setLoading(false);
          },
          (err) => {
            console.error(err);
            setPermissionError(true);
            setLoading(false);
          }
        );
      } catch (e) {
        console.error(e);
        setPermissionError(true);
        setLoading(false);
      }
    })();
    return () => unsub && unsub();
  }, [user]);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }, [products, query]);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedStarterCatalog();
    } catch (e) {
      console.error('Seeding failed', e);
      alert('Could not import the starter catalog. Check your connection and try again.');
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingSlug(slug);
    try {
      await deleteProductBySlug(slug);
    } catch (e) {
      console.error('Delete failed', e);
      alert('Could not delete this product. Please try again.');
    } finally {
      setDeletingSlug(null);
    }
  };

  if (user === undefined || loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-stone-400 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <AdminNavBar
        user={user}
        title="Products"
        right={
          <Link
            to="/admin/products/new"
            className="flex items-center gap-1.5 text-sm font-outfit font-medium px-4 py-2 rounded-full bg-stone-900 text-white hover:bg-brass-600 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        }
      />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {permissionError ? (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Access denied</h3>
            <p className="text-sm text-stone-500 font-inter max-w-md mx-auto">
              Your account ({user?.email}) isn't marked as an admin yet. Set your Firestore{' '}
              <code className="bg-stone-100 px-1.5 py-0.5 rounded">users/{'{uid}'}</code> document's{' '}
              <code className="bg-stone-100 px-1.5 py-0.5 rounded">role</code> field to{' '}
              <code className="bg-stone-100 px-1.5 py-0.5 rounded">"admin"</code> via the Firebase console.
            </p>
          </div>
        ) : (
          <>
            {products.length === 0 && (
              <div className="bg-brass-50 border border-brass-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
                <PackagePlus className="w-6 h-6 text-brass-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-outfit font-semibold text-stone-900 mb-1">No products in your live catalog yet</h4>
                  <p className="text-sm text-stone-600 font-inter mb-3">
                    The site is currently showing the bundled starter catalog. Import it into Firestore to start
                    editing it here — or skip this and add your own products from scratch.
                  </p>
                  <button
                    onClick={handleSeed}
                    disabled={seeding}
                    className="text-sm font-outfit font-medium px-4 py-2 rounded-full bg-brass-500 hover:bg-brass-400 disabled:opacity-60 text-stone-950 transition-colors"
                  >
                    {seeding ? 'Importing…' : 'Import Starter Catalog'}
                  </button>
                </div>
              </div>
            )}

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products by name, brand, category..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-sm font-inter outline-none focus:border-brass-400"
              />
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500 font-inter text-sm">
                No products match your search.
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
                {filtered.map((p) => (
                  <div key={p.slug} className="flex items-center gap-4 px-5 py-4 border-b border-stone-100 last:border-0">
                    <img
                      src={p.thumbnail || p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-outfit font-medium text-stone-900 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-stone-500 font-inter">
                        {p.brand} · {p.category} {p.availability ? `· ${p.availability}` : ''}
                      </p>
                    </div>
                    <a
                      href={`/product/${p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors shrink-0"
                      title="View on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      to={`/admin/products/${encodeURIComponent(p.slug)}/edit`}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:text-brass-600 hover:bg-brass-50 transition-colors shrink-0"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.slug, p.name)}
                      disabled={deletingSlug === p.slug}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
