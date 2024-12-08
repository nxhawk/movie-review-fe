import axios from "axios";
import { setupInterceptors } from "./interceptors";

const AxiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_API_KEY}`,
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
