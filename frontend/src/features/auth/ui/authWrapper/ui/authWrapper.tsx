import { FC } from "react";
import { Link } from "react-router-dom";
import AuthSocial from "@/features/auth/ui/authSocial/ui/authSocial";
import { ERouteNames } from "@/shared/utils/routes/path";
import { ChevronLeft } from "lucide-react";
import { EAuthModes, navigateAuthText } from "@/features/auth/lib/utils/mode";

interface IAuthWrapper {
  mode: EAuthModes;
  title?: string;
  isBack?: boolean;
  children: React.ReactNode;
}

const AuthWrapper: FC<IAuthWrapper> = ({
  mode,
  title = "Войдите в StifeMe",
  isBack,
  children,
}) => (
  <div className="w-full relative space-y-5 max-w-[360px] p-6 bg-gray-50 flex justify-center flex-col items-center rounded-3xl shadow-md">
    <section className="space-y-4">
      <div className="flex justify-center items-center space-x-1">
        <h1 className="font-bold text-2xl uppercase cursor-pointer">Strife</h1>
        <img src="/logo-email.png" className="rounded h-5 w-5 mb-[3px]" />
      </div>
      <h1 className="font-medium text-lg">{title}</h1>
    </section>

    <section className="w-full px-6">
      {isBack && (
        <Link
          to={navigateAuthText[mode].path}
          className="absolute top-[26px] left-5 cursor-pointer"
        >
          <ChevronLeft />
        </Link>
      )}
      {children}
      <AuthSocial />
    </section>
    {mode === EAuthModes.LOGIN && (
      <Link
        to={ERouteNames.RESET_PASSWORD}
        className="text-end leading-[7px] text-sm"
      >
        Забыли пароль?
      </Link>
    )}
    {navigateAuthText[mode].hasAccount && (
      <div className="text-xs text-gray-400 space-x-1">
        <span>{navigateAuthText[mode].hasAccount}</span>
        <Link to={navigateAuthText[mode].path} className="text-black font-bold">
          {navigateAuthText[mode].navigate}
        </Link>
      </div>
    )}
  </div>
);

export default AuthWrapper;
