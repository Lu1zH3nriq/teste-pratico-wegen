import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token, loading } = useAuth();
  if (loading) {
    // Pode ser um spinner ou null
    return null;
  }
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
  