import { IWatchListReq } from "../../types/watchlist.type";
import AxiosClient from "./base-client";

const PREFIX = "watch-list/";
const URL_NEW = "new";
const URL_ADD = "add";

const watchlistApi = {
  getAllWatchlist: async () => {
    const res = await AxiosClient.get(PREFIX);
    return res.data;
  },

  getDetails: async (id: string) => {
    const res = await AxiosClient.get(PREFIX + id);
    return res.data;
  },

  updateWatchlist: async (id: string, data: IWatchListReq) => {
    const res = await AxiosClient.put(PREFIX + id, data);
    return res.data;
  },

  createNewWatchlist: async (data: IWatchListReq) => {
    const res = await AxiosClient.post(PREFIX + URL_NEW, data);
    return res.data;
  },

  deleteWatchlist: async (id: string) => {
    const res = await AxiosClient.delete(PREFIX + id);
    return res.data;
  },

  addMovieToWatchlist: async (movieId: string, watchListId: string) => {
    const res = await AxiosClient.post(PREFIX + URL_ADD, {
      movieId,
      watchListId,
    });
    return res.data;
  },
};

export default watchlistApi;
