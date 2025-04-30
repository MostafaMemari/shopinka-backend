import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ["/login", "/register"];

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated() && !PUBLIC_ROUTES.includes(location.pathname)) {
      // ذخیره مسیر فعلی برای ریدایرکت بعد از لاگین
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [location.pathname]);

  // اگر مسیر عمومی است یا کاربر احراز هویت شده، محتوا را نمایش بده
  if (PUBLIC_ROUTES.includes(location.pathname) || isAuthenticated()) {
    return <>{children}</>;
  }

  // در حالت دیگر چیزی نمایش نده (در حال ریدایرکت به صفحه لاگین هستیم)
  return null;
};

export default AuthGuard;
