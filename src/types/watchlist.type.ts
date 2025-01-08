import { MovieDetail } from "./movie.type";

export type IWatchListReq = {
  name: string;
  description?: string;
  isPublic: boolean;
};

export type IWatchList = {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  movieIDs: string[];
};

export type IWatchListDetails = IWatchList & {
  movies: MovieDetail[];
  user: {
    id: string;
    username: string;
    email: string;
  };
};
