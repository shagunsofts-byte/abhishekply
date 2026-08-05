import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ChevronRight, FileText, Package, Shield, MessageCircle, Phone,
  Check, ArrowRight, Expand, X, ChevronLeft, Star, ThumbsUp,
  ZoomIn, Share2, Heart, Award, Truck, Clock
} from 'lucide-react';

import { SITE_CONFIG } from '../data/siteConfig';
import { useStore } from '../store/useStore';
import { useProducts } from '../hooks/useFirebase';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/catalog';

// ── Mock review generator ────────────────────────────────────────────────────
const REVIEWER_NAMES = [
  'Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sunita Verma',
  'Vikram Patel', 'Anita Gupta', 'Suresh Yadav', 'Pooja Mishra',
  'Rahul Tiwari', 'Kavita Dubey', 'Mohit Jain', 'Neha Agarwal',
];
const REVIEW_TEXTS: Record<number, string[]> = {
  5: [
    'Bahut hi badhiya product hai. Quality ekdum first class hai. Highly recommended!',
    'Excellent quality, bilkul waise hi jaise description mein likha tha. Very happy with purchase.',
    'Top notch material. Abhishek Ply ne deliver kiya time pe. Great service!',
    'Outstanding quality. Hum ne apne poore ghar ke liye isi brand ka use kiya. Superb!',
  ],
  4: [
    'Achha product hai, quality satisfactory hai. Packaging thodi aur better ho sakti thi.',
    'Good product, matches expectations. Price bhi reasonable hai market mein.',
    'Solid build quality. Minor cosmetic issues the but overall bahut achha hai.',
  ],
  3: [
    'Average quality. Price ke hisaab se theek hai. Better options bhi hain market mein.',
    'Okay product, expected se thoda alag tha but kaam chala.',
  ],
};

const generateReviews = (productId: string, count: number) => {
  const hash = productId.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  return Array.from({ length: count }, (_, i) => {
    const seed = Math.abs(hash + i * 37);
    const stars = [5, 5, 5, 4, 4, 4, 5, 3, 5, 4][seed % 10];
    const texts = REVIEW_TEXTS[stars] || REVIEW_TEXTS[4];
    const daysAgo = (seed % 120) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      id: `rev-${i}`,
      name: REVIEWER_NAMES[seed % REVIEWER_NAMES.length],
      stars,
      text: texts[seed % texts.length],
      date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      helpful: seed % 40,
      verified: seed % 3 !== 0,
    };
  });
};

const getMockMeta = (id: string) => {
  const hash = id.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const reviewCount = 20 + Math.abs(hash) % 280;
  const avgRating = (4.0 + (Math.abs(hash) % 10) / 10).toFixed(1);
  const discount = 10 + Math.abs(hash) % 55;
  return { reviewCount, avgRating: parseFloat(avgRating), discount };
};

// ── Star display ─────────────────────────────────────────────────────────────
const StarRow = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
};

