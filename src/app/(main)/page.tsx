import HomeContent from '@/presentation/components/HomeContent';
import { GetDiscoveryMoviesUseCase } from '@/core/usecases/getDiscoveryMovies.usecase';
import { MovieRepositoryImpl } from '@/data/repositories/movie.repository.impl';
import { TMDBSource } from '@/data/sources/tmdb.source';
import { Movie } from '@/core/entities/movie.entity';

export default async function Home() {
  const tmdbSource = new TMDBSource();
  const movieRepository = new MovieRepositoryImpl(tmdbSource);
  const getDiscoveryMovies = new GetDiscoveryMoviesUseCase(movieRepository);

  let movies: Movie[] = [];
  try {
    const fetchedMovies = await getDiscoveryMovies.execute(1);
    if (fetchedMovies && fetchedMovies.length > 0) {
      movies = fetchedMovies.slice(0, 8);
    } else {
      movies = [
        { id: 1, title: "Mock Movie 1", overview: "", posterPath: null, backdropPath: null, releaseDate: "2024-01-01", voteAverage: 8.5 },
        { id: 2, title: "Mock Movie 2", overview: "", posterPath: null, backdropPath: null, releaseDate: "2024-02-01", voteAverage: 7.2 },
        { id: 3, title: "Mock Movie 3", overview: "", posterPath: null, backdropPath: null, releaseDate: "2024-03-01", voteAverage: 9.0 },
        { id: 4, title: "Mock Movie 4", overview: "", posterPath: null, backdropPath: null, releaseDate: "2024-04-01", voteAverage: 6.8 },
      ];
    }
  } catch {
    movies = [
      { id: 1, title: "Error Fetching 1", overview: "", posterPath: null, backdropPath: null, releaseDate: "2024-01-01", voteAverage: 0 },
      { id: 2, title: "Error Fetching 2", overview: "", posterPath: null, backdropPath: null, releaseDate: "2024-02-01", voteAverage: 0 },
    ];
  }

  return <HomeContent movies={movies} />;
}
