import { IRatingReq } from "../../types/rating.type";
import AxiosClient from "./base-client";

const PREFIX = "rating/";
const URL_AVERAGE = "average";

const ratingApi = {
  getRatedMovies: async () => {
    const res = await AxiosClient.get(`${PREFIX}`);
    return res.data;
  },

  getAverageRating: async () => {
    const res = await AxiosClient.get(`${PREFIX}${URL_AVERAGE}`);
    return res.data;
  },

  updateRating: async (movieId: number | string, ratingReq: IRatingReq) => {
    const res = await AxiosClient.post(`${PREFIX}${movieId}`, ratingReq);
    return res.data;
  },

  getRating: async (movieId: number | string) => {
    const res = await AxiosClient.get(`${PREFIX}${movieId}`);
    return res.data;
  },
};

export default ratingApi;
