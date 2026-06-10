import { Movie } from "../entities/movie.entity";
import { MovieRepository } from "../repositories/movie.repository";

export class GetDiscoveryMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(page: number = 1): Promise<Movie[]> {
    try {
      return await this.movieRepository.getDiscoveryMovies(page);
    } catch (error) {
      console.error("Error executing GetDiscoveryMoviesUseCase:", error);
      throw error;
    }
  }
}
