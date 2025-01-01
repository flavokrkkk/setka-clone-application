import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "@pages/errorPage";
import RootPage from "@pages/rootPage";
import { lazy } from "react";
import { ERouteNames } from "@/shared/utils/routes/path";
import { routesWithHoc } from "./routes";
import { privatePage, publicPage } from "@/entities/viewer";

const DashboardPage = lazy(() => import("@pages/dashboardPage"));
const ProfilePage = lazy(() => import("@pages/profilePage"));
const CommunitiesPage = lazy(() => import("@pages/communitiesPage"));
const MessangerPage = lazy(() => import("@pages/messangerPage"));
const SettingPage = lazy(() => import("@pages/settingPage"));

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

const TwoFactorPage = lazy(() => import("@pages/authPage/ui/twoFactorPage"));

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
          element: <Navigate to={ERouteNames.DASHBOARD} replace />,
        },
        {
          path: ERouteNames.DASHBOARD,
          element: <DashboardPage />,
        },
        {
          path: ERouteNames.COMMUNITIES,
          element: <CommunitiesPage />,
        },
        {
          path: ERouteNames.MESSANGER,
          element: <MessangerPage />,
        },
        {
          path: ERouteNames.PROFILE,
          element: <ProfilePage />,
        },
        {
          path: ERouteNames.SETTINGS,
          element: <SettingPage />,
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
        {
          path: ERouteNames.TWO_FACTOR,
          element: <TwoFactorPage />,
        },
      ]),
    ],
  },
]);