// ── Rating bar ────────────────────────────────────────────────────────────────
const RatingBar = ({ stars, count, total }: { stars: number; count: number; total: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-gray-500 w-3">{stars}</span>
    <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-amber-400 rounded-full transition-all duration-700"
        style={{ width: total ? `${(count / total) * 100}%` : '0%' }}
      />
    </div>
    <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
  </div>
);

// ── Review card ───────────────────────────────────────────────────────────────
const ReviewCard = ({ review }: { review: any }) => {
  const [helpful, setHelpful] = useState(false);
  return (
    <div className="border-b border-gray-50 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-800">{review.name}</span>
              {review.verified && (
                <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Verified
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-400">{review.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-50 border border-green-100 rounded-lg px-2 py-1 flex-shrink-0">
          <span className="text-xs font-bold text-green-700">{review.stars}.0</span>
          <Star className="w-3 h-3 text-green-600 fill-green-600" />
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-2">{review.text}</p>
      <button
        onClick={() => setHelpful(!helpful)}
        className={`flex items-center gap-1.5 text-xs transition-colors ${helpful ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <ThumbsUp className="w-3 h-3" />
        Helpful ({review.helpful + (helpful ? 1 : 0)})
      </button>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
export const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const product = products.find(p => p.id === id) || STATIC_PRODUCTS.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [wishlist, setWishlist] = useState(false);

  const { addItem, items, setQuoteDrawerOpen } = useStore();
  const isInCart = items.some(i => i.productId === product?.id);

  const { reviewCount, avgRating, discount } = product ? getMockMeta(product.id) : { reviewCount: 0, avgRating: 4.5, discount: 20 };
  const reviews = useMemo(() => product ? generateReviews(product.id, reviewCount > 20 ? 20 : reviewCount) : [], [product?.id]);

  // Rating distribution
  const ratingDist = useMemo(() => {
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => dist[r.stars] = (dist[r.stars] || 0) + 1);
    return dist;
  }, [reviews]);

  const gallery: string[] = product
    ? (product.images?.length > 0 ? product.images : product.image ? [product.image] : product.thumbnail ? [product.thumbnail] : [])
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setSelectedSize(null);
    setSelectedColor(null);
    setActiveTab('overview');
    setVisibleReviews(4);
  }, [id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') setActiveImage(p => Math.min(gallery.length - 1, p + 1));
      if (e.key === 'ArrowLeft') setActiveImage(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, gallery.length]);

  const parsePrice = (v: any) => {
    if (typeof v === 'number') return v;
    const n = parseInt(v?.toString().replace(/\D/g, '') || '');
    return isNaN(n) ? null : n;
  };

  const handleAddToQuote = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      brand: product.brand,
      category: product.category,
      image: product.thumbnail || product.image || gallery[0] || '',
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      quantity: 1,
    });
    setQuoteDrawerOpen(true);
  };

  const handleWhatsApp = () => {
    const msg = product?.whatsappMessage || `Hi, I am interested in ${product?.name} by ${product?.brand}. Can you provide a quotation?`;
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading product...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
      <div>
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
          Browse All Products
        </Link>
      </div>
    </div>
  );

  const displayPrice = parsePrice(product.price);
  const mrp = displayPrice ? Math.round(displayPrice * (1 + discount / 100)) : null;

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-28 lg:pb-16">
      <Helmet>
        <title>{product.name} | {product.brand} | Abhishek Ply & Hardware</title>
        <meta name="description" content={product.shortDescription || product.description || ''} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-1.5 text-xs text-gray-400 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link to="/products" className="hover:text-gray-700 transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-gray-700 transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* ── TOP SECTION ── */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* LEFT: Gallery */}
          <div className="w-full lg:w-[48%] flex flex-col gap-3">
            {/* Main image */}
            <div
              className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group cursor-zoom-in"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setIsFullscreen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </AnimatePresence>
              <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:shadow-md">
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </button>
              {/* Nav arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveImage(p => Math.max(0, p - 1)); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all disabled:opacity-30"
                    disabled={activeImage === 0}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveImage(p => Math.min(gallery.length - 1, p + 1)); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all disabled:opacity-30"
                    disabled={activeImage === gallery.length - 1}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              )}
              {/* Image counter */}
              {gallery.length > 1 && (
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur text-white text-[11px] px-2 py-0.5 rounded-full">
                  {activeImage + 1} / {gallery.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${activeImage === idx ? 'border-amber-500 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {activeImage !== idx && <div className="absolute inset-0 bg-white/30" />}
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { icon: Shield, label: 'Original Brand' },
                { icon: Truck, label: 'Bulk Supply' },
                { icon: Clock, label: 'Fast Quote' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 bg-white rounded-xl border border-gray-100 py-3 px-2">
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] text-gray-500 text-center font-medium leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="w-full lg:w-[52%] flex flex-col">

            {/* Brand + wishlist row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                {product.brand}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${wishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200'}`}
                >
                  <Heart className={`w-4 h-4 ${wishlist ? 'fill-red-500' : ''}`} />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:text-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                {avgRating} <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <StarRow rating={avgRating} />
              <span className="text-sm text-gray-400">{reviewCount.toLocaleString()} ratings</span>
              <button onClick={() => setActiveTab('reviews')} className="text-sm text-blue-500 hover:underline">
                {reviews.length} reviews
              </button>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 shadow-sm">
              {displayPrice ? (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-bold text-gray-900">₹{displayPrice.toLocaleString()}</span>
                  {mrp && <span className="text-base text-gray-400 line-through">₹{mrp.toLocaleString()}</span>}
                  {discount > 0 && (
                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{discount}% OFF</span>
                  )}
                </div>
              ) : (
                <div>
                  <span className="text-xl font-bold text-gray-900">{product.priceLabel || 'Price on Request'}</span>
                  <p className="text-xs text-gray-400 mt-1">Contact us for bulk pricing and custom orders</p>
                </div>
              )}
              {product.availability && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-green-600">
                  <Check className="w-4 h-4" /> {product.availability}
                </div>
              )}
            </div>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Size / Dimension {selectedSize && <span className="text-amber-600 font-normal">— {selectedSize}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                      className={`px-4 py-2 rounded-xl text-sm border transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Color / Finish {selectedColor && <span className="text-amber-600 font-normal">— {selectedColor}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                      className={`px-4 py-2 rounded-xl text-sm border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={handleAddToQuote}
                className={`flex-1 h-13 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isInCart
                    ? 'bg-gray-100 text-gray-700 border border-gray-200'
                    : 'bg-gray-900 text-white hover:bg-amber-500 hover:text-gray-900 shadow-gray-900/10'
                }`}
                style={{ height: '52px' }}
              >
                {isInCart ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                {isInCart ? 'Added to Quote' : 'Add to Quote'}
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-13 h-13 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm flex-shrink-0"
                style={{ width: '52px', height: '52px' }}
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <a
                href={`tel:+91${SITE_CONFIG.primaryPhone}`}
                className="w-13 h-13 bg-white text-gray-700 border border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-400 transition-colors shadow-sm flex-shrink-0"
                style={{ width: '52px', height: '52px' }}
                title="Call"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            {/* Quick features */}
            <div className="grid grid-cols-2 gap-2">
              {[
                'Genuine & Original Product',
                'Bulk Order Available',
                'Expert Guidance',
                'Fast Quotation',
                'Custom Sizes on Request',
                'Pan India Delivery',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
            {(['overview', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${reviewCount.toLocaleString()})` : tab === 'specs' ? 'Specifications' : 'Overview'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About this product</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description || product.shortDescription}</p>
                </div>
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-amber-600" />
                          </div>
                          <span className="text-sm text-gray-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {product.usage && product.usage.length > 0 && (
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-3">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.usage.map((u: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">{u}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SPECS */}
            {activeTab === 'specs' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    product.material && { label: 'Material', value: product.material },
                    product.finish && { label: 'Finish', value: product.finish },
                    product.category && { label: 'Category', value: product.category },
                    product.subcategory && { label: 'Sub-category', value: product.subcategory },
                    product.brand && { label: 'Brand', value: product.brand },
                    ...Object.entries(product.specifications || {}).map(([k, v]) => ({ label: k, value: v as string })),
                  ].filter(Boolean).map((spec: any) => (
                    <div key={spec.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{spec.value}</p>
                    </div>
                  ))}
                </div>
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Available Sizes</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s: string) => (
                        <span key={s} className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-lg text-gray-700">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS */}
            {activeTab === 'reviews' && (
              <div>
                {/* Rating summary */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-gray-100">
                  {/* Big number */}
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 min-w-[120px] border border-gray-100">
                    <span className="text-5xl font-bold text-gray-900 mb-1">{avgRating}</span>
                    <StarRow rating={avgRating} size="lg" />
                    <span className="text-xs text-gray-400 mt-1.5">{reviewCount.toLocaleString()} ratings</span>
                  </div>
                  {/* Bars */}
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    {[5, 4, 3, 2, 1].map(s => (
                      <RatingBar key={s} stars={s} count={ratingDist[s] || 0} total={reviews.length} />
                    ))}
                  </div>
                </div>

                {/* Write review prompt */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Share your experience</p>
                    <p className="text-xs text-gray-500">Help others make the right choice</p>
                  </div>
                  <button
                    onClick={handleWhatsApp}
                    className="text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors px-4 py-2 rounded-lg flex-shrink-0"
                  >
                    Write Review
                  </button>
                </div>

                {/* Review list */}
                <div>
                  {reviews.slice(0, visibleReviews).map(r => <ReviewCard key={r.id} review={r} />)}
                  {visibleReviews < reviews.length && (
                    <button
                      onClick={() => setVisibleReviews(v => v + 4)}
                      className="w-full mt-4 py-3 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Load more reviews ({reviews.length - visibleReviews} remaining)
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── WHY CHOOSE US ── */}
        <div className="mt-8 bg-gray-900 rounded-2xl p-6 md:p-10">
          <h3 className="text-lg font-bold text-white mb-6 text-center">Why Buy From Abhishek Ply?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: 'Original Products', desc: 'Authentic with brand warranty' },
              { icon: Package, title: 'Bulk Supply', desc: 'Large quantities for projects' },
              { icon: Award, title: 'Best Prices', desc: 'Competitive market rates' },
              { icon: FileText, title: 'Quick Quote', desc: 'Fast and accurate estimates' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {products.filter(p => p.category === product.category && p.id !== product.id).length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Similar Products</h2>
              <Link to={`/products/${product.category.toLowerCase()}`} className="text-sm text-amber-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => {
                const meta = getMockMeta(p.id);
                const rPrice = parsePrice(p.price);
                return (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                      <img
                        src={p.thumbnail || p.image || p.images?.[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-0.5">{p.brand}</p>
                      <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">{p.name}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center gap-0.5 bg-green-50 border border-green-100 rounded px-1.5 py-0.5">
                          <span className="text-[10px] font-bold text-green-700">{meta.avgRating}</span>
                          <Star className="w-2.5 h-2.5 text-green-600 fill-green-600" />
                        </div>
                      </div>
                      {rPrice ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-gray-900">₹{rPrice.toLocaleString()}</span>
                          <span className="text-[11px] text-amber-600 font-medium">({meta.discount}% off)</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Price on Request</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── FULLSCREEN LIGHTBOX ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 text-white">
              <span className="text-sm opacity-60">{activeImage + 1} / {gallery.length}</span>
              <button onClick={() => setIsFullscreen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center relative px-12">
              {gallery.length > 1 && (
                <button onClick={() => setActiveImage(p => Math.max(0, p - 1))} className="absolute left-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white disabled:opacity-20" disabled={activeImage === 0}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <img src={gallery[activeImage]} alt={product.name} className="max-w-full max-h-full object-contain select-none" draggable={false} />
              {gallery.length > 1 && (
                <button onClick={() => setActiveImage(p => Math.min(gallery.length - 1, p + 1))} className="absolute right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white disabled:opacity-20" disabled={activeImage === gallery.length - 1}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="flex justify-center gap-2 p-4 overflow-x-auto">
                {gallery.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-white' : 'border-transparent opacity-40 hover:opacity-70'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 p-3 flex gap-3 lg:hidden shadow-xl">
        <button onClick={handleWhatsApp} className="flex-1 h-12 bg-green-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
        <button onClick={handleAddToQuote} className={`flex-1 h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 ${isInCart ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-white'}`}>
          {isInCart ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          {isInCart ? 'In Quote' : 'Add to Quote'}
        </button>
      </div>
    </div>
  );
};
