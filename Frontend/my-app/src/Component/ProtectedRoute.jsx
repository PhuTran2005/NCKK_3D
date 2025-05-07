// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../helper/cookies";

const ProtectedRoute = ({ children }) => {
  const isAuth = getCookie("token");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
