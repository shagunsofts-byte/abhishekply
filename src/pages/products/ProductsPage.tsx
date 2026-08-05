import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, Star, Search, ChevronRight, SlidersHorizontal, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../../hooks/useFirebase';
import { useStore } from '../../store/useStore';

const colorMap: Record<string, string> = {
  'Blue': '#3b82f6', 'Peach': '#ffdab9', 'Black': '#000000', 'Pink': '#ec4899',
  'Maroon': '#800000', 'Green': '#22c55e', 'Lime Green': '#84cc16', 'White': '#ffffff',
  'Brown': '#8b4513', 'Grey': '#6b7280', 'Natural Wood': '#d4a373', 'Arctic White': '#f8f9fa',
  'Charcoal Black': '#212529', 'Walnut': '#5c4033', 'Oak': '#8b5a2b',
  'Antique Brass': '#c5832b', 'Satin Nickel': '#c0c0c0', 'Nickel Plated': '#a8a8a8',
  'Pine Wood Frame': '#d2b48c'
};

const getMockData = (id: string) => {
  const hash = id.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const rating = (3.5 + (Math.abs(hash) % 15) / 10).toFixed(1);
  const reviews = Math.abs(hash) % 400 + 20;
  const isFewLeft = Math.abs(hash) % 6 === 0;
  const discount = 10 + (Math.abs(hash) % 60);
  return { rating, reviews, isFewLeft, discount };
};

const parsePrice = (priceVal: any) => {
  if (typeof priceVal === 'number') return priceVal;
  const num = parseInt(priceVal?.toString().replace(/\D/g, '') || '');
  return isNaN(num) ? 999 : num;
};

