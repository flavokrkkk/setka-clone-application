import { Response } from "express";
import { Tokens } from "../types/tokens.types";

export const createRtCookies = (res: Response, data: Tokens) => {
  res.cookie("refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const createAtCookies = (res: Response, data: Tokens) => {
  res.cookie("access_token", data.access_token, {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const removeRtCookies = (res: Response) => res.clearCookie("refresh_token", { httpOnly: true, secure: true, sameSite: "strict" });
export const removeAtCookies = (res: Response) => res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "strict" });
