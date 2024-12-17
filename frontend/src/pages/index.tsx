import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "@pages/errorPage";
import RootPage from "@pages/rootPage";
import { lazy } from "react";
import { ERouteNames } from "@/shared/utils/routes/path";

const HomePage = lazy(() => import("@pages/homePage"));
const AuthPage = lazy(() => import("@pages/authPage/ui/authPage"));
const LoginPage = lazy(() => import("@pages/authPage/ui/loginPage"));
const RegisterPage = lazy(() => import("@pages/authPage/ui/registerPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={ERouteNames.HOME} replace />,
      },
      {
        path: ERouteNames.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    path: ERouteNames.AUTH,
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
]);
