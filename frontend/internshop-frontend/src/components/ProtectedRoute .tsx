import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = !!localStorage.getItem("token");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
