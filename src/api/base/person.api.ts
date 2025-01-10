import AxiosClient from "./base-client";

export const URL_PERSON = "person";
export const URL_CREDITS = "credits";
export const URL_SEARCH = URL_PERSON + "/search";

const personApi = {
  getDetails: async (personId: number | string) => {
    const res = await AxiosClient.get(`${URL_PERSON}/${personId}`);
    return res.data;
  },

  getCredits: async (personId: number | string) => {
    const res = await AxiosClient.get(`${URL_PERSON}/${personId}/${URL_CREDITS}`);
    return res.data;
  },

  getPeopleByQuery: async (query: string, page: number) => {
    const res = await AxiosClient.get(`${URL_SEARCH}?query=${query}&page=${page}`);
    return res.data;
  },
};

export default personApi;
