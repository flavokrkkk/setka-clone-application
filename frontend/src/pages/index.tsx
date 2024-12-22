import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "@pages/errorPage";
import RootPage from "@pages/rootPage";
import { lazy } from "react";
import { ERouteNames } from "@/shared/utils/routes/path";
import { routesWithHoc } from "./routes";
import { privatePage, publicPage } from "@/entities/viewer";

const HomePage = lazy(() => import("@pages/homePage"));
const AuthPage = lazy(() => import("@pages/authPage/ui/authPage"));
const VerificationPage = lazy(
  () => import("@pages/authPage/ui/verificationPage"),
);
const ResetPasswordPage = lazy(
  () => import("@pages/authPage/ui/resetPasswordPage"),
);
const NewPasswordPage = lazy(
  () => import("@pages/authPage/ui/newPasswordPage"),
);
const LoginPage = lazy(() => import("@pages/authPage/ui/loginPage"));
const RegisterPage = lazy(() => import("@pages/authPage/ui/registerPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      ...routesWithHoc(privatePage, [
        {
          path: "",
          element: <Navigate to={ERouteNames.HOME} replace />,
        },
        {
          path: ERouteNames.HOME,
          element: <HomePage />,
        },
      ]),
    ],
  },
  {
    path: ERouteNames.AUTH,
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      ...routesWithHoc(publicPage, [
        {
          path: "",
          element: <Navigate to={ERouteNames.LOGIN} replace />,
        },
        {
          path: ERouteNames.LOGIN,
          element: <LoginPage />,
        },
        {
          path: ERouteNames.REGISTER,
          element: <RegisterPage />,
        },
        {
          path: ERouteNames.VERIFICATION,
          element: <VerificationPage />,
        },
        {
          path: ERouteNames.RESET_PASSWORD,
          element: <ResetPasswordPage />,
        },
        {
          path: ERouteNames.NEW_PASSWORD,
          element: <NewPasswordPage />,
        },
      ]),
    ],
  },
]);
