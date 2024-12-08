import { ILoginUserReq, IRegisterUserReq, IResetPassword } from "../../types/user.type";
import AxiosClient from "./base-client";

const userApi = {
  login: async (data: ILoginUserReq) => {
    const res = await AxiosClient.post("/auth/login", data);
    return res.data;
  },
  forgotPassword: async (email: string) => {
    const res = await AxiosClient.post("/users/forgot-password", { email });
    return res.data;
  },
  apiResetPassword: async (data: IResetPassword) => {
    const res = await AxiosClient.post("/users/reset-password", data);
    return res.data;
  },
  register: async (data: IRegisterUserReq) => {
    const res = await AxiosClient.post("/auth/register", data);
    return res.data;
  },
  profile: async () => {
    const res = await AxiosClient.get("/auth/me");
    return res.data;
  },
  logout: async () => {
    const res = await AxiosClient.delete("/auth/logout");
    return res.data;
  },
  refreshToken: async (refreshToken: string) => {
    const res = await AxiosClient.post("/auth/refresh-token", {
      refreshToken,
    });
    return res.data;
  },
};

export default userApi;
