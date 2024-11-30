import axios from "axios";
import { setupInterceptors } from "./interceptors";

const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
