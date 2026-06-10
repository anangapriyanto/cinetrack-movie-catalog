const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// We'll require the user to set this in .env.local
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export class TMDBSource {
  private async fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
    if (!TMDB_API_KEY) {
      console.warn("⚠️ TMDB_API_KEY is not defined. Returning mock data instead of calling API.");
      return { results: [] };
    }

    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      ...params,
    });

    const url = `${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Next.js specific caching options can go here
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getDiscoveryMovies(page: number = 1) {
    return this.fetchFromTMDB("/discover/movie", {
      page: page.toString(),
      sort_by: "popularity.desc",
      include_adult: "false",
      include_video: "false",
    });
  }

  async searchMovies(query: string, page: number = 1) {
    return this.fetchFromTMDB("/search/movie", {
      query,
      page: page.toString(),
      include_adult: "false",
    });
  }

  async getMovieDetails(id: number) {
    if (!TMDB_API_KEY) {
      console.warn("⚠️ TMDB_API_KEY is not defined. Returning mock movie details.");
      return {
        id,
        title: "Mock Movie Details (No API Key)",
        overview: "Ini adalah data simulasi karena Anda belum memasukkan TMDB_API_KEY di file .env.local. Film ini menceritakan tentang perjalanan seorang developer Next.js yang sedang belajar membangun aplikasi memukau dengan standar Clean Architecture. Ia menghadapi berbagai tantangan koding, namun dengan ketekunan, ia berhasil menciptakan mahakarya visual.",
        poster_path: null,
        backdrop_path: null,
        release_date: "2024-06-09",
        vote_average: 9.9,
        genres: [{ id: 1, name: "Action" }, { id: 2, name: "Sci-Fi" }, { id: 3, name: "Drama" }],
        runtime: 145,
        status: "Released",
        tagline: "Coding is an Art. Clean Architecture is the Canvas."
      };
    }

    return this.fetchFromTMDB(`/movie/${id}`);
  }
}
