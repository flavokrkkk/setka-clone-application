import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
