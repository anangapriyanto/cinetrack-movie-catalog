'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { t } = useLanguage();

  // Sync state if URL changes (e.g. user hits back button)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      // Jika string kosong, arahkan ke halaman discover (get all item)
      router.push(`/discover`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="relative w-full max-w-lg mt-6"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-slate-400">🔍</span>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('search_placeholder')}
        className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-[var(--card-border)] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm font-medium dark:text-white placeholder:text-slate-400"
      />
      <button 
        type="submit"
        className="absolute inset-y-1.5 right-1.5 px-4 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-violet-500/20"
      >
        {t('search_button')}
      </button>
    </form>
  );
}
