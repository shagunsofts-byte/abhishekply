import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SeoWrapper } from '../components/SeoWrapper';

export default function NotFoundPage() {
  return (
    <>
      <SeoWrapper title="Page Not Found | Abhishek Ply & Hardware" />
      <main className="relative w-full min-h-screen bg-zinc-50 text-zinc-950 flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-md">
          <span className="font-serif text-8xl font-bold text-amber-500/20 block mb-2">404</span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-3">
            This page has moved or doesn't exist
          </h1>
          <p className="text-zinc-500 font-inter mb-8 leading-relaxed">
            The page you're looking for isn't here. Head back home or browse our full product range.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-zinc-900 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-outfit font-medium transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/products"
              className="bg-white border border-zinc-200 hover:border-amber-400 text-zinc-900 px-6 py-3 rounded-full font-outfit font-medium transition-colors flex items-center justify-center gap-2"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
