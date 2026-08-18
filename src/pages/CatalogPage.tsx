import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, SlidersHorizontal } from 'lucide-react';
import { BRANDS, Product } from '../data/catalog';
import categoriesData from '../data/categories.json';
import { ProductCard } from '../components/ProductCard';
import { SeoWrapper } from '../components/SeoWrapper';
import { SITE_CONFIG } from '../data/siteConfig';
import { useProducts } from '../context/ProductsContext';

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export default function CatalogPage() {
  const { products: PRODUCTS } = useProducts();
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brandParam = searchParams.get('brand') || '';
  const typeParam = searchParams.get('type') || '';
  const qParam = searchParams.get('q') || '';

  const activeCategoryMeta = categoriesData.find((c) => c.slug === category);

  const filtered: Product[] = useMemo(() => {
    let list = [...PRODUCTS];

    if (category) {
      list = list.filter((p) => p.categorySlug === category);
    }
    if (brandParam) {
      list = list.filter((p) => normalize(p.brand).includes(normalize(brandParam)) || p.brandSlug === brandParam);
    }
    if (typeParam) {
      list = list.filter((p) => p.type === typeParam || p.tags?.includes(typeParam));
    }
    if (qParam) {
      const q = qParam.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
  }, [PRODUCTS, category, brandParam, typeParam, qParam]);

  // Graceful fallback: if a hyper-specific filter combo returns nothing,
  // still show something relevant instead of a dead end.
  const showFallback = filtered.length === 0;
  const fallbackList = useMemo(() => {
    if (!showFallback) return [];
    let list = category ? PRODUCTS.filter((p) => p.categorySlug === category) : PRODUCTS.filter((p) => p.isFeatured);
    if (list.length === 0) list = PRODUCTS.filter((p) => p.isFeatured);
    return list.slice(0, 8);
  }, [PRODUCTS, showFallback, category]);

  const heading = activeCategoryMeta?.name || (qParam ? `Results for "${qParam}"` : brandParam ? brandParam : 'All Products');
  const description = activeCategoryMeta?.description || 'Browse our full range of premium plywood, laminates, veneers, doors, hardware and interior solutions.';
  const heroImage = activeCategoryMeta?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop';

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => setSearchParams({}, { replace: true });

  const hasActiveFilters = !!(brandParam || typeParam || qParam);

  return (
    <>
      <SeoWrapper
        title={`${heading} | Abhishek Ply & Hardware`}
        description={description}
      />
      <main className="relative w-full min-h-screen bg-stone-50 text-stone-950 pt-24">
        {/* Category hero banner */}
        <section className="relative w-full h-[42vh] min-h-[280px] max-h-[420px] overflow-hidden">
          <img src={heroImage} alt={heading} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-stone-950/20" />
          <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-8 lg:px-12 pb-10 max-w-7xl mx-auto w-full">
            <nav className="text-xs font-outfit text-stone-300 mb-3 flex items-center gap-2">
              <Link to="/" className="hover:text-brass-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-brass-400 transition-colors">Products</Link>
              {activeCategoryMeta && (
                <>
                  <span>/</span>
                  <span className="text-white">{activeCategoryMeta.name}</span>
                </>
              )}
            </nav>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 flex items-center gap-3"
            >
              {activeCategoryMeta?.icon && <span>{activeCategoryMeta.icon}</span>}
              {heading}
            </motion.h1>
            <p className="text-stone-200 font-inter max-w-2xl text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
          {/* Category quick-switch chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              to="/products"
              className={`px-4 py-2 rounded-full text-sm font-outfit font-medium border transition-colors ${
                !category ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-brass-400 hover:text-brass-600'
              }`}
            >
              All
            </Link>
            {categoriesData.map((c) => (
              <Link
                key={c.slug}
                to={`/products/${c.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-outfit font-medium border transition-colors flex items-center gap-1.5 ${
                  category === c.slug ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-brass-400 hover:text-brass-600'
                }`}
              >
                <span>{c.icon}</span> {c.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar filters (desktop) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 space-y-8">
                <div>
                  <h4 className="font-outfit font-semibold uppercase tracking-widest text-xs text-stone-400 mb-4">Brand</h4>
                  <div className="flex flex-col gap-2">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => updateParam('brand', brandParam === b ? null : b)}
                        className={`text-left text-sm font-inter px-3 py-2 rounded-xl transition-colors ${
                          normalize(brandParam) === normalize(b) ? 'bg-brass-50 text-brass-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearAll} className="text-sm font-outfit text-stone-500 hover:text-brass-600 flex items-center gap-1.5 transition-colors">
                    <X className="w-3.5 h-3.5" /> Clear all filters
                  </button>
                )}
              </div>
            </aside>

            {/* Mobile filter toggle */}
            <div className="lg:hidden flex items-center justify-between mb-2">
              <span className="text-sm font-outfit text-stone-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 text-sm font-outfit font-medium px-4 py-2 rounded-full border border-stone-200 bg-white"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by brand
              </button>
            </div>

            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[130] bg-stone-950/50 backdrop-blur-sm lg:hidden"
                  onClick={() => setFiltersOpen(false)}
                >
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'tween', ease: 'circOut', duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif text-xl font-bold">Filter by Brand</h3>
                      <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5 text-stone-500" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {BRANDS.map((b) => (
                        <button
                          key={b}
                          onClick={() => { updateParam('brand', brandParam === b ? null : b); setFiltersOpen(false); }}
                          className={`text-left text-sm font-inter px-3 py-2.5 rounded-xl border transition-colors ${
                            normalize(brandParam) === normalize(b) ? 'bg-brass-50 border-brass-300 text-brass-700 font-medium' : 'border-stone-200 text-stone-600'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product grid */}
            <div className="flex-1">
              {hasActiveFilters && (
                <div className="hidden lg:flex items-center gap-2 mb-6 text-sm font-outfit text-stone-500">
                  {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                  {brandParam && (
                    <span className="bg-stone-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                      {brandParam} <X className="w-3 h-3 cursor-pointer" onClick={() => updateParam('brand', null)} />
                    </span>
                  )}
                </div>
              )}

              {!showFallback ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              ) : (
                <div>
                  <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 text-center mb-12">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                      We don't have an exact match online yet
                    </h3>
                    <p className="text-stone-500 font-inter max-w-xl mx-auto mb-6 leading-relaxed">
                      Our full range is larger than what's listed here — message us on WhatsApp with what you're
                      looking for and we'll get you pricing, samples and availability directly.
                    </p>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                        `Hi, I am looking for ${heading}${typeParam ? ` (${typeParam})` : ''}. Can you help?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-outfit font-medium transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                    </a>
                  </div>

                  {fallbackList.length > 0 && (
                    <>
                      <h4 className="font-serif text-xl font-bold text-stone-900 mb-6">You might also like</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {fallbackList.map((p, i) => (
                          <ProductCard key={p.id} product={p} index={i} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
