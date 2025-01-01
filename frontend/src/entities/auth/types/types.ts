export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface ILoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
  isTwoFactor: boolean;
  error?: string;
}

export interface IRefreshResponse {
  access_token: string;
}