// ─── Premium Product Card ───────────────────────────────────────────────────
const ProductCard = ({ product, onAddToQuote }: { product: any; onAddToQuote: () => void }) => {
  const { rating, reviews, isFewLeft, discount } = getMockData(product.id);
  const displayPrice = parsePrice(product.price);
  const mrp = Math.round(displayPrice * (1 + (discount / 100)));
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          <img
            src={product.thumbnail || product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Discount badge */}
          {discount >= 20 && (
            <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase shadow">
              {discount}% OFF
            </div>
          )}

          {/* Few left badge */}
          {isFewLeft && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase shadow">
              Few Left
            </div>
          )}

          {/* Hover CTA */}
          <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToQuote();
              }}
              className="w-full text-center text-white font-semibold text-xs py-2 px-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors tracking-wide uppercase"
            >
              + Add to Quote
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          {/* Brand */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-0.5 truncate">{product.brand}</p>
          {/* Name */}
          <h3 className="text-sm font-semibold text-gray-800 truncate mb-2 leading-snug">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5 bg-green-50 border border-green-100 rounded px-1.5 py-0.5">
              <span className="text-[11px] font-bold text-green-700">{rating}</span>
              <Star className="w-2.5 h-2.5 text-green-600 fill-green-600" />
            </div>
            <span className="text-[10px] text-gray-400">({reviews})</span>
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-900">₹{displayPrice.toLocaleString()}</span>
            <span className="text-[11px] text-gray-400 line-through">₹{mrp.toLocaleString()}</span>
            <span className="text-[11px] text-amber-600 font-semibold">({discount}% off)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Filter Checkbox ──────────────────────────────────────────────────────
const FilterCheckbox = ({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group py-1">
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        checked ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
      }`}
    >
      {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
    </div>
    <span className="text-sm text-gray-700 truncate flex-1 group-hover:text-gray-900">{label}</span>
    {count !== undefined && <span className="text-[11px] text-gray-400 flex-shrink-0">({count})</span>}
  </label>
);

// ─── Filter Section ───────────────────────────────────────────────────────
const FilterSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between mb-3"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-gray-800">{title}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────
export const ProductsPage = () => {
  const { category, subcategory } = useParams();
  const { products: allProducts, loading } = useProducts();
  const { addItem, setQuoteDrawerOpen } = useStore();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('Recommended');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const availableBrands = useMemo(() => {
    const brands = allProducts.map(p => p.brand).filter(Boolean);
    const counts = brands.reduce((acc, b) => { acc[b] = (acc[b] || 0) + 1; return acc; }, {} as Record<string, number>);
    return Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]);
  }, [allProducts]);

  const availableColors = useMemo(() => {
    const colors = allProducts.flatMap(p => p.colors || []);
    const counts = colors.reduce((acc, c) => { acc[c] = (acc[c] || 0) + 1; return acc; }, {} as Record<string, number>);
    return Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (subcategory) filtered = filtered.filter(p => p.subcategory?.toLowerCase() === subcategory?.toLowerCase());
    if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    if (selectedColors.length > 0) filtered = filtered.filter(p => p.colors && p.colors.some((c: string) => selectedColors.includes(c)));
    if (selectedDiscount !== null) filtered = filtered.filter(p => getMockData(p.id).discount >= selectedDiscount);
    if (sortOption === 'Price: Low to High') filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortOption === 'Price: High to Low') filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return filtered;
  }, [allProducts, category, subcategory, selectedBrands, selectedColors, selectedDiscount, sortOption]);

  const toggleBrand = (brand: string) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  const toggleColor = (color: string) => setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  const clearAll = () => { setSelectedBrands([]); setSelectedColors([]); setSelectedDiscount(null); };

  const hasActiveFilters = selectedBrands.length > 0 || selectedColors.length > 0 || selectedDiscount !== null;
  const pageTitle = category ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'All Products';

  const SidebarContent = () => (
    <div className="space-y-0">
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-800">Active Filters</span>
            <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 font-medium">Clear all</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedBrands.map(b => (
              <span key={b} onClick={() => toggleBrand(b)} className="inline-flex items-center gap-1 text-[11px] bg-gray-900 text-white px-2 py-0.5 rounded-full cursor-pointer">
                {b} <X className="w-2.5 h-2.5" />
              </span>
            ))}
            {selectedColors.map(c => (
              <span key={c} onClick={() => toggleColor(c)} className="inline-flex items-center gap-1 text-[11px] bg-gray-900 text-white px-2 py-0.5 rounded-full cursor-pointer">
                {c} <X className="w-2.5 h-2.5" />
              </span>
            ))}
          </div>
        </div>
      )}

      <FilterSection title="Brand">
        <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
          {availableBrands.map(([brand, count]) => (
            <FilterCheckbox key={brand} label={brand} count={count as number} checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color" defaultOpen={false}>
        <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
          {availableColors.map(([color, count]) => (
            <label key={color} className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => toggleColor(color)}>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedColors.includes(color) ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-500'}`}>
                {selectedColors.includes(color) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
              </div>
              <div className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{ backgroundColor: colorMap[color] || '#ccc' }} />
              <span className="text-sm text-gray-700 truncate flex-1">{color}</span>
              <span className="text-[11px] text-gray-400">({count as number})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Discount" defaultOpen={false}>
        <div className="space-y-0.5">
          {[10, 20, 30, 40, 50].map(d => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => setSelectedDiscount(selectedDiscount === d ? null : d)}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedDiscount === d ? 'border-gray-900' : 'border-gray-300 group-hover:border-gray-500'}`}>
                {selectedDiscount === d && <div className="w-2 h-2 bg-gray-900 rounded-full" />}
              </div>
              <span className="text-sm text-gray-700">{d}% and above</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <Helmet>
        <title>{pageTitle} | Abhishek Ply & Hardware</title>
      </Helmet>

      {/* Header band */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-gray-600 transition-colors">Products</Link>
            {category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-700 font-medium capitalize">{pageTitle}</span>
              </>
            )}
          </div>

          {/* Title + sort row */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-xs text-gray-400 mt-0.5">{filteredProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-gray-400 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {hasActiveFilters && <span className="bg-gray-900 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{selectedBrands.length + selectedColors.length + (selectedDiscount ? 1 : 0)}</span>}
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-gray-400 transition-colors min-w-[160px] justify-between"
                >
                  <span className="font-medium truncate">{sortOption}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1"
                    >
                      {['Recommended', "What's New", 'Popularity', 'Better Discount', 'Price: High to Low', 'Price: Low to High'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setSortOption(opt); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortOption === opt ? 'bg-gray-50 font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                          {opt}
                          {sortOption === opt && <Check className="w-3 h-3 inline ml-2 text-gray-900" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex gap-8 pt-6">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-28">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Refine Results</h2>
            <SidebarContent />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-400 text-sm mb-6">Try adjusting your filters to find what you're looking for.</p>
              <button onClick={clearAll} className="text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors px-6 py-2.5 rounded-xl">
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <ProductCard
                    product={product}
                    onAddToQuote={() => {
                      addItem({
                        productId: product.id,
                        productSlug: product.slug,
                        productName: product.name,
                        brand: product.brand,
                        category: product.category,
                        image: product.thumbnail || product.images?.[0] || product.image || '',
                        quantity: 1,
                      });
                      setQuoteDrawerOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-bold text-gray-900">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <SidebarContent />
              </div>
              <div className="p-4 border-t border-gray-100">
                <button onClick={() => setMobileFilterOpen(false)} className="w-full bg-gray-900 text-white font-semibold text-sm py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  Show {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside to close sort dropdown */}
      {sortOpen && <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />}
    </div>
  );
};
