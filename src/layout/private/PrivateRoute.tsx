import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import path from "../../constants/path";

function PrivateRoute() {
  const { auth } = React.useContext(AuthContext)!;
  if (auth == null || !localStorage.getItem("accessToken")) {
    toast.error("You don't have permission");
    return <Navigate to={path.LOGIN} replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
