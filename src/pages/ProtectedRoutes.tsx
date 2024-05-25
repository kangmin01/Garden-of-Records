import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuthContext();
  console.log("프로텍트", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
