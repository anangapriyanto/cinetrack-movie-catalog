'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/presentation/contexts/LanguageContext';
import { useAuth } from '@/presentation/contexts/AuthContext';
import SettingsModal from './SettingsModal';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: t('discovery'), path: '/', icon: '🏠' },
    { name: t('my_watchlist'), path: '/watchlist', icon: '🔥' },
  ];

  return (
    <>
      {/* 1. TOP BAR KHUSUS LAYAR HP */}
      <div className="md:hidden w-full bg-[var(--sidebar-bg)] border-b border-[var(--card-border)] p-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          CINETRACK
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xl"
          aria-label="Toggle Menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. SIDEBAR UTAMA */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[var(--sidebar-bg)] border-r border-[var(--card-border)] p-6 flex flex-col justify-between
        transform transition-transform duration-300 md:translate-x-0 md:sticky md:h-screen md:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-8">
          {/* LOGO BRAND */}
          <div className="px-2 flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                CINE<span className="text-violet-500 dark:text-indigo-400">TRACK</span>
              </Link>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 font-semibold">{t('pro_edition')}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-lg">✕</button>
          </div>

          {/* NAVIGASI MENU DINAMIS */}
          <nav className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-3">{t('menu_utama')}</p>
            
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link 
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition duration-200 group ${
                    active 
                      ? 'bg-gradient-to-r from-violet-600/10 to-indigo-600/10 dark:from-violet-600/20 dark:to-indigo-600/20 text-violet-600 dark:text-violet-400 border border-violet-500/20 dark:border-violet-500/30 shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className={active ? 'scale-110' : 'group-hover:scale-110 transition-transform'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BAGIAN BAWAH SIDEBAR: USER MENU DROPDOWN */}
        <div className="border-t border-[var(--card-border)] pt-4 relative">
          
          {/* ISI DROPDOWN MENU */}
          <div className={`
            absolute bottom-full mb-2 left-0 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-2 shadow-xl 
            transform origin-bottom transition-all duration-200 ease-out
            ${isUserMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}
          `}>
            {/* TOMBOL PENGATURAN */}
            <button 
              onClick={() => {
                setIsSettingsOpen(true);
                setIsUserMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 font-medium transition-colors text-sm"
            >
              <span>⚙️</span>
              <span>{t('settings')}</span>
            </button>

            {/* TOMBOL LOGOUT */}
            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium transition-colors text-sm cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>{t('sign_out')}</span>
            </button>
          </div>

          {/* TOMBOL PROFILE/TOGGLE */}
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 border border-transparent 
              ${isUserMenuOpen ? 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'}
            `}
          >
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-sm">
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
              <div className="text-left">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">
                  {user?.name ?? 'Guest'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{t('free_plan')}</p>
              </div>
            </div>
            <span className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
        </div>
      </aside>

      {/* MODAL PENGATURAN */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}