'use client';

import { MovieDetails } from '@/core/entities/movie.entity';
import Image from 'next/image';
import Link from 'next/link';
import WatchlistButton from './WatchlistButton';
import { useLanguage } from '@/presentation/contexts/LanguageContext';

export default function MovieDetailsContent({ movie }: { movie: MovieDetails }) {
  const { t } = useLanguage();

  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="relative min-h-screen -mt-8 -mx-4 md:-mx-8 lg:-mx-8">
      {/* 1. BACKDROP RAKSASA */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[80vh] z-0">
        {movie.backdropPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`}
            alt={movie.title}
            fill
            className="object-cover opacity-30 dark:opacity-20 object-top"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-slate-900/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
      </div>

      {/* 2. KONTEN UTAMA */}
      <div className="relative z-10 pt-20 md:pt-40 px-4 md:px-8 max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/40 transition-all duration-300 mb-8 w-fit group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="w-48 md:w-72 shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20 dark:shadow-violet-900/30 border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="aspect-[3/4] relative bg-slate-800">
              {movie.posterPath ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                  {t('no_poster')}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl text-violet-600 dark:text-violet-400 font-medium italic drop-shadow-sm">
                  &quot;{movie.tagline}&quot;
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-3 py-1 rounded-lg border border-yellow-500/20">
                ⭐ {movie.voteAverage?.toFixed(1)} Rating
              </span>
              <span className="flex items-center gap-1 bg-slate-500/10 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg border border-slate-500/20">
                ⏱️ {formatRuntime(movie.runtime)}
              </span>
              <span className="flex items-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg border border-blue-500/20">
                📅 {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'Unknown'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {movie.genres.map(genre => (
                <span key={genre} className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {genre}
                </span>
              ))}
            </div>

            <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl font-bold mb-3">{t('overview')}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg max-w-3xl">
                {movie.overview || "No synopsis available for this movie."}
              </p>
            </div>

            <div className="pt-6 flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-1 cursor-pointer">
                {t('play_trailer')}
              </button>
              <WatchlistButton movieId={movie.id} title={movie.title} posterPath={movie.posterPath} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
