import { IResetPassword } from "../../types/user.type";
import AxiosClient from "./base-client";

const PREFIX = "users/";
const URL_FORGOTPASSWORD = PREFIX + "forgot-password";
const URL_RESETPASSWORD = PREFIX + "reset-password";

const userApi = {
  forgotPassword: async (email: string) => {
    const res = await AxiosClient.post(URL_FORGOTPASSWORD, { email });
    return res.data;
  },
  resetPassword: async (data: IResetPassword) => {
    const res = await AxiosClient.post(URL_RESETPASSWORD, data);
    return res.data;
  },
};

export default userApi;
