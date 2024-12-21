import axios from "axios";
import { setupInterceptors } from "./interceptors";
import defaultCast from "../../../assets/images/default_cast.jpg";
import defaultMovie from "../../../assets/images/default_movie.jpg";

export const tmdbConfig = {
  baseURL: "https://api.themoviedb.org/3",
  imageOriginalURL: "https://image.tmdb.org/t/p/original",
  imageW500URL: "https://image.tmdb.org/t/p/w500",
  imageW200URL: "https://image.tmdb.org/t/p/w200",
  imageW58URL: "https://image.tmdb.org/t/p/w58_and_h87_face",
  defaultCastImg: defaultCast,
  defaultMovieImg: defaultMovie,
  apiKey: import.meta.env.VITE_THEMOVIEDB_API_KEY,
};

const AxiosClient = axios.create({
  baseURL: tmdbConfig.baseURL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${tmdbConfig.apiKey}`,
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
