import AxiosClient from "./tmdb-client";

export const URL_MOVIE = "movie";
export const URL_TRENDING = "trending/movie";
export const URL_TRENDING_DAY = URL_TRENDING + "/day";
export const URL_TRENDING_WEEK = URL_TRENDING + "/week";
export const URL_SEARCH = "search/movie";
export const URL_CREDIT = "/credits";
export const URL_RECOMMENDATIONS = "/recommendations";
export const URL_DISCOVER = "/discover/movie";
export const URL_GENRE = "/genre/movie/list";
export const URL_REVIEWS = "/reviews";

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

  getMovieCredit: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${URL_MOVIE}/${movieId}${URL_CREDIT}`);
    return res.data;
  },

  getRecommendations: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${URL_MOVIE}/${movieId}${URL_RECOMMENDATIONS}`);
    return res.data;
  },

  getMovieGenres: async () => {
    const res = await AxiosClient.get(URL_GENRE);
    return res.data;
  },

  getMovieByDiscover: async (params: any) => {
    const defaultParams = {
      language: "en-US",
      page: params.page || 1,
    };
    const mergedParams = { ...defaultParams, ...params };
    const res = await AxiosClient.get(`${URL_DISCOVER}`, { params: mergedParams });
    return res.data;
  },

  getReviews: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${URL_MOVIE}/${movieId}${URL_REVIEWS}`);
    return res.data;
  },
};

export default movieApi;
