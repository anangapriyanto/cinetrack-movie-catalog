'use client';

import { useLanguage } from '@/presentation/contexts/LanguageContext';
import { Movie } from '@/core/entities/movie.entity';
import Link from 'next/link';
import SearchBar from './SearchBar';
import MovieGrid from './MovieGrid';

interface HomeContentProps {
  movies: Movie[];
}

export default function HomeContent({ movies }: HomeContentProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 pb-24 md:pb-0 animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-slate-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 p-8 md:p-12 border border-[var(--card-border)] shadow-md dark:shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10 hover:border-indigo-500/20">
        <div className="max-w-xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 animate-pulse">
            {t('hero_badge')}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {t('hero_title_1')} <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">{t('hero_title_2')}</span> {t('hero_title_3')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            {t('hero_desc')}
          </p>
          <SearchBar />
        </div>
      </div>

      {/* 2. SEKSI DAFTAR FILM (REAL DATA DARI TMDB) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">{t('trending_now')}</h2>
          <Link href="/discover" className="text-xs text-violet-600 dark:text-violet-400 hover:underline cursor-pointer font-medium transition-all hover:translate-x-1 inline-block">
            {t('see_all')}
          </Link>
        </div>

        {/* SYSTEM GRID YANG RESPONSIF VIA KOMPONEN MOVIEGRID */}
        <MovieGrid movies={movies} />
      </div>

    </div>
  );
}
