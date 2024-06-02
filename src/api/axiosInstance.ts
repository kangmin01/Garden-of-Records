import Axios, { AxiosError } from "axios";
import { useMessage } from "../context/MessageContext";
import CheckIcon from "../components/ui/icons/CheckIcon";

const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    const tokenless =
      url.includes("/login") ||
      url.includes("/signup") ||
      url.includes("/token");

    if (!tokenless) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers["access-token"] = accessToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const { data } = await axiosInstance.post("/user/token", null);
          // const { data } = await axiosInstance.post("/user/token", null, {
          //   headers: {
          //     "refresh-token": refreshToken,
          //     "Content-Type": "application/json",
          //   },
          // });
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          originalRequest.headers["access-token"] = data.accessToken;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          const axiosError = refreshError as AxiosError;
          if (axiosError.response) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.setItem("token_expired", "true");
            window.location.href = "/signin";
          }
        }
      } else {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
