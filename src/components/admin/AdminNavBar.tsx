import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut, User } from 'firebase/auth';
import { LogOut, Download, CheckCircle2 } from 'lucide-react';
import { auth } from '../../firebase_config';
import { useAdminInstallPrompt } from '../../hooks/useAdminInstallPrompt';

interface AdminNavBarProps {
  user: User | null | undefined;
  title: string;
  right?: React.ReactNode;
}

export const AdminNavBar: React.FC<AdminNavBarProps> = ({ user, title, right }) => {
  const location = useLocation();
  const { canInstall, isStandalone, promptInstall } = useAdminInstallPrompt();

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
          {canInstall && (
            <button
              onClick={promptInstall}
              className="flex items-center gap-1.5 text-sm font-outfit font-medium px-3.5 py-1.5 rounded-full bg-espresso-950 text-brass-400 hover:bg-espresso-900 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Install App
            </button>
          )}
          {isStandalone && (
            <span className="flex items-center gap-1.5 text-xs font-outfit text-stone-400" title="Running as an installed app">
              <CheckCircle2 className="w-3.5 h-3.5" /> App
            </span>
          )}
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
