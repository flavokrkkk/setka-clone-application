import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthPage;
