import AxiosClient from "./tmdb-client";

export const URL_PERSON = "person";

const personApi = {
  getDetails: async (personId: number | string) => {
    const res = await AxiosClient.get(`${URL_PERSON}/${personId}`);
    return res.data;
  },
};

export default personApi;
