import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAuthState,
  getAuthUserState,
} from "../redux/selectors/auth-selector";

export const ProtectedRoute = ({ onlyUnAuth = false, element }) => {
  const { authChecked } = useSelector(getAuthState);
  const user = useSelector(getAuthUserState);
  const location = useLocation();

  if (!authChecked) return null;

  if (onlyUnAuth && user) return <Navigate to={location.state?.from ?? "/"} />;

  if (!onlyUnAuth && !user)
    return <Navigate to="/login" state={{ from: location }} />;

  return element;
};
