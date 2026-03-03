import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
};
export default PrivateRoute;
