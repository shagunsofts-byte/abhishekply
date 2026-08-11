import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { LogOut, Phone, Package, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { auth, db } from '../../firebase_config';

interface QuoteRequestDoc {
  id: string;
  customerName?: string;
  customerPhone?: string;
  status?: string;
  createdAt?: Timestamp;
  items?: { productId: string; name: string; brand: string; qty: number }[];
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-50 text-amber-700 border-amber-200',
  contacted: 'bg-blue-50 text-blue-700 border-blue-200',
  closed: 'bg-zinc-100 text-zinc-500 border-zinc-200',
};

export default function AdminQuotesPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [requests, setRequests] = useState<QuoteRequestDoc[]>([]);
  const [permissionError, setPermissionError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) navigate('/admin/login');
    });
    return () => unsub();
  }, [navigate]);

  // Live quote requests feed
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'quoteRequests'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuoteRequestDoc)));
        setPermissionError(false);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setPermissionError(true);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [user]);

  const markStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'quoteRequests', id), { status });
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const newCount = requests.filter((r) => (r.status || 'new') === 'new').length;

  if (user === undefined || loading) {
    return (
      <main className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-serif text-xl font-bold text-zinc-900">Quote Requests</h1>
          <p className="text-xs text-zinc-500 font-inter">{user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          {newCount > 0 && (
            <span className="bg-amber-500 text-zinc-950 text-xs font-outfit font-bold px-3 py-1.5 rounded-full">
              {newCount} New
            </span>
          )}
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-1.5 text-sm font-outfit text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {permissionError ? (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">Access denied</h3>
            <p className="text-sm text-zinc-500 font-inter max-w-md mx-auto">
              Your account ({user?.email}) is signed in but isn't marked as an admin yet. Ask the site owner to set
              your Firestore <code className="bg-zinc-100 px-1.5 py-0.5 rounded">users/{'{uid}'}</code> document's{' '}
              <code className="bg-zinc-100 px-1.5 py-0.5 rounded">role</code> field to{' '}
              <code className="bg-zinc-100 px-1.5 py-0.5 rounded">"admin"</code> via the Firebase console.
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center">
            <Package className="w-8 h-8 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-1">No quote requests yet</h3>
            <p className="text-sm text-zinc-500 font-inter">
              New requests submitted from the "Add to Quote" cart on the site will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="bg-white border border-zinc-200 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <h4 className="font-outfit font-semibold text-zinc-900">{r.customerName || 'Not provided'}</h4>
                    {r.customerPhone && r.customerPhone !== 'Not provided' && (
                      <a
                        href={`tel:${r.customerPhone}`}
                        className="text-sm text-zinc-500 font-inter flex items-center gap-1.5 mt-0.5 hover:text-amber-600"
                      >
                        <Phone className="w-3.5 h-3.5" /> {r.customerPhone}
                      </a>
                    )}
                  </div>
                  <span
                    className={`text-xs font-outfit font-medium px-3 py-1 rounded-full border ${
                      STATUS_STYLES[r.status || 'new']
                    }`}
                  >
                    {r.status || 'new'}
                  </span>
                </div>

                <div className="border-t border-zinc-100 pt-3 mb-3">
                  <ul className="space-y-1.5">
                    {(r.items || []).map((item, idx) => (
                      <li key={idx} className="text-sm font-inter text-zinc-700 flex items-center justify-between">
                        <span>
                          {item.name} <span className="text-zinc-400">— {item.brand}</span>
                        </span>
                        <span className="text-zinc-500 font-outfit">x{item.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-inter flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString('en-IN') : '—'}
                  </span>
                  <div className="flex gap-2">
                    {r.status !== 'contacted' && (
                      <button
                        onClick={() => markStatus(r.id, 'contacted')}
                        className="text-xs font-outfit font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        Mark Contacted
                      </button>
                    )}
                    {r.status !== 'closed' && (
                      <button
                        onClick={() => markStatus(r.id, 'closed')}
                        className="text-xs font-outfit font-medium px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
