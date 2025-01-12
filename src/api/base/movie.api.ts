import AxiosClient from "./base-client";

const PREFIX = "movie/";
const URL_TRENDING = PREFIX + "trending";
const URL_TRENDING_DAY = URL_TRENDING + "-day";
const URL_TRENDING_WEEK = URL_TRENDING + "-week";
const URL_SEARCH = PREFIX + "search";
const URL_CREDIT = "/credits";
const URL_REVIEWS = "/reviews";
const URL_TRAILER_POPULAR = PREFIX + "release-date-range";
const movieApi = {
  getDetails: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}`);
    return res.data;
  },

  getVideos: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}/videos`);
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

  getMovieCredit: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}${URL_CREDIT}`);
    return res.data;
  },

  getMovieByQuery: async (query: string, page: number) => {
    const res = await AxiosClient.get(`${URL_SEARCH}?query=${query}&page=${page}`);
    return res.data;
  },

  getReviews: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}${URL_REVIEWS}`);
    return res.data;
  },

  getReleaseDateRange: async () => {
    const res = await AxiosClient.get(URL_TRAILER_POPULAR);
    console.log(res);
    return res.data;
  },
};

export default movieApi;
