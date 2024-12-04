import { ILoginUserReq, IRegisterUserReq, IResetPassword } from "../types/user";
import AxiosClient from "./axios";

export const login = async (data: ILoginUserReq) => {
  const res = await AxiosClient.post("/auth/login", data);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await AxiosClient.post("/users/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (data: IResetPassword) => {
  const res = await AxiosClient.post("/users/reset-password", data);
  return res.data;
};

export const register = async (data: IRegisterUserReq) => {
  const res = await AxiosClient.post("/auth/register", data);
  return res.data;
};

export const profile = async () => {
  const res = await AxiosClient.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  const res = await AxiosClient.delete("/auth/logout");
  return res.data;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await AxiosClient.post("/auth/refresh-token", {
    refreshToken,
  });
  return res.data;
};
