import AxiosClient from "./base-client";

const PREFIX = "movie/";
const URL_TRENDING = PREFIX + "trending";
const URL_TRENDING_DAY = URL_TRENDING + "-day";
const URL_TRENDING_WEEK = URL_TRENDING + "-week";
const URL_SEARCH = PREFIX + "search";
const URL_CREDIT = "/credits";
const URL_REVIEWS = "/reviews";
const URL_TRAILER_POPULAR = PREFIX + "release-date-range";
const URL_TRAILER_NOW_PLAYING = PREFIX + "now-playing-trailers";
const URL_POPULAR = PREFIX + "popular";
const URL_TOP_RATED = PREFIX + "top_rated";
const URL_RECOMMENDED_MOVIES = PREFIX + "recommend";
const movieApi = {
  getDetails: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}`);
    return res.data;
  },

  getVideos: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}/videos`);
    return res.data;
  },

  getRecommendations: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${URL_RECOMMENDED_MOVIES}/${movieId}`);
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

  getNowPlayingTrailers: async () => {
    const res = await AxiosClient.get(URL_TRAILER_NOW_PLAYING);
    return res.data;
  },
  getPopularMovies: async () => {
    const res = await AxiosClient.get(URL_POPULAR);
    return res.data;
  },
  getTopRatedMovies: async () => {
    const res = await AxiosClient.get(URL_TOP_RATED);
    return res.data;
  },
};

export default movieApi;
