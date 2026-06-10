'use client';

import { useState } from 'react';
import { addToWatchlist } from '@/app/(main)/actions/watchlist.actions';
import { useLanguage } from '@/presentation/contexts/LanguageContext';

interface WatchlistButtonProps {
  movieId: number;
  title: string;
  posterPath: string | null;
}

export default function WatchlistButton({ movieId, title, posterPath }: WatchlistButtonProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleAdd = async () => {
    setLoading(true);
    setStatus('idle');
    try {
      const res = await addToWatchlist({ movieId, title, posterPath });
      setStatus(res.success ? 'success' : 'error');
      setMessage(res.success ? t('add_success') : t('movie_exists'));
      
      if (res.success) {
        setTimeout(() => setStatus('idle'), 3000); // hilangkan notifikasi sukses setelah 3 detik
      }
    } catch {
      setStatus('error');
      setMessage(t('error_occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button 
        onClick={handleAdd}
        disabled={loading}
        className="px-8 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
      >
        {loading ? t('adding') : t('add_to_watchlist')}
      </button>

      {/* Notification Toast Mini */}
      {status !== 'idle' && (
        <div className={`absolute top-full mt-2 left-0 w-max px-4 py-2 rounded-lg text-xs font-medium animate-fade-in-up ${status === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
