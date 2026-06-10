'use client';

import { Movie } from '@/core/entities/movie.entity';
import Image from 'next/image';
import Link from 'next/link';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="border border-dashed border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl p-16 text-center shadow-xs">
        <span className="text-5xl block mb-4 animate-bounce">🤔</span>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">No Movies Found</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
          We couldn&apos;t find any movies matching your criteria. Try adjusting your search or come back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {movies.map((movie) => (
        <Link 
          href={`/movie/${movie.id}`}
          key={movie.id} 
          className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-violet-500/40 dark:hover:border-violet-400/40 transition-all duration-300 ease-out hover:-translate-y-2 cursor-pointer block"
        >
          {/* AREA POSTER FILM */}
          <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 w-full relative flex items-center justify-center text-slate-400 dark:text-slate-600 font-bold overflow-hidden">
            {movie.posterPath ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                fill
                className="object-cover z-10 transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <Image
                src="/images/no-poster.svg"
                alt={`No poster available for ${movie.title}`}
                fill
                className="object-cover z-10 transition-transform duration-500 group-hover:scale-110 opacity-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {/* Efek overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
          </div>
          
          {/* DETAIL UTAMA KARTU */}
          <div className="p-4 space-y-2 relative z-30">
            <h3 className="font-semibold text-sm tracking-tight truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200" title={movie.title}>
              {movie.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">⭐ {movie.voteAverage?.toFixed(1) || '0.0'}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-violet-500/10 group-hover:text-violet-500 transition-colors duration-300">
                {movie.releaseDate ? movie.releaseDate.substring(0, 4) : 'N/A'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
