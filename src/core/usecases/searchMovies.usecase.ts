import { Movie } from "../entities/movie.entity";
import { MovieRepository } from "../repositories/movie.repository";

export class SearchMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(query: string, page: number = 1): Promise<Movie[]> {
    if (!query.trim()) return [];
    
    try {
      return await this.movieRepository.searchMovies(query, page);
    } catch (error) {
      console.error("Error executing SearchMoviesUseCase:", error);
      throw error;
    }
  }
}
