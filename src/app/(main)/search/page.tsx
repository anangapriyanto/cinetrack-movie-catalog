import { SearchMoviesUseCase } from '@/core/usecases/searchMovies.usecase';
import { MovieRepositoryImpl } from '@/data/repositories/movie.repository.impl';
import { TMDBSource } from '@/data/sources/tmdb.source';
import MovieGrid from '@/presentation/components/MovieGrid';
import { Movie } from '@/core/entities/movie.entity';
import SearchBar from '@/presentation/components/SearchBar';

export const metadata = {
  title: 'Search Results - CineTrack',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';

  let movies: Movie[] = [];

  if (query) {
    const tmdbSource = new TMDBSource();
    const movieRepository = new MovieRepositoryImpl(tmdbSource);
    const searchMovies = new SearchMoviesUseCase(movieRepository);

    try {
      const fetchedMovies = await searchMovies.execute(query, 1);
      if (fetchedMovies && fetchedMovies.length > 0) {
        movies = fetchedMovies;
      }
    } catch {
      // Silent error handle
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-[var(--card-border)]">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
          {query ? (
            <>
              Search Results for <span className="text-violet-600 dark:text-violet-400">&quot;{query}&quot;</span>
            </>
          ) : (
            'Search Movies'
          )}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Find your next favorite film.
        </p>
        <div className="max-w-xl">
          <SearchBar />
        </div>
      </div>

      {query ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="text-center py-20 text-slate-500">
          Please enter a movie title to search.
        </div>
      )}
    </div>
  );
}
