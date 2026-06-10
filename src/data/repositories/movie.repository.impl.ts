import { Movie, MovieDetails } from "@/core/entities/movie.entity";
import { MovieRepository } from "@/core/repositories/movie.repository";
import { TMDBSource } from "../sources/tmdb.source";

export class MovieRepositoryImpl implements MovieRepository {
  constructor(private tmdbSource: TMDBSource) {}

  // Helper method to map TMDB response format to our Domain Entity
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToMovieEntity(tmdbMovie: any): Movie {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      overview: tmdbMovie.overview,
      posterPath: tmdbMovie.poster_path,
      backdropPath: tmdbMovie.backdrop_path,
      releaseDate: tmdbMovie.release_date,
      voteAverage: tmdbMovie.vote_average,
    };
  }

  async getDiscoveryMovies(page?: number): Promise<Movie[]> {
    const data = await this.tmdbSource.getDiscoveryMovies(page);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.results.map((movie: any) => this.mapToMovieEntity(movie));
  }

  async searchMovies(query: string, page?: number): Promise<Movie[]> {
    const data = await this.tmdbSource.searchMovies(query, page);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.results.map((movie: any) => this.mapToMovieEntity(movie));
  }

  async getMovieById(id: number): Promise<MovieDetails | null> {
    try {
      const data = await this.tmdbSource.getMovieDetails(id);
      
      // Jika data error/mock (karena nggak ada API Key), TMDBSource mengembalikan { results: [] }
      if (!data || data.results) {
         return null;
      }

      return {
        ...this.mapToMovieEntity(data),
        genres: data.genres?.map((g: { name: string }) => g.name) || [],
        runtime: data.runtime || 0,
        status: data.status || 'Unknown',
        tagline: data.tagline || '',
      };
    } catch (error) {
      console.error(`Failed to fetch movie details for ID ${id}:`, error);
      return null;
    }
  }
}
