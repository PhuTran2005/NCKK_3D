import { useRoutes } from "react-router-dom";
import Home from "../Page/Home";
import DefaultLayout from "../Page/DefaultLayout";
import Discovery from "../Page/Dicovery";
import Colection from "../Page/Colection";
import NotFound from "../Page/NotFound";
import React from "react";
import Model from "../Page/Model";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Assigment from "../Page/Asigment";
import ProtectedRoute from "../Component/ProtectedRoute";

const AllRouters = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "models",
          element: <Model />,
        },
        {
          path: "assignment",
          element: (
            <ProtectedRoute>
              <Assigment />
            </ProtectedRoute>
          ),
        },
        {
          path: "colection",

          element: (
            <ProtectedRoute>
              <Colection />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
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
