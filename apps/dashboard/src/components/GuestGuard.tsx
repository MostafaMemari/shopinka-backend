import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const token = Cookies.get("token");
  const location = useLocation();

  if (token) {
    // If user is logged in, redirect to home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
