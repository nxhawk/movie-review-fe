export type MovieType = "now_playing" | "popular" | "top_rated" | "upcoming";

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number | string;
  tmdb_id: number;
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
  keywords?: Keyword[];
  genres?: Genre[];
};

export type MovieDetail = Movie & {
  genres: Genre[];
  popularity: number;
  revenue?: number;
  budget?: number;
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

export type MovieCast = {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  title: string;
  overview: string;
  popularity: string;
  genre_ids: number[];

  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  media_type: "movie" | "tv";
};

export type MovieCrew = {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  title: string;
  overview: string;
  popularity: string;
  genre_ids: number[];

  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  department: string;
  job: string;
  media_type: "movie" | "tv";
};

export type MoviesOfActor = {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
};

export type CutCredit = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  character?: string;
  job?: string;
  department?: string;
  media_type: "movie" | "tv";
};

export type ListCutCredit = {
  name: string; // Group name
  credits: CutCredit[];
};

export type MovieReview = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type MovieTrailer = {
  id: number | string;
  tmdb_id: number;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  title: string;
  release_date: string;
  trailers: Video[];
};

export type Keyword = {
  id: number;
  name: string;
};
