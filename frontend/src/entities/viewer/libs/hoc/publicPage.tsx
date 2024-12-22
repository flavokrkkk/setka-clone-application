import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useViewer } from "../../model/context";
import { TokenService } from "@entities/token";
import { useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared/utils/routes/path";

export const publicPage = (children: React.ReactNode) => {
  return <PublicPage>{children}</PublicPage>;
};

const PublicPage: FC<PropsWithChildren> = ({ children }) => {
  const { loginViewer } = useViewer();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenService.getAccessToken();

    if (token) {
      loginViewer(token);
      navigate(ERouteNames.DEFAULT);
    } else {
      setIsLoading(false);
    }
  }, [loginViewer, navigate]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <div>{children}</div>;
};
