import Cookies from "js-cookie";
import httpService from "../Configs/httpService";

export const sendOtp = async (mobile: string) => {
  const response = await httpService.post("/auth/authenticate", { mobile });
  return response.data;
};

export const verifyOtp = async (phone: string, otp: string) => {
  const response = await httpService.post("/auth/verify-authenticate-otp", { mobile: phone, otp });
  if (response.data?.accessToken) {
    Cookies.set("token", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
  }

  return response.data;
};
export const refreshToken = async (refreshToken: string) => {
  const response = await httpService.post("/auth/refresh-token", { refreshToken });
  if (response.data?.accessToken) {
    Cookies.set("token", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
  }

  return response.data;
};

export const logout = async () => {
  const response = await httpService.post(`/auth/singout`);
  if (response.status === 200) {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    window.location.href = "/login";
  }
};
