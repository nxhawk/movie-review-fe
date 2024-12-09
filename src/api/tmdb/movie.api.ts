import AxiosClient from "./tmdb-client";

const movieApi = {
  getDetails: async (movieId: string) => {
    const res = await AxiosClient.get(`/movie/${movieId}`);
    return res.data;
  },
  getVideos: async (movieId: number | string) => {
    const res = await AxiosClient.get(`/movie/${movieId}/videos`);
    return res.data;
  },

  getTodayTrending: async () => {
    const res = await AxiosClient.get("/trending/movie/day?language=en-US");
    return res.data;
  },

  getThisWeekTrending: async () => {
    const res = await AxiosClient.get("/trending/movie/week?language=en-US");
    return res.data;
  },

  getMovieByQuery: async (query: string, page: number) => {
    const res = await AxiosClient.get(`/search/movie?query=${query}&page=${page}`);
    return res.data;
  },
};

export default movieApi;
