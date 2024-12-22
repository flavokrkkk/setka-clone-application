import { ERouteNames } from "@/shared/utils/routes/path";

export const enum EAuthModes {
  REGISTER,
  LOGIN,
  RESET,
  NEW,
}

export const navigateAuthText: Record<
  EAuthModes,
  { hasAccount: string; navigate: string; path: ERouteNames }
> = {
  [EAuthModes.LOGIN]: {
    hasAccount: "Нет аккаунта?",
    navigate: "Зарегестрироваться",
    path: ERouteNames.REGISTER,
  },
  [EAuthModes.REGISTER]: {
    hasAccount: "Уже есть аккаунт?",
    navigate: "Войти",
    path: ERouteNames.LOGIN,
  },
  [EAuthModes.RESET]: {
    hasAccount: "",
    navigate: "",
    path: ERouteNames.LOGIN,
  },
  [EAuthModes.NEW]: {
    hasAccount: "",
    navigate: "",
    path: ERouteNames.LOGIN,
  },
};
