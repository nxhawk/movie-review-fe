import { MovieDetail } from "./movie.type";

export type IRatingReq = {
  rating: number;
  mood: number[];
};

export type IRatingRes = {
  id: string;
  rating: number;
  mood: number[];
  movies?: MovieDetail;
};

export type IRated = IRatingRes & {
  movie: MovieDetail;
};
