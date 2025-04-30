import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const apiPath = import.meta.env.VITE_API_PATH;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${apiPath}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        const response = await axios.post(`${apiPath}/api/v1/auth/refresh-token`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        Cookies.set("token", accessToken, { secure: true, sameSite: "strict" });
        Cookies.set("refreshToken", newRefreshToken, { secure: true, sameSite: "strict" });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    console.error("Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
