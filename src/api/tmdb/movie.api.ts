import AxiosClient from "./tmdb-client";

export const apiGetDetailMovie = async (movieId: string) => {
  const res = await AxiosClient.get(`/movie/${movieId}`);
  return res.data;
};
