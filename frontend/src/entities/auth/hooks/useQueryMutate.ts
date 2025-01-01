import {
  TypeLoginSchema,
  TypeNewPasswordSchema,
  TypeRegisterSchema,
} from "@/features/auth/schemes";
import { useMutation } from "@tanstack/react-query";
import { authService, verificateService } from "../libs";
import { toastMessageHandler, toastSuccesHandler } from "@/shared/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ERouteNames } from "@/shared/utils/routes/path";
import { useRef } from "react";
import { TypeResetPasswordSchema } from "@/features/auth/schemes/resetPasswordSchema";
import { passwordRecoveryService } from "../libs/passwordRecorveryService";
import { ILoginResponse } from "../types/types";
import { TokenService } from "@/entities/token";
import { useActions } from "@/shared/hooks/useActions";

export const useRegisterMutation = () => {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ["register user"],
    mutationFn: ({ values }: { values: TypeRegisterSchema }) =>
      authService.register(values),
    onSuccess(data) {
      if (data.error) {
        toastMessageHandler(new Error(data.message));
      } else {
        toastSuccesHandler(
          "Успешная регистрация",
          "Подтвердите почту. Сообщение было отправлено на ваш почтовый адрес!",
        );
      }
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { register, isLoadingRegister };
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setTwoFactorAuthorizeData } = useActions();

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login user"],
    mutationFn: ({ values }: { values: TypeLoginSchema }) => {
      setTwoFactorAuthorizeData(values);
      return authService.login(values);
    },
    onSuccess(data: ILoginResponse) {
      if (data.error) {
        toastMessageHandler(new Error(data.message));
        return;
      }
      if (data.isTwoFactor) {
        toastSuccesHandler(data.message);
        navigate(ERouteNames.TWO_FACTOR, { replace: true });
      }
      if (!data.isTwoFactor) {
        toastSuccesHandler(data.message);
      }

      if (data.data.access_token) {
        TokenService.setAccessToken(data.data.access_token);
        navigate(ERouteNames.DASHBOARD, { replace: true });
      }
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { login, isLoadingLogin };
};

export const useOAuthMutation = () => {
  const { mutateAsync } = useMutation({
    mutationKey: ["oauth"],
    mutationFn: async (provider: "google" | "yandex") =>
      await authService.oauthByProvider(provider),
  });

  return { mutateAsync };
};

export const useVerificateMutation = () => {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  const { mutate: verificate } = useMutation({
    mutationKey: ["verify"],
    mutationFn: (token: string | null) => verificateService.verifyEmail(token),
    onSuccess() {
      if (!hasNavigated.current) {
        toastSuccesHandler("Почта успешно подтверждена!");
        navigate(ERouteNames.DASHBOARD);
        hasNavigated.current = true;
      }
    },
    onError() {
      if (!hasNavigated.current) {
        navigate(ERouteNames.LOGIN);
        hasNavigated.current = true;
      }
    },
  });

  return {
    verificate,
  };
};

export const useResetPasswordMutation = () => {
  const { mutate: reset, isPending: isLoadingReset } = useMutation({
    mutationKey: ["reset"],
    mutationFn: ({ values }: { values: TypeResetPasswordSchema }) =>
      passwordRecoveryService.resetPassword(values),
    onSuccess() {
      toastSuccesHandler(
        "Проверьте почту",
        "Сообщение было отправлено на ваш почтовый адрес!",
      );
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return {
    reset,
    isLoadingReset,
  };
};

export const useNewPasswordMutation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
    mutationKey: ["new password"],
    mutationFn: ({ values }: { values: TypeNewPasswordSchema }) =>
      passwordRecoveryService.newPassword(values, token),
    onSuccess() {
      toastSuccesHandler(
        "Пароль успешно изменен",
        "Теперь вы можете войти в свой аккаунт!",
      );
      navigate(ERouteNames.LOGIN);
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return {
    newPassword,
    isLoadingNew,
  };
};
