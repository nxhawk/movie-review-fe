import { MovieDetail } from "./movie.type";

export type IListFavorite = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  movies: MovieDetail[];
};
