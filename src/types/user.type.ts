export interface IFullUser {
  email: string;
  name: string;
  createdAt: string;
}

export interface IRegisterUserReq {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUserReq {
  email: string;
  password: string;
}

export interface ILoginUserRes extends IFullUser {
  accessToken: string;
  refreshToken: string;
}

export type AuthQueryConfig = {
  access_token?: string;
  refresh_token?: string;
};

export interface IResetPassword {
  token: string;
  password: string;
}
