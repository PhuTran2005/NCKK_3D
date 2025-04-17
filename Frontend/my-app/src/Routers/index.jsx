import { useRoutes } from "react-router-dom";
import Home from "../Page/Home";
import DefaultLayout from "../Page/DefaultLayout";
import Discovery from "../Page/Dicovery";
import Colection from "../Page/Colection";
import NotFound from "../Page/NotFound";
import React from "react";

const AllRouters = () => {
  let routers = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "dicovery",
          element: <Discovery />,
        },
        {
          path: "colection",
          element: <Colection />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return routers;
};
export default AllRouters;
