import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
