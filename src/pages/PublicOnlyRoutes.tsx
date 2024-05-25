import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PublicOnlyRoutes() {
  const { isAuthenticated } = useAuthContext();

  console.log("퍼블릭온니", isAuthenticated);

  // TODO: 원래 있던 페이지에 남아있기
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
