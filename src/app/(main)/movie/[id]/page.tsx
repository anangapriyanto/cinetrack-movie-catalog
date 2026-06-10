import { GetMovieDetailsUseCase } from '@/core/usecases/getMovieDetails.usecase';
import { MovieRepositoryImpl } from '@/data/repositories/movie.repository.impl';
import { TMDBSource } from '@/data/sources/tmdb.source';
import Link from 'next/link';
import MovieDetailsContent from '@/presentation/components/MovieDetailsContent';

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.id, 10);

  const tmdbSource = new TMDBSource();
  const movieRepository = new MovieRepositoryImpl(tmdbSource);
  const getMovieDetails = new GetMovieDetailsUseCase(movieRepository);

  const movie = await getMovieDetails.execute(movieId);

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fade-in">
        <span className="text-6xl">🎥</span>
        <h1 className="text-2xl font-bold">Movie Not Found</h1>
        <p className="text-slate-500">We couldn&apos;t find the details for this movie.</p>
        <Link
          href="/"
          className="px-6 py-2 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return <MovieDetailsContent movie={movie} />;
}
