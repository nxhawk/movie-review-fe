import AxiosClient from "./base-client";

const movieApi = {
  getDetails: async (movieId: string) => {
    const res = await AxiosClient.get(`/tmdb/movie/${movieId}`);
    return res.data;
  },

  getVideos: async (movieId: number | string) => {
    const res = await AxiosClient.get(`/tmdb/movie/${movieId}/videos`);
    return res.data;
  },

  getTodayTrending: async () => {
    const res = await AxiosClient.get("/tmdb/trending/movie/day");
    return res.data;
  },

  getThisWeekTrending: async () => {
    const res = await AxiosClient.get("/tmdb/trending/movie/week");
    return res.data;
  },

  getMovieByQuery: async (query: string, page: number) => {
    const res = await AxiosClient.get(`/tmdb/search/movie?query=${query}&page=${page}`);
    return res.data;
  },
};

export default movieApi;
