import AxiosClient from "./tmdb-client";

export const URL_MOVIE = "movie";
export const URL_TRENDING = "trending/movie";
export const URL_TRENDING_DAY = URL_TRENDING + "/day";
export const URL_TRENDING_WEEK = URL_TRENDING + "/week";
export const URL_SEARCH = "search/movie";

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
