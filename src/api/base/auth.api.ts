import { ILoginUserReq, IRegisterUserReq } from "../../types/user.type";
import AxiosClient from "./base-client";

const PREFIX = "auth/";
export const URL_SIGNIN = PREFIX + "login";
export const URL_SIGNUP = PREFIX + "register";
export const URL_SIGNOUT = PREFIX + "logout";
export const URL_GETME = PREFIX + "me";
export const URL_REFRESH_TOKEN = PREFIX + "refresh-token";
export const URL_RESEND_CONFIRM_EMAIL = PREFIX + "resend-confirm-email";

const authApi = {
  login: async (data: ILoginUserReq) => {
    const res = await AxiosClient.post(URL_SIGNIN, data);
    return res.data;
  },
  register: async (data: IRegisterUserReq) => {
    const res = await AxiosClient.post(URL_SIGNUP, data);
    return res.data;
  },
  resendEmailVerify: async (email: string) => {
    const res = await AxiosClient.post(URL_RESEND_CONFIRM_EMAIL, { email });
    return res.data;
  },
  profile: async () => {
    const res = await AxiosClient.get(URL_GETME);
    return res.data;
  },
  logout: async () => {
    const res = await AxiosClient.delete(URL_SIGNOUT);
    return res.data;
  },
  refreshToken: async (refreshToken: string) => {
    const res = await AxiosClient.post(URL_REFRESH_TOKEN, {
      refreshToken,
    });
    return res.data;
  },
};

export default authApi;
