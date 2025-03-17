import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
