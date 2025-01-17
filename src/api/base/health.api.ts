import axios from "axios";

const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_ROOT,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 2000,
});

const PREFIX = "health/";

const healthApi = {
  getHealth: async () => {
    const res = await AxiosClient.get(PREFIX);
    return res.data;
  },
};

export default healthApi;
