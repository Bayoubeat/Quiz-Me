import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { WEB_URLS } from "../helper/constants";

export function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to={WEB_URLS.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={WEB_URLS.LOGIN} state={{ from: location }} replace />
  );
}
