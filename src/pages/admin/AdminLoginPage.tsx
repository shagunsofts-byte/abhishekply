import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, LogIn } from 'lucide-react';
import { auth } from '../../firebase_config';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/admin/quotes');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white mb-1">Admin Sign In</h1>
          <p className="text-sm text-zinc-500 font-inter">Abhishek Ply & Hardware — Quote Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs font-outfit text-zinc-400 mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-inter outline-none focus:border-amber-500"
              placeholder="admin@abhishekplyandhardware.com"
            />
          </div>
          <div>
            <label className="text-xs font-outfit text-zinc-400 mb-1.5 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-inter outline-none focus:border-amber-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-inter">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 py-3 rounded-full font-outfit font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <LogIn className="w-4 h-4" /> {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-600 font-inter mt-6">
          This area is restricted to store administrators.
        </p>
      </div>
    </main>
  );
}
