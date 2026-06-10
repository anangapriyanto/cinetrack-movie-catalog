import { Movie, MovieDetails } from "../entities/movie.entity";

export interface MovieRepository {
  getDiscoveryMovies(page?: number): Promise<Movie[]>;
  searchMovies(query: string, page?: number): Promise<Movie[]>;
  getMovieById(id: number): Promise<MovieDetails | null>;
}
