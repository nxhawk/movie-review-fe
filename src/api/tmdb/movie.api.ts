import AxiosClient from "./tmdb-client";

const PREFIX = "tmdb/";
export const URL_MOVIE = PREFIX + "movie";
export const URL_TRENDING = PREFIX + "trending/movie";
export const URL_TRENDING_DAY = PREFIX + URL_TRENDING + "/day";
export const URL_TRENDING_WEEK = PREFIX + URL_TRENDING + "/week";
export const URL_SEARCH = PREFIX + "search/movie";

const movieApi = {
  getDetails: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${URL_MOVIE}/${movieId}`);
    return res.data;
  },

  getVideos: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${URL_MOVIE}/${movieId}/videos`);
    return res.data;
  },

  getTodayTrending: async () => {
    const res = await AxiosClient.get(URL_TRENDING_DAY);
    return res.data;
  },

  getThisWeekTrending: async () => {
    const res = await AxiosClient.get(URL_TRENDING_WEEK);
    return res.data;
  },

  getMovieByQuery: async (query: string, page: number) => {
    const res = await AxiosClient.get(`${URL_SEARCH}?query=${query}&page=${page}`);
    return res.data;
  },
};

export default movieApi;
