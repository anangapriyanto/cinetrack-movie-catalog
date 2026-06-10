'use client';

import { useLanguage } from '@/presentation/contexts/LanguageContext';
import WatchlistItem from '@/presentation/components/WatchlistItem';
import Link from 'next/link';
import { Watchlist } from '@prisma/client';

export default function WatchlistContent({ items }: { items: Watchlist[] }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
          {t('watchlist_title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('watchlist_manage')}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-(--card-border) bg-(--card-bg) rounded-2xl p-16 text-center shadow-xs">
          <span className="text-5xl block mb-4 animate-bounce">🎬</span>
          <h3 className="text-base font-semibold">{t('watchlist_empty')}</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed mb-6">
            {t('watchlist_empty_sub')}
          </p>
          <Link href="/discover" className="inline-block px-6 py-2 bg-violet-600 text-white font-medium rounded-full hover:bg-violet-700 transition-colors">
            {t('find_movie')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item) => (
            <WatchlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
