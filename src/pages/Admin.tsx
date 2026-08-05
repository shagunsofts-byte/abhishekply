import React, { useState, useEffect } from 'react';
import {
  collection, query, getDocs, orderBy, addDoc, doc,
  updateDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase_config';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import {
  Package, FileText, X, Edit, Trash2, LayoutDashboard,
  CheckCircle, Plus, LogOut, Home, Menu, Search, Bell,
  ArrowUpRight, ArrowDownRight, Inbox
} from 'lucide-react';
import { CATEGORIES, BRANDS } from '../data/catalog';
import { Product } from '../hooks/useFirebase';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  NEW:             { label: 'New',           color: 'text-amber-700',   bg: 'bg-amber-50',    border: 'border-amber-200' },
  VIEWED:          { label: 'Viewed',        color: 'text-violet-700',  bg: 'bg-violet-50',   border: 'border-violet-200' },
  QUOTATION_READY: { label: 'Quote Ready',   color: 'text-emerald-700', bg: 'bg-emerald-50',  border: 'border-emerald-200' },
  CONTACTED:       { label: 'Contacted',     color: 'text-blue-700',    bg: 'bg-blue-50',     border: 'border-blue-200' },
  CLOSED:          { label: 'Closed',        color: 'text-zinc-500',    bg: 'bg-zinc-100',    border: 'border-zinc-200' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.NEW;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border font-outfit ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {cfg.label}
    </span>
  );
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────

const KPICard = ({ label, value, sub, icon: Icon, trend, trendUp, accent }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; trend?: string; trendUp?: boolean; accent: string;
}) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-semibold font-outfit ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold font-serif text-zinc-900 leading-none mb-1">{value}</p>
      <p className="text-sm font-outfit text-zinc-500">{label}</p>
      {sub && <p className="text-xs font-outfit text-zinc-400 mt-1">{sub}</p>}
    </div>
  </motion.div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview',       icon: LayoutDashboard },
  { id: 'quotes',   label: 'Quote Requests', icon: FileText },
  { id: 'products', label: 'Products',       icon: Package },
];

