import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut, User } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { auth } from '../../firebase_config';

interface AdminNavBarProps {
  user: User | null | undefined;
  title: string;
  right?: React.ReactNode;
}

export const AdminNavBar: React.FC<AdminNavBarProps> = ({ user, title, right }) => {
  const location = useLocation();

  const tabs = [
    { label: 'Quote Requests', to: '/admin/quotes' },
    { label: 'Products', to: '/admin/products' },
  ];

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
      <div className="px-6 pt-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-xl font-bold text-stone-900">{title}</h1>
          <p className="text-xs text-stone-500 font-inter">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {right}
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-1.5 text-sm font-outfit text-stone-500 hover:text-stone-900 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
      <nav className="px-6 mt-4 flex items-center gap-6">
        {tabs.map((tab) => {
          const active = location.pathname.startsWith(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`text-sm font-outfit font-medium pb-3 border-b-2 transition-colors ${
                active ? 'border-brass-500 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
