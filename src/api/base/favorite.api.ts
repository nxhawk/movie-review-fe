import AxiosClient from "./base-client";

const PREFIX = "favorite-list/";

const favoriteApi = {
  getFavoriteList: async () => {
    const res = await AxiosClient.get(PREFIX);
    return res.data;
  },

  addFavorite: async (movieId: number | string) => {
    const res = await AxiosClient.post(`${PREFIX}${movieId}`);
    return res.data;
  },

  removeFavorite: async (movieId: number | string) => {
    const res = await AxiosClient.delete(`${PREFIX}${movieId}`);
    return res.data;
  },

  checkFavorite: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}`);
    return res.data;
  },
};

export default favoriteApi;