const SidebarContent = ({ active, setActive, closeMobile, newCount }: {
  active: string; setActive: (s: string) => void; closeMobile: () => void; newCount: number;
}) => (
  <div className="h-full flex flex-col bg-zinc-950 text-white w-64">
    <div className="px-6 py-6 border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 group" onClick={closeMobile}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 group-hover:rotate-180 transition-transform duration-700">
          <path d="M2 22L12 2l10 20"/><path d="M12 12h8"/><path d="M4 12h8"/>
        </svg>
        <div>
          <p className="font-serif font-bold text-sm tracking-wide leading-none text-white">ABHISHEK</p>
          <p className="text-[0.6rem] text-amber-400 tracking-widest uppercase font-outfit">Admin Panel</p>
        </div>
      </Link>
    </div>

    <nav className="flex-1 px-3 py-6 space-y-1">
      <p className="text-[0.6rem] font-outfit font-semibold tracking-widest uppercase text-white/30 px-3 mb-3">Menu</p>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => { setActive(id); closeMobile(); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-outfit font-medium transition-all duration-200 ${
              isActive ? 'bg-amber-500 text-zinc-950 shadow-[0_2px_12px_rgba(245,158,11,0.4)]'
                       : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}>
            <span className="flex items-center gap-3">
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </span>
            {id === 'quotes' && newCount > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-zinc-900/20 text-zinc-900' : 'bg-amber-500 text-zinc-950'}`}>
                {newCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>

    <div className="px-3 py-4 border-t border-white/5 space-y-1">
      <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-outfit font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all">
        <Home className="w-4 h-4" /> Back to Website
      </Link>
      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-outfit font-medium text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all">
        <LogOut className="w-4 h-4" /> Sign Out
      </button>
    </div>
  </div>
);

// ─── Overview ─────────────────────────────────────────────────────────────────

const Overview = ({ quotes, products, setActive }: { quotes: any[]; products: Product[]; setActive: (s: string) => void }) => {
  const newCount     = quotes.filter(q => !q.status || q.status === 'NEW').length;
  const closedCount  = quotes.filter(q => q.status === 'CLOSED').length;
  const recent       = quotes.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard label="Total Enquiries"    value={quotes.length}   icon={FileText}    accent="bg-amber-100 text-amber-600"   trend="+12%" trendUp sub="All time" />
        <KPICard label="New / Pending"      value={newCount}        icon={Inbox}       accent="bg-violet-100 text-violet-600" sub="Needs attention" />
        <KPICard label="Products Listed"    value={products.length} icon={Package}     accent="bg-blue-100 text-blue-600"     trend="+3"  trendUp sub="In catalog" />
        <KPICard label="Deals Closed"       value={closedCount}     icon={CheckCircle} accent="bg-emerald-100 text-emerald-600" trend="+8%" trendUp sub="This month" />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-50">
          <div>
            <h3 className="font-serif font-bold text-zinc-900">Recent Requests</h3>
            <p className="text-xs font-outfit text-zinc-400 mt-0.5">Latest 5 enquiries</p>
          </div>
          <button onClick={() => setActive('quotes')}
            className="text-xs font-outfit font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-zinc-50">
          {recent.length === 0 ? (
            <div className="py-16 text-center text-zinc-400 font-outfit text-sm">No quote requests yet</div>
          ) : recent.map(q => (
            <div key={q.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/60 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold font-serif text-amber-700">
                    {(q.customer?.name || 'U')[0].toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 font-outfit truncate">{q.customer?.name || 'Unknown'}</p>
                  <p className="text-xs text-zinc-400 font-outfit">{q.referenceNumber || q.id.slice(0,8)} · {q.items?.length || 0} items</p>
                </div>
              </div>
              <StatusBadge status={q.status || 'NEW'} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Quote Ready',  count: quotes.filter(q => q.status === 'QUOTATION_READY').length, c: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Contacted',    count: quotes.filter(q => q.status === 'CONTACTED').length,       c: 'text-blue-600',    bg: 'bg-blue-50'    },
          { label: 'Viewed',       count: quotes.filter(q => q.status === 'VIEWED').length,          c: 'text-violet-600',  bg: 'bg-violet-50'  },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl px-6 py-5 flex items-center justify-between`}>
            <span className="font-outfit font-medium text-zinc-700 text-sm">{s.label}</span>
            <span className={`text-2xl font-bold font-serif ${s.c}`}>{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Quotes Tab ───────────────────────────────────────────────────────────────

const QuotesTab = ({ quotes, onStatusChange }: { quotes: any[]; onStatusChange: (id: string, s: string) => void }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = quotes.filter(q => {
    const ms = !search || q.customer?.name?.toLowerCase().includes(search.toLowerCase())
      || (q.referenceNumber||'').toLowerCase().includes(search.toLowerCase())
      || q.customer?.phone?.includes(search);
    const mf = filter === 'ALL' || (q.status||'NEW') === filter;
    return ms && mf;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, or reference…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-outfit outline-none focus:border-amber-400 bg-white transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['ALL', ...Object.keys(STATUS_CONFIG)].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-outfit font-semibold transition-all ${
                filter === s ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300'
              }`}>
              {s === 'ALL' ? 'All' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-outfit">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                {['Reference', 'Customer', 'Items', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="px-5 py-3.5 text-[0.65rem] font-semibold text-zinc-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filtered.map(q => (
                <tr key={q.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-zinc-900 font-mono">{q.referenceNumber || q.id.slice(0,8)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-zinc-900">{q.customer?.name || '—'}</p>
                    <p className="text-xs text-zinc-400">{q.customer?.phone}</p>
                    {q.customer?.company && <p className="text-xs text-zinc-400">{q.customer.company}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 text-sm font-bold text-zinc-700">
                      {q.items?.length || q.products?.length || 0}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <select value={q.status||'NEW'} onChange={e => onStatusChange(q.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold outline-none cursor-pointer border appearance-none ${STATUS_CONFIG[q.status||'NEW']?.color} ${STATUS_CONFIG[q.status||'NEW']?.bg} ${STATUS_CONFIG[q.status||'NEW']?.border}`}>
                      {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                        <option key={val} value={val}>{cfg.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-zinc-400 whitespace-nowrap">
                    {q.createdAt?.toDate ? q.createdAt.toDate().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—'}
                  </td>
                  <td className="px-5 py-4">
                    {q.customer?.phone && (
                      <a href={`https://wa.me/91${q.customer.phone}?text=Hi ${q.customer.name}, regarding your quote ${q.referenceNumber||''}`}
                        target="_blank" rel="noreferrer"
                        className="opacity-0 group-hover:opacity-100 text-xs font-outfit font-semibold text-emerald-600 hover:text-emerald-700 transition-all">
                        WhatsApp ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-20 text-center">
                  <FileText className="w-10 h-10 text-zinc-200 mx-auto mb-3" />
                  <p className="text-zinc-400 font-outfit text-sm">No requests match your filter</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-zinc-50">
          <p className="text-xs font-outfit text-zinc-400">{filtered.length} of {quotes.length} requests</p>
        </div>
      </div>
    </div>
  );
};

// ─── Product Modal ────────────────────────────────────────────────────────────

const ProductModal = ({ open, onClose, onSave, editingProduct }: {
  open: boolean; onClose: () => void;
  onSave: (data: any, id: string|null) => Promise<void>;
  editingProduct: Product|null;
}) => {
  const [name, setName]               = useState('');
  const [brand, setBrand]             = useState(BRANDS[0]||'');
  const [category, setCategory]       = useState(CATEGORIES[0]||'');
  const [price, setPrice]             = useState('');
  const [imagesInput, setImagesInput] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving]           = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name); setBrand(editingProduct.brand); setCategory(editingProduct.category);
      setPrice(editingProduct.price?.toString()||'');
      setImagesInput(editingProduct.images?.length ? editingProduct.images.join(',\n') : (editingProduct.image||''));
      setDescription(editingProduct.description||'');
    } else {
      setName(''); setBrand(BRANDS[0]||''); setCategory(CATEGORIES[0]||'');
      setPrice(''); setImagesInput(''); setDescription('');
    }
  }, [editingProduct, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const parsedImages = imagesInput.split(/[,\n]+/).map(i => i.trim()).filter(Boolean);
    await onSave({
      name, brand, category,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
      price: price ? parseFloat(price) : null,
      priceLabel: price ? `Rs. ${parseFloat(price).toLocaleString('en-IN')}` : 'Price on Request',
      image: parsedImages[0]||'', images: parsedImages, thumbnail: parsedImages[0]||'',
      description, inStock: true,
    }, editingProduct?.id||null);
    setSaving(false); onClose();
  };

  const fi = "w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm font-outfit outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-white transition-all";
  const lb = "block text-xs font-outfit font-semibold text-zinc-500 uppercase tracking-wider mb-2";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" onClick={onClose} />
          <motion.div
            initial={{opacity:0,scale:0.96,y:24}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.96,y:24}}
            transition={{type:'spring',damping:28,stiffness:320}}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden pointer-events-auto">
              <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 shrink-0">
                <div>
                  <h2 className="font-serif font-bold text-xl text-zinc-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <p className="text-xs font-outfit text-zinc-400 mt-0.5">{editingProduct ? 'Update catalog entry' : 'Create a new catalog entry'}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} id="pf" className="flex-1 overflow-y-auto px-8 py-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className={lb}>Product Name</label>
                    <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Greenply Gold Plus 19mm" className={fi} />
                  </div>
                  <div>
                    <label className={lb}>Category</label>
                    <select value={category} onChange={e=>setCategory(e.target.value)} className={fi}>
                      {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lb}>Brand</label>
                    <select value={brand} onChange={e=>setBrand(e.target.value)} className={fi}>
                      {BRANDS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className={lb}>Price (₹) <span className="text-zinc-400 normal-case font-normal tracking-normal">— leave blank for "Price on Request"</span></label>
                    <input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} placeholder="e.g. 1200" className={fi} />
                  </div>
                  <div className="col-span-2">
                    <label className={lb}>Image URLs <span className="text-zinc-400 normal-case font-normal tracking-normal">— one per line</span></label>
                    <textarea rows={3} required value={imagesInput} onChange={e=>setImagesInput(e.target.value)}
                      placeholder={"https://res.cloudinary.com/your-cloud/image1.jpg\nhttps://..."} className={fi+' resize-none'} />
                  </div>
                  <div className="col-span-2">
                    <label className={lb}>Description</label>
                    <textarea rows={4} required value={description} onChange={e=>setDescription(e.target.value)}
                      placeholder="Grade, thickness, features, use cases…" className={fi+' resize-none'} />
                  </div>
                </div>
              </form>
              <div className="px-8 py-5 border-t border-zinc-100 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-outfit font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="pf" disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-sm font-outfit font-bold bg-zinc-900 text-white hover:bg-amber-500 hover:text-zinc-900 transition-all disabled:opacity-60 shadow-sm">
                  {saving ? 'Saving…' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Products Tab ─────────────────────────────────────────────────────────────

const ProductsTab = ({ products, onEdit, onDelete, onAdd }: {
  products: Product[]; onEdit: (p: Product) => void; onDelete: (id: string) => void; onAdd: () => void;
}) => {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-outfit outline-none focus:border-amber-400 bg-white transition-colors" />
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-outfit font-bold hover:bg-amber-500 hover:text-zinc-900 transition-all shadow-sm shrink-0">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-outfit">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                {['Product','Category','Brand','Price',''].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-[0.65rem] font-semibold text-zinc-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filtered.map(p=>(
                <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                        {(p.thumbnail||p.image||p.images?.[0]) ? (
                          <img src={p.thumbnail||p.image||p.images?.[0]} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-zinc-300"/></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 truncate max-w-[200px]">{p.name}</p>
                        <p className="text-xs text-zinc-400 truncate max-w-[200px]">{p.description?.slice(0,50)}…</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-600 font-semibold">{p.category}</span></td>
                  <td className="px-5 py-3.5 text-sm text-zinc-600">{p.brand}</td>
                  <td className="px-5 py-3.5"><span className="text-sm font-semibold text-zinc-900">{p.priceLabel||'—'}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <button onClick={()=>onEdit(p)} className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-zinc-400 transition-colors"><Edit className="w-4 h-4"/></button>
                      <button onClick={()=>onDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-zinc-400 transition-colors"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0&&(
                <tr><td colSpan={5} className="py-20 text-center">
                  <Package className="w-10 h-10 text-zinc-200 mx-auto mb-3"/>
                  <p className="text-zinc-400 font-outfit text-sm">No products found</p>
                  <button onClick={onAdd} className="mt-3 text-xs font-outfit font-semibold text-amber-600 hover:text-amber-700 transition-colors">+ Add your first product</button>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-zinc-50">
          <p className="text-xs font-outfit text-zinc-400">{filtered.length} of {products.length} products</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [quotes, setQuotes]       = useState<any[]>([]);
  const [products, setProducts]   = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product|null>(null);

  const fetchQuotes = async () => {
    try {
      const q = query(collection(db,'quoteRequests'), orderBy('createdAt','desc'));
      const snap = await getDocs(q);
      setQuotes(snap.docs.map(d=>({id:d.id,...d.data()})));
    } catch(e){console.error(e);}
  };
  const fetchProducts = async () => {
    try {
      const snap = await getDocs(collection(db,'products'));
      setProducts(snap.docs.map(d=>({id:d.id,...d.data()} as Product)));
    } catch(e){console.error(e);}
  };

  useEffect(()=>{ if(isAdmin){fetchQuotes();fetchProducts();} },[isAdmin]);

  const handleStatusChange = async (id:string,status:string) => {
    await updateDoc(doc(db,'quoteRequests',id),{status});
    setQuotes(prev=>prev.map(q=>q.id===id?{...q,status}:q));
  };
  const handleSaveProduct = async (data:any, id:string|null) => {
    if(id) await updateDoc(doc(db,'products',id),{...data,updatedAt:serverTimestamp()});
    else    await addDoc(collection(db,'products'),{...data,createdAt:serverTimestamp()});
    fetchProducts();
  };
  const handleDeleteProduct = async (id:string) => {
    if(!window.confirm('Delete this product?')) return;
    await deleteDoc(doc(db,'products',id));
    setProducts(prev=>prev.filter(p=>p.id!==id));
  };

  if(authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex items-center gap-3 text-zinc-400 font-outfit">
        <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"/>
        Loading dashboard…
      </div>
    </div>
  );
  if(!isAdmin) return <Navigate to="/login"/>;

  const newCount = quotes.filter(q=>!q.status||q.status==='NEW').length;
  const TAB_TITLES: Record<string,string> = { overview:'Overview', quotes:'Quote Requests', products:'Products' };

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-screen sticky top-0">
        <SidebarContent active={activeTab} setActive={setActiveTab} closeMobile={()=>{}} newCount={newCount}/>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 bg-black/60 z-[140] lg:hidden" onClick={()=>setMobileNav(false)}/>
            <motion.div initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}}
              transition={{type:'tween',ease:'circOut',duration:0.3}}
              className="fixed top-0 left-0 h-full z-[150] lg:hidden">
              <SidebarContent active={activeTab} setActive={setActiveTab} closeMobile={()=>setMobileNav(false)} newCount={newCount}/>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={()=>setMobileNav(true)} className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-zinc-100 transition-colors">
              <Menu className="w-5 h-5 text-zinc-600"/>
            </button>
            <div>
              <h1 className="font-serif font-bold text-zinc-900 text-lg leading-none">{TAB_TITLES[activeTab]}</h1>
              <p className="text-xs font-outfit text-zinc-400 mt-0.5">
                {activeTab==='overview' && `${newCount} new requests need attention`}
                {activeTab==='quotes'   && `${quotes.length} total requests`}
                {activeTab==='products' && `${products.length} products in catalog`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-zinc-400"/>
              {newCount>0&&<span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">{newCount}</span>}
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
              <span className="text-xs font-bold text-white font-outfit">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}}>
              {activeTab==='overview' && <Overview quotes={quotes} products={products} setActive={setActiveTab}/>}
              {activeTab==='quotes'   && <QuotesTab quotes={quotes} onStatusChange={handleStatusChange}/>}
              {activeTab==='products' && (
                <ProductsTab products={products}
                  onEdit={p=>{setEditingProduct(p);setModalOpen(true);}}
                  onDelete={handleDeleteProduct}
                  onAdd={()=>{setEditingProduct(null);setModalOpen(true);}}/>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ProductModal open={modalOpen} onClose={()=>setModalOpen(false)} onSave={handleSaveProduct} editingProduct={editingProduct}/>
    </div>
  );
};
