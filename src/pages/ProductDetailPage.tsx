import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, ChevronRight, Check, ShieldCheck, ShoppingBag } from 'lucide-react';
import categoriesData from '../data/categories.json';
import { ProductCard } from '../components/ProductCard';
import { SeoWrapper } from '../components/SeoWrapper';
import { SITE_CONFIG } from '../data/siteConfig';
import { useQuote } from '../context/QuoteContext';
import { useProducts } from '../context/ProductsContext';
import { ImageLightbox } from '../components/ImageLightbox';

export default function ProductDetailPage() {
  const { products: PRODUCTS, loading: productsLoading } = useProducts();
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addToQuote, isInQuote } = useQuote();

  if (!product) {
    // Don't redirect until live data has had a chance to load — a product added
    // via the admin panel won't be in the bundled starter catalog we render first.
    if (productsLoading) {
      return (
        <main className="min-h-screen bg-stone-50 flex items-center justify-center pt-24">
          <div className="w-6 h-6 border-2 border-brass-500 border-t-transparent rounded-full animate-spin" />
        </main>
      );
    }
    return <Navigate to="/products" replace />;
  }

  const categoryMeta = categoriesData.find((c) => c.slug === product.categorySlug);
  const images = product.images?.length ? product.images : [product.thumbnail];

  const related = PRODUCTS
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    product.whatsappMessage || `Hi, I am interested in ${product.name}. Please share more details.`
  )}`;

  return (
    <>
      <SeoWrapper
        title={`${product.name} | Abhishek Ply & Hardware`}
        description={product.shortDescription || product.description}
        ogImage={images[0]}
      />
      <main className="relative w-full min-h-screen bg-stone-50 text-stone-950 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="text-xs font-outfit text-stone-500 mb-8 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-brass-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-brass-600 transition-colors">Products</Link>
            {categoryMeta && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link to={`/products/${categoryMeta.slug}`} className="hover:text-brass-600 transition-colors">{categoryMeta.name}</Link>
              </>
            )}
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-900 font-medium">{product.shortName || product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Gallery */}
            <div className="max-w-[460px] mx-auto lg:mx-0 w-full">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxOpen(true)}
                className="group relative aspect-square rounded-3xl overflow-hidden bg-stone-100 mb-4 p-6 md:p-8 cursor-zoom-in border border-stone-100"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-brass-500 text-stone-950 text-xs font-outfit font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    New
                  </span>
                )}
                <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-stone-700 text-[11px] font-outfit font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to zoom
                </span>
              </motion.div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors shrink-0 bg-stone-50 ${
                        activeImage === idx ? 'border-brass-500' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {lightboxOpen && (
              <ImageLightbox
                images={images}
                activeIndex={activeImage}
                alt={product.name}
                onClose={() => setLightboxOpen(false)}
                onNavigate={setActiveImage}
              />
            )}

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-xs font-outfit font-bold uppercase tracking-widest text-brass-600 mb-3">
                {product.brand} {product.subcategory ? `· ${product.subcategory}` : ''}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-stone-600 font-inter leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg font-outfit font-semibold text-stone-900">
                  {product.priceLabel || 'Enquire for Price'}
                </span>
                <span className={`text-xs font-outfit font-medium px-3 py-1 rounded-full ${
                  product.availability === 'In Stock' ? 'bg-green-50 text-green-700' : 'bg-brass-50 text-brass-700'
                }`}>
                  {product.availability || 'Available on Order'}
                </span>
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-outfit font-semibold uppercase tracking-widest text-stone-400 mb-3">
                    Available Sizes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span key={s} className="px-4 py-2 rounded-full border border-stone-200 text-sm font-inter text-stone-700 bg-white">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-outfit font-semibold uppercase tracking-widest text-stone-400 mb-3">
                    Colours / Finishes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <span key={c} className="px-4 py-2 rounded-full border border-stone-200 text-sm font-inter text-stone-700 bg-white">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xs font-outfit font-semibold uppercase tracking-widest text-stone-400 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-inter text-stone-700">
                        <Check className="w-4 h-4 text-brass-500 mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  onClick={() => !isInQuote(product.id) && addToQuote(product)}
                  className={`flex-1 py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-outfit font-medium transition-colors ${
                    isInQuote(product.id)
                      ? 'bg-brass-50 text-brass-700 border border-brass-200'
                      : 'bg-stone-900 hover:bg-brass-600 text-white'
                  }`}
                >
                  {isInQuote(product.id) ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {isInQuote(product.id) ? 'Added to Quote List' : 'Add to Quote'}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-outfit font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                </a>
                <a
                  href={`tel:+91${SITE_CONFIG.primaryPhone}`}
                  className="flex-1 bg-white border border-stone-200 hover:border-brass-400 text-stone-900 py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-outfit font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call for Pricing
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-400 font-inter">
                <ShieldCheck className="w-4 h-4" /> Sourced directly from authorised {product.brand} dealers.
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-16 max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Specifications</h2>
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-6 py-4 text-sm font-inter ${
                      idx % 2 === 0 ? 'bg-stone-50/60' : 'bg-white'
                    }`}
                  >
                    <span className="text-stone-500">{key}</span>
                    <span className="text-stone-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">You may also like</h2>
                {categoryMeta && (
                  <Link to={`/products/${categoryMeta.slug}`} className="text-sm font-outfit font-medium text-brass-600 hover:text-brass-700 flex items-center gap-1">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
