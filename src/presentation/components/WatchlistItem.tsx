'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { updateWatchlistStatus, removeFromWatchlist } from '@/app/(main)/actions/watchlist.actions';
import { Watchlist } from '@prisma/client';
import { useLanguage } from '@/presentation/contexts/LanguageContext';

export default function WatchlistItem({ item }: { item: Watchlist }) {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(item.status);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLoading(true);
    setStatus(newStatus);
    await updateWatchlistStatus(item.id, newStatus);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (confirm(t('remove_confirm'))) {
      setLoading(true);
      await removeFromWatchlist(item.id);
      // Let Server Action's revalidatePath handle the UI update
    }
  };

  return (
    <div className={`group bg-(--card-bg) border border-(--card-border) rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* POSTER */}
      <Link href={`/movie/${item.movieId}`} className="w-24 md:w-32 shrink-0 bg-slate-800 relative block">
        {item.posterPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w200${item.posterPath}`}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">{t('no_poster')}</div>
        )}
      </Link>

      {/* DETAIL */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/movie/${item.movieId}`} className="font-bold text-lg hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            {item.title}
          </Link>
          <p className="text-xs text-slate-400 mt-1">
            {t('added_on')} {new Date(item.createdAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <select 
            value={status} 
            onChange={handleStatusChange}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer"
          >
            <option value="Plan to Watch">{t('plan_to_watch')}</option>
            <option value="Watching">{t('watching')}</option>
            <option value="Completed">{t('completed')}</option>
          </select>

          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </div>
  );
}
