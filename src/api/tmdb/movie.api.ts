import AxiosClient from "./tmdb-client";

const movieApi = {
  getDetails: async (movieId: number | string) => {
    const res = await AxiosClient.get(`/movie/${movieId}`);
    return res.data;
  },
  getVideos: async (movieId: number | string) => {
    const res = await AxiosClient.get(`/movie/${movieId}/videos`);
    return res.data;
  },
};

export default movieApi;
