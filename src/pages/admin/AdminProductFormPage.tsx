import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Save, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { auth } from '../../firebase_config';
import { AdminNavBar } from '../../components/admin/AdminNavBar';
import { ImageUrlListInput } from '../../components/admin/ImageUrlListInput';
import { KeyValueListInput } from '../../components/admin/KeyValueListInput';
import { Product, BRANDS } from '../../data/catalog';
import categoriesData from '../../data/categories.json';
import { saveProduct, slugify, fetchAllProducts } from '../../lib/productsService';

const EMPTY_PRODUCT: Product = {
  id: '',
  slug: '',
  name: '',
  category: '',
  categorySlug: 'plywood',
  brand: '',
  description: '',
  images: [''],
  thumbnail: '',
  priceLabel: 'Enquire for Price',
  availability: 'In Stock',
  sizes: [],
  colors: [],
  usage: [],
  features: [],
  tags: [],
  specifications: {},
};

// Small helpers to move between comma-separated text (easy to type) and string[] (what Product needs)
const toCsv = (arr?: string[]) => (arr || []).join(', ');
const fromCsv = (csv: string) =>
  csv.split(',').map((s) => s.trim()).filter(Boolean);

export default function AdminProductFormPage() {
  const navigate = useNavigate();
  const { slug: editSlug } = useParams<{ slug?: string }>();
  const isEditMode = !!editSlug;

  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [form, setForm] = useState<Product>(EMPTY_PRODUCT);
  const [slugTouched, setSlugTouched] = useState(isEditMode);
  const [loading, setLoading] = useState(isEditMode);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) navigate('/admin/login');
    });
    return () => unsub();
  }, [navigate]);

  // Load existing product when editing
  useEffect(() => {
    if (!isEditMode || !user) return;
    (async () => {
      try {
        const all = await fetchAllProducts();
        const existing = all.find((p) => p.slug === editSlug);
        if (existing) {
          setForm(existing);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        console.error(e);
        setError('Could not load this product. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [isEditMode, editSlug, user]);

  const update = <K extends keyof Product>(key: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNameChange = (name: string) => {
    update('name', name);
    if (!slugTouched) {
      update('slug', slugify(name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.slug.trim() || !form.brand.trim() || !form.description.trim()) {
      setError('Name, slug, brand and description are required.');
      return;
    }

    const images = form.images.filter((i) => i.trim());
    const categoryMeta = categoriesData.find((c) => c.slug === form.categorySlug);
    const productToSave: Product = {
      ...form,
      id: form.id || form.slug,
      images,
      thumbnail: images[0] || form.thumbnail || '',
      image: images[0] || form.image,
      category: form.category || categoryMeta?.name || form.categorySlug,
    };

    setSaving(true);
    try {
      await saveProduct(productToSave, isEditMode ? editSlug : undefined);
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      setError('Could not save this product. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  if (user === undefined || loading) {
    return (
      <main className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin" />
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <AdminNavBar user={user} title="Edit Product" />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">Product not found</h3>
          <Link to="/admin/products" className="text-amber-600 hover:text-amber-700 text-sm font-outfit font-medium">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-20">
      <AdminNavBar user={user} title={isEditMode ? 'Edit Product' : 'Add Product'} />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-outfit text-zinc-500 hover:text-zinc-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-5">Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Product Name *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="CenturyPly Club Prime BWP Plywood"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">
                  URL Slug * <span className="text-zinc-400">(used in the product's web address)</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.slug}
                  onChange={(e) => { setSlugTouched(true); update('slug', slugify(e.target.value)); }}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 font-mono"
                  placeholder="centuryply-club-prime-bwp-plywood"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Brand *</label>
                <input
                  required
                  type="text"
                  list="brand-options"
                  value={form.brand}
                  onChange={(e) => update('brand', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="CenturyPly"
                />
                <datalist id="brand-options">
                  {BRANDS.map((b) => <option key={b} value={b} />)}
                </datalist>
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Category *</label>
                <select
                  required
                  value={form.categorySlug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const meta = categoriesData.find((c) => c.slug === slug);
                    update('categorySlug', slug);
                    if (meta) update('category', meta.name);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 bg-white"
                >
                  {categoriesData.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Subcategory</label>
                <input
                  type="text"
                  value={form.subcategory || ''}
                  onChange={(e) => update('subcategory', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="BWP Grade Plywood"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">
                  Type <span className="text-zinc-400">(matches the menu filter, e.g. "bwp")</span>
                </label>
                <input
                  type="text"
                  value={form.type || ''}
                  onChange={(e) => update('type', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="bwp"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-5">Description</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Short Description</label>
                <input
                  type="text"
                  value={form.shortDescription || ''}
                  onChange={(e) => update('shortDescription', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="One line shown on product cards"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Full Description *</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 resize-none"
                  placeholder="Shown on the product detail page"
                />
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-5">Images (Cloudinary URLs)</h3>
            <ImageUrlListInput images={form.images.length ? form.images : ['']} onChange={(images) => update('images', images)} />
          </section>

          {/* Pricing & Availability */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-5">Pricing & Availability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Price Label</label>
                <input
                  type="text"
                  value={form.priceLabel || ''}
                  onChange={(e) => update('priceLabel', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="Enquire for Price"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Availability</label>
                <select
                  value={form.availability || 'In Stock'}
                  onChange={(e) => update('availability', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 bg-white"
                >
                  <option>In Stock</option>
                  <option>Made to Order</option>
                  <option>Available</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              {([
                ['isFeatured', 'Featured'],
                ['isNew', 'New'],
                ['isPopular', 'Popular'],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm font-inter text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!form[key]}
                    onChange={(e) => update(key, e.target.checked as any)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>

          {/* Specs */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-5">Attributes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Sizes <span className="text-zinc-400">(comma separated)</span></label>
                <input
                  type="text"
                  value={toCsv(form.sizes)}
                  onChange={(e) => update('sizes', fromCsv(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="6mm, 9mm, 12mm, 18mm"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Colours <span className="text-zinc-400">(comma separated)</span></label>
                <input
                  type="text"
                  value={toCsv(form.colors)}
                  onChange={(e) => update('colors', fromCsv(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="White, Ivory, Walnut"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Finish</label>
                <input
                  type="text"
                  value={form.finish || ''}
                  onChange={(e) => update('finish', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Material</label>
                <input
                  type="text"
                  value={form.material || ''}
                  onChange={(e) => update('material', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">Key Features <span className="text-zinc-400">(comma separated)</span></label>
                <input
                  type="text"
                  value={toCsv(form.features)}
                  onChange={(e) => update('features', fromCsv(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
                  placeholder="Boiling water resistant, Borer & termite proof"
                />
              </div>
            </div>
            <label className="text-xs font-outfit text-zinc-500 mb-2 block">Specifications</label>
            <KeyValueListInput value={form.specifications || {}} onChange={(v) => update('specifications', v)} />
          </section>

          {/* WhatsApp */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-5">Enquiry Message</h3>
            <label className="text-xs font-outfit text-zinc-500 mb-1.5 block">
              Pre-filled WhatsApp message when a customer enquires about this product
            </label>
            <textarea
              value={form.whatsappMessage || ''}
              onChange={(e) => update('whatsappMessage', e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400 resize-none"
              placeholder={`Hi, I am interested in ${form.name || 'this product'}. Please share more details.`}
            />
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-inter px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-amber-600 disabled:opacity-60 text-white px-6 py-3 rounded-full font-outfit font-medium transition-colors"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving…' : isEditMode ? 'Save Changes' : 'Create Product'}
            </button>
            <Link
              to="/admin/products"
              className="px-6 py-3 rounded-full font-outfit font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
