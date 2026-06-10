export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
}

export interface MovieDetails extends Movie {
  genres: string[];
  runtime: number;
  status: string;
  tagline: string;
}
