import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { removeAllToken } from "../../../utils/helper";
import userApi from "../user.api";

interface IRequestAxios extends InternalAxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = (config: IRequestAxios) => {
  if (!config.headers["Authorization"]) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  config.timeout = 30000;
  return config;
};

const onResponseError = async (err: AxiosError, axiosInstance: AxiosInstance): Promise<AxiosError | undefined> => {
  const originalConfig = err.config as InternalAxiosRequestConfig;
  if (err.response?.status === 401) {
    const currentRefreshToken = localStorage.getItem("refreshToken");
    removeAllToken();
    if (!currentRefreshToken) {
      if (window.location.pathname == "/login") return Promise.reject(err?.response?.data);
      return Promise.reject(err?.response?.data);
    }

    try {
      const token = await userApi.refreshToken(currentRefreshToken!);
      localStorage.setItem("accessToken", token.data.accessToken);
      localStorage.setItem("refreshToken", currentRefreshToken);
      originalConfig.headers.Authorization = `Bearer ${token.data.accessToken}`;
    } catch (error) {
      localStorage.removeItem("auth");
      if (window.location.pathname == "/login") return Promise.reject(err?.response?.data);
      return Promise.reject(err?.response?.data);
    }

    return axiosInstance(originalConfig);
  }
  return Promise.reject(err?.response?.data);
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  if (res?.data?.status === "error") throw new Error(res?.data?.message || "Internal Server Error");
  return res;
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) => onResponseError(err, axiosInstance));
};
