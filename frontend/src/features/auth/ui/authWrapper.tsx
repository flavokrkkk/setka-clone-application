import { FC } from "react";
import { EAuthModes, navigateAuthText } from "../lib/utils/mode";
import { Link } from "react-router-dom";
import AuthSocial from "./authSocial";

interface IAuthWrapper {
  title: string;
  mode: EAuthModes;
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AuthWrapper: FC<IAuthWrapper> = ({ mode, title, children, onSubmit }) => {
  return (
    <div className="w-full space-y-4 max-w-[340px] p-6 bg-gray-50 flex justify-center flex-col items-center rounded-2xl shadow-md">
      <section className="space-y-1">
        <div className="flex justify-center items-center space-x-1">
          <h1 className="font-bold text-2xl uppercase cursor-pointer">
            Strife
          </h1>
          <img src="/logo-email.png" className="rounded h-5 w-5 mt-[3px]" />
        </div>
        <h2 className="text-sm text-center">{title}</h2>
      </section>
      <form onSubmit={onSubmit} className="w-full px-6">
        {children}
        <AuthSocial />
      </form>
      <p className="text-xs text-gray-400 ">
        {navigateAuthText[mode].hasAccount}
        <Link to={navigateAuthText[mode].path} className="text-black">
          {navigateAuthText[mode].navigate}
        </Link>
      </p>
    </div>
  );
};

export default AuthWrapper;
