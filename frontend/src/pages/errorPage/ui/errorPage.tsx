import { useRouteError } from "react-router-dom";
import { getErrorMessage } from "../lib/getErrorMessage";
const ErrorPage = () => {
  const error = useRouteError();
  const errorMessage = getErrorMessage(error);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[100vw]">
      <h1 className="font-bold text-4xl">Oops!</h1>
      <h1>Sorry, error vim</h1>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default ErrorPage;
