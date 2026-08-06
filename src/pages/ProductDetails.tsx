import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ChevronRight, FileText, Shield, MessageCircle, Phone,
  Check, ArrowRight, X, ChevronLeft, Star, ThumbsUp,
  ZoomIn, Share2, Heart, Award, Truck, Clock, Package
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

const RatingBar = ({ stars, count, total }: { stars: number; count: number; total: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-gray-500 w-3">{stars}</span>
    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-amber-400 rounded-full" style={{ width: total ? `${(count / total) * 100}%` : '0%' }} />
    </div>
    <span className="text-sm text-gray-400 w-6 text-right">{count}</span>
  </div>
);

const ReviewCard = ({ review }: { review: any }) => {
  const [helpful, setHelpful] = useState(false);
  return (
    <div className="py-6 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">{review.name}</span>
              {review.verified && (
                <span className="text-[11px] text-green-600 font-medium flex items-center gap-0.5 bg-green-50 px-2 py-0.5 rounded-full">
                  <Check className="w-2.5 h-2.5" /> Verified Purchase
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400 mt-0.5 block">{review.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0">
          {review.stars}.0 <Star className="w-3 h-3 fill-white ml-0.5" />
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-3 ml-13">{review.text}</p>
      <button
        onClick={() => setHelpful(!helpful)}
        className={`ml-13 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${helpful ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'}`}
      >
        <ThumbsUp className="w-3 h-3" />
        Helpful ({review.helpful + (helpful ? 1 : 0)})
      </button>
    </div>
  );
};

// ── Section Divider ──────────────────────────────────────────────────────────
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">{title}</h2>
    <div className="flex-1 h-px bg-gray-100" />
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  // Match by id OR slug so both Firebase Firestore IDs and catalog slug-IDs work
  const product =
    products.find(p => p.id === id || p.slug === id) ||
    STATIC_PRODUCTS.find(p => p.id === id || p.slug === id);

  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [imgError, setImgError] = useState(false);

  const { addItem, items, setQuoteDrawerOpen } = useStore();
  const isInCart = items.some(i => i.productId === product?.id);

  const { reviewCount, avgRating, discount } = product
    ? getMockMeta(product.id)
    : { reviewCount: 0, avgRating: 4.5, discount: 20 };

  const reviews = useMemo(
    () => (product ? generateReviews(product.id, Math.min(reviewCount, 20)) : []),
    [product?.id]
  );

  const ratingDist = useMemo(() => {
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { dist[r.stars] = (dist[r.stars] || 0) + 1; });
    return dist;
  }, [reviews]);

  const gallery: string[] = product
    ? product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : product.thumbnail
      ? [product.thumbnail]
      : []
    : [];

  const fallbackImg = `https://placehold.co/800x800/f8f8f8/bbb?text=${encodeURIComponent(product?.name?.slice(0, 12) || 'Product')}`;
  const currentImg = gallery.length > 0 ? gallery[activeImage] : fallbackImg;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveImage(0);
    setSelectedSize(null);
    setSelectedColor(null);
    setVisibleReviews(5);
    setImgError(false);
  }, [id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') setActiveImage(p => Math.min((gallery.length || 1) - 1, p + 1));
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
    const msg =
      product?.whatsappMessage ||
      `Hi, I am interested in ${product?.name} by ${product?.brand}. Can you provide a quotation?`;
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ── Loading state ────────────────────────────────────────────────────────
  // Only show spinner if firebase is still loading AND product not found in static catalog yet
  if (loading && !product)
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-medium">Loading product...</p>
        </div>
      </div>
    );

  // ── Not found ────────────────────────────────────────────────────────────
  if (!product)
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div>
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-amber-500 hover:text-gray-900 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );

  const displayPrice = parsePrice(product.price);
  const mrp = displayPrice ? Math.round(displayPrice * (1 + discount / 100)) : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-28 lg:pb-12">
      <Helmet>
        <title>{product.name} | {product.brand} | Abhishek Ply & Hardware</title>
        <meta name="description" content={product.shortDescription || product.description || ''} />
      </Helmet>

      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-1.5 text-xs text-gray-400 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link to="/products" className="hover:text-gray-700 transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link to={`/products/${product.category?.toLowerCase()}`} className="hover:text-gray-700 transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION — Left thumbnails + Big image + Right info
          ══════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-14">

            {/* ── LEFT: Image Gallery ── */}
            <div className="w-full lg:w-[55%] flex gap-3 flex-shrink-0">

              {/* Vertical thumbnail strip */}
              {gallery.length > 1 && (
                <div className="hidden sm:flex flex-col gap-2 w-[76px] flex-shrink-0">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-[76px] h-[76px] rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        activeImage === idx
                          ? 'border-amber-500 shadow-md'
                          : 'border-gray-100 hover:border-gray-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = fallbackImg; }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1">
                <div
                  className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group cursor-zoom-in"
                  style={{ aspectRatio: '1/1' }}
                  onClick={() => setIsFullscreen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      src={imgError ? fallbackImg : currentImg}
                      alt={product.name}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AnimatePresence>

                  {/* Badges */}
                  {discount >= 15 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {discount}% OFF
                    </div>
                  )}

                  {/* Zoom hint */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                    <ZoomIn className="w-3.5 h-3.5" /> Click to zoom
                  </div>

                  {/* Nav arrows */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={e => { e.stopPropagation(); setActiveImage(p => Math.max(0, p - 1)); }}
                        disabled={activeImage === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-20 opacity-0 group-hover:opacity-100 transition-all hover:shadow-lg"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); setActiveImage(p => Math.min(gallery.length - 1, p + 1)); }}
                        disabled={activeImage === gallery.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-20 opacity-0 group-hover:opacity-100 transition-all hover:shadow-lg"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Counter */}
                  {gallery.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-full">
                      {activeImage + 1} / {gallery.length}
                    </div>
                  )}
                </div>

                {/* Mobile horizontal thumbnails */}
                {gallery.length > 1 && (
                  <div className="flex sm:hidden gap-2 mt-3 overflow-x-auto pb-1">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-amber-500' : 'border-gray-100 opacity-60'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="w-full lg:flex-1 flex flex-col">

              {/* Brand + wishlist + share */}
              <div className="flex items-center justify-between mb-3">
                <Link to={`/products?brand=${encodeURIComponent(product.brand)}`}>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 hover:bg-amber-100 transition-colors">
                    {product.brand}
                  </span>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${wishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'}`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist ? 'fill-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                    className="w-9 h-9 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center hover:border-gray-400 hover:text-gray-600 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                  {avgRating} <Star className="w-3.5 h-3.5 fill-white" />
                </div>
                <StarRow rating={avgRating} />
                <span className="text-sm text-gray-400">{reviewCount.toLocaleString()} ratings</span>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-blue-500 cursor-pointer hover:underline"
                  onClick={() => { document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  {reviews.length} reviews
                </span>
              </div>

              <div className="border-t border-gray-100 pt-5 mb-5">
                {/* Price */}
                {displayPrice ? (
                  <div className="mb-1">
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <span className="text-4xl font-bold text-gray-900">₹{displayPrice.toLocaleString()}</span>
                      {mrp && <span className="text-xl text-gray-400 line-through">₹{mrp.toLocaleString()}</span>}
                      {discount > 0 && (
                        <span className="text-lg font-bold text-green-600">{discount}% OFF</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes · Contact for bulk pricing</p>
                  </div>
                ) : (
                  <div className="mb-1">
                    <span className="text-2xl font-bold text-gray-900">{product.priceLabel || 'Price on Request'}</span>
                    <p className="text-xs text-gray-400 mt-1">Contact us for bulk pricing and custom orders</p>
                  </div>
                )}

                {/* Availability */}
                {product.availability && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-green-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {product.availability}
                  </div>
                )}
              </div>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-800 mb-2.5">
                    Size / Dimension
                    {selectedSize && <span className="text-amber-600 font-normal ml-1">— {selectedSize}</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                        className={`px-4 py-2 rounded-xl text-sm border-2 font-medium transition-all ${
                          selectedSize === size
                            ? 'border-amber-500 bg-amber-50 text-amber-800'
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
                  <p className="text-sm font-semibold text-gray-800 mb-2.5">
                    Color / Finish
                    {selectedColor && <span className="text-amber-600 font-normal ml-1">— {selectedColor}</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                        className={`px-4 py-2 rounded-xl text-sm border-2 font-medium transition-all ${
                          selectedColor === color
                            ? 'border-amber-500 bg-amber-50 text-amber-800'
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
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToQuote}
                  className={`flex-1 h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                    isInCart
                      ? 'bg-green-50 text-green-700 border-2 border-green-300'
                      : 'bg-gray-900 text-white hover:bg-amber-500 hover:text-gray-900 hover:shadow-lg'
                  }`}
                >
                  {isInCart ? <Check className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  {isInCart ? 'Added to Quote ✓' : 'Add to Quote'}
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm flex-shrink-0"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <a
                  href={`tel:+91${SITE_CONFIG.primaryPhone}`}
                  className="w-14 h-14 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl flex items-center justify-center hover:border-amber-400 hover:text-amber-600 transition-all shadow-sm flex-shrink-0"
                  title="Call"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              {/* Trust badges row */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: Shield, label: 'Original Brand' },
                  { icon: Truck, label: 'Bulk Supply' },
                  { icon: Clock, label: 'Fast Quote' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2 border border-gray-100">
                    <Icon className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] text-gray-500 text-center font-medium leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Quick features */}
              <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-2.5">
                {[
                  'Genuine & Original Product',
                  'Bulk Order Available',
                  'Expert Guidance',
                  'Fast Quotation',
                  'Custom Sizes on Request',
                  'Pan India Delivery',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-700">
                    <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-amber-600" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCROLLABLE CONTENT — No tabs, all sections flow naturally
          ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-6">

        {/* ── ABOUT / DESCRIPTION ── */}
        {(product.description || product.shortDescription) && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <SectionHeader title="About this Product" />
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-amber-50 rounded-xl p-3.5 border border-amber-100">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-800 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.usage && product.usage.length > 0 && (
              <div className="mt-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Applications & Usage</h3>
                <div className="flex flex-wrap gap-2">
                  {product.usage.map((u: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SPECIFICATIONS ── */}
        {(product.material || product.finish || product.specifications || product.sizes) && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <SectionHeader title="Specifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {[
                product.material && { label: 'Material', value: product.material },
                product.finish && { label: 'Finish', value: product.finish },
                product.category && { label: 'Category', value: product.category },
                product.subcategory && { label: 'Sub-category', value: product.subcategory },
                product.brand && { label: 'Brand', value: product.brand },
                ...Object.entries(product.specifications || {}).map(([k, v]) => ({ label: k, value: v as string })),
              ]
                .filter(Boolean)
                .map((spec: any) => (
                  <div key={spec.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">{spec.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{spec.value}</p>
                  </div>
                ))}
            </div>
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Available Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s: string) => (
                    <span key={s} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── WHY BUY FROM US ── */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-10">
          <h2 className="text-xl font-bold text-white mb-8 text-center">Why Buy From Abhishek Ply?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Original Products', desc: 'Authentic with brand warranty' },
              { icon: Package, title: 'Bulk Supply', desc: 'Large quantities for projects' },
              { icon: Award, title: 'Best Prices', desc: 'Competitive market rates' },
              { icon: FileText, title: 'Quick Quote', desc: 'Fast and accurate estimates' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RATINGS & REVIEWS ── */}
        <div id="reviews-section" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <SectionHeader title={`Ratings & Reviews (${reviewCount.toLocaleString()})`} />

          {/* Rating summary */}
          <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
            {/* Big number */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8 min-w-[140px] border border-gray-100">
              <span className="text-6xl font-bold text-gray-900 leading-none mb-2">{avgRating}</span>
              <StarRow rating={avgRating} size="lg" />
              <span className="text-sm text-gray-400 mt-2">{reviewCount.toLocaleString()} ratings</span>
            </div>
            {/* Bars */}
            <div className="flex-1 flex flex-col justify-center gap-3">
              {[5, 4, 3, 2, 1].map(s => (
                <RatingBar key={s} stars={s} count={ratingDist[s] || 0} total={reviews.length} />
              ))}
            </div>
          </div>

          {/* Write review CTA */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-bold text-gray-900">Have you used this product?</p>
              <p className="text-sm text-gray-500 mt-0.5">Share your experience and help others decide</p>
            </div>
            <button
              onClick={handleWhatsApp}
              className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 rounded-xl flex-shrink-0 shadow-sm"
            >
              Write a Review
            </button>
          </div>

          {/* Review list */}
          <div>
            {reviews.slice(0, visibleReviews).map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
            {visibleReviews < reviews.length && (
              <button
                onClick={() => setVisibleReviews(v => v + 5)}
                className="w-full mt-6 py-3.5 text-sm font-semibold text-gray-700 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Load More Reviews ({reviews.length - visibleReviews} remaining)
              </button>
            )}
          </div>
        </div>

        {/* ── SIMILAR PRODUCTS ── */}
        {products.filter(p => p.category === product.category && p.id !== product.id).length > 0 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Similar Products</h2>
              <Link
                to={`/products/${product.category?.toLowerCase()}`}
                className="text-sm text-amber-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(p => {
                  const meta = getMockMeta(p.id);
                  const rPrice = parsePrice(p.price);
                  return (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      className="group bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                    >
                      <div className="aspect-square bg-white overflow-hidden rounded-t-2xl">
                        <img
                          src={p.thumbnail || p.image || p.images?.[0] || fallbackImg}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-0.5">{p.brand}</p>
                        <h3 className="text-sm font-semibold text-gray-800 truncate mb-1.5">{p.name}</h3>
                        <div className="flex items-center gap-1 mb-1.5">
                          <div className="flex items-center gap-0.5 bg-green-50 border border-green-100 rounded px-1.5 py-0.5">
                            <span className="text-[10px] font-bold text-green-700">{meta.avgRating}</span>
                            <Star className="w-2.5 h-2.5 text-green-600 fill-green-600" />
                          </div>
                        </div>
                        {rPrice ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-gray-900">₹{rPrice.toLocaleString()}</span>
                            <span className="text-[11px] text-green-600 font-medium">({meta.discount}% off)</span>
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
            className="fixed inset-0 z-[999] bg-black/96 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 text-white">
              <span className="text-sm opacity-60">{activeImage + 1} / {gallery.length || 1}</span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center relative px-16">
              {gallery.length > 1 && (
                <button
                  onClick={() => setActiveImage(p => Math.max(0, p - 1))}
                  disabled={activeImage === 0}
                  className="absolute left-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <img
                src={imgError ? fallbackImg : currentImg}
                alt={product.name}
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
              />
              {gallery.length > 1 && (
                <button
                  onClick={() => setActiveImage(p => Math.min(gallery.length - 1, p + 1))}
                  disabled={activeImage === gallery.length - 1}
                  className="absolute right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="flex justify-center gap-2 p-4 overflow-x-auto">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-white' : 'border-transparent opacity-40 hover:opacity-70'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 lg:hidden shadow-2xl">
        <button
          onClick={handleWhatsApp}
          className="flex-1 h-12 bg-green-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
        <button
          onClick={handleAddToQuote}
          className={`flex-1 h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 ${
            isInCart ? 'bg-green-50 text-green-700 border-2 border-green-200' : 'bg-gray-900 text-white'
          }`}
        >
          {isInCart ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          {isInCart ? 'In Quote ✓' : 'Add to Quote'}
        </button>
      </div>
    </div>
  );
};
