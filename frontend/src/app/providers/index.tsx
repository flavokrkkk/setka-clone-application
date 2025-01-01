import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, Suspense } from "react";
import { queryClient } from "@app/config/queryClient";
import { routes } from "@/pages";
import { RouterProvider } from "react-router-dom";
import SonnerProvider from "@/shared/providers/sonnerProvider";
import { ViewerProvider } from "@/entities/viewer";
import { Loader } from "@/shared/ui";
import { Provider } from "react-redux";
import { store } from "../store";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ViewerProvider>
          <RouterProvider router={routes} />
          <SonnerProvider />
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ViewerProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
