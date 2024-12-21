import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, Suspense } from "react";
import { queryClient } from "@app/config/queryClient";
import { routes } from "@/pages";
import { RouterProvider } from "react-router-dom";
import SonnerProvider from "@/shared/providers/sonnerProvider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <SonnerProvider />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </QueryClientProvider>
  );
};

export default Providers;
