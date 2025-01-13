import AxiosClient from "./base-client";

const PREFIX = "llm/";
const URL_NAVIGATE = PREFIX + "navigate";
const URL_SEARCH = PREFIX + "search";

const llmApi = {
  getRouteNavigate: async (query: string) => {
    const res = await AxiosClient.get(URL_NAVIGATE, { params: { query } });
    return res.data;
  },
  searchMovie: async (query: string, amount: number = 20, threshold: number = 0.5) => {
    const res = await AxiosClient.get(URL_SEARCH, { params: { query, amount, threshold } });
    return res.data;
  },
};

export default llmApi;
