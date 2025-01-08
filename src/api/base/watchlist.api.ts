import { IWatchListReq } from "../../types/watchlist.type";
import AxiosClient from "./base-client";

const PREFIX = "watch-list/";
const URL_NEW = "new";

const watchlistApi = {
  getAllWatchlist: async () => {
    const res = await AxiosClient.get(PREFIX);
    return res.data;
  },

  getDetails: async (id: string) => {
    const res = await AxiosClient.get(PREFIX + id);
    return res.data;
  },

  createNewWatchlist: async (data: IWatchListReq) => {
    const res = await AxiosClient.post(PREFIX + URL_NEW, data);
    return res.data;
  },
};

export default watchlistApi;
