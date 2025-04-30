import Cookies from "js-cookie";
import httpService from "../Configs/httpService";

export const sendOtp = async (mobile: string) => {
  try {
    const response = await httpService.post("/auth/authenticate", { mobile });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

export const verifyOtp = async (mobile: string, otp: string) => {
  try {
    const response = await httpService.post("/auth/verify-authenticate-otp", { mobile, otp });

    if (response.data?.accessToken) {
      Cookies.set("token", response.data.accessToken, { secure: true, sameSite: "strict", path: "/" });
      Cookies.set("refreshToken", response.data.refreshToken, { secure: true, sameSite: "strict", path: "/" });
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await httpService.post("/auth/refresh-token", { refreshToken });

    if (response.data?.accessToken) {
      Cookies.set("token", response.data.accessToken, { secure: true, sameSite: "strict", path: "/" });
      Cookies.set("refreshToken", response.data.refreshToken, { secure: true, sameSite: "strict", path: "/" });
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to refresh token");
  }
};

export const logout = async () => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  try {

    const response = await httpService.post("/auth/signout", { refreshToken });


    if (response.status === 201) {
      Cookies.remove("token", { path: "/", secure: true, sameSite: "strict" });
      Cookies.remove("refreshToken", { path: "/", secure: true, sameSite: "strict" });
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
