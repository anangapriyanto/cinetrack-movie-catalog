import { MovieDetails } from "../entities/movie.entity";
import { MovieRepository } from "../repositories/movie.repository";

export class GetMovieDetailsUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: number): Promise<MovieDetails | null> {
    try {
      return await this.movieRepository.getMovieById(id);
    } catch (error) {
      console.error("Error executing GetMovieDetailsUseCase:", error);
      throw error;
    }
  }
}
