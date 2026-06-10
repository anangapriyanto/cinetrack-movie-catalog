import { GetDiscoveryMoviesUseCase } from '@/core/usecases/getDiscoveryMovies.usecase';
import { MovieRepositoryImpl } from '@/data/repositories/movie.repository.impl';
import { TMDBSource } from '@/data/sources/tmdb.source';
import MovieGrid from '@/presentation/components/MovieGrid';
import { Movie } from '@/core/entities/movie.entity';
import SearchBar from '@/presentation/components/SearchBar';

export const metadata = {
  title: 'Discovery - CineTrack',
  description: 'Discover the most popular movies right now.',
};

export default async function DiscoverPage() {
  const tmdbSource = new TMDBSource();
  const movieRepository = new MovieRepositoryImpl(tmdbSource);
  const getDiscoveryMovies = new GetDiscoveryMoviesUseCase(movieRepository);

  let movies: Movie[] = [];
  try {
    const fetchedMovies = await getDiscoveryMovies.execute(1);
    if (fetchedMovies && fetchedMovies.length > 0) {
      movies = fetchedMovies;
    }
  } catch {
    // Silent error handle
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
          Discovery
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore all the trending movies today.
        </p>
        <div className="max-w-xl">
          <SearchBar />
        </div>
      </div>
      <MovieGrid movies={movies} />
    </div>
  );
}
