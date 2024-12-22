import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

export const routesWithHoc = (
  hoc: (children: ReactNode) => ReactNode,
  routes: Array<RouteObject>,
): Array<RouteObject> => {
  return routes.map((route) => {
    const advancedRoute = {
      ...route,
      element: hoc(route.element),
    };
    if (route.children) {
      advancedRoute.children = routesWithHoc(hoc, route.children);
    }
    return advancedRoute;
  });
};
