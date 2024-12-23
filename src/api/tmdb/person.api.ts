import AxiosClient from "./tmdb-client";

export const URL_PERSON = "person";
export const URL_CREDITS = "combined_credits";

const personApi = {
  getDetails: async (personId: number | string) => {
    const res = await AxiosClient.get(`${URL_PERSON}/${personId}`);
    return res.data;
  },

  getCredits: async (personId: number | string) => {
    const res = await AxiosClient.get(`${URL_PERSON}/${personId}/${URL_CREDITS}`);
    return res.data;
  },
};

export default personApi;
