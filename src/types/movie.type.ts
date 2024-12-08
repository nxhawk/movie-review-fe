export type MovieType = "now_playing" | "popular" | "top_rated" | "upcoming";

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  title: string;
  overview: string;
  release_date: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetail = Movie & {
  genres: Genre[];
  popularity: number;
  revenue: number;
  status: string;
  runtime: number;
};

export type Video = {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};
