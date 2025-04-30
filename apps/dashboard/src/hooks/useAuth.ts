import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = Cookies.get("token");
    return !!token;
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return {
    isAuthenticated,
    logout,
  };
};
