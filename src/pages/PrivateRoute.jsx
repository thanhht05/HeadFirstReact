import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoadingFetchUser);

  console.log("isLoading", isLoading);
  console.log("User", user);
  if (isLoading) {
    return <div>Loading...</div>; // hoặc spinner
  }
  if (user && user.id) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
};
export default PrivateRoute;
