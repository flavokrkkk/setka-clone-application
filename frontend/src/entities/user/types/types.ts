export const enum UserRole {
  Regular = "REGULAR",
  Admin = "ADMIN",
}

export const enum AuthMethod {
  Credentials = "CREDENTIALS",
  Google = "GOOGLE",
  Yandex = "YANDEX",
}

export interface IAccount {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  provider: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  userId: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  picture: string;
  isVerified: true;
  isTwoFactorEnabled: false;
}
