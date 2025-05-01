import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";

import Login from "../pages/(auth)/Login";
import ErrorPage from "../pages/ErrorPage";
import GuestGuard from "../components/GuestGuard";
import ProductAttribute from "../pages/Products/ProductAttribute";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/products/attributes",
          element: <ProductAttribute />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
