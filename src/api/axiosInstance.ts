import Axios, { AxiosError } from "axios";

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
    console.log("error.config", error.config);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("응답 401");
      // const refreshToken = localStorage.getItem("refresh_token");
      // if (refreshToken) {
      //   try {
      //     const { data } = await axiosInstance.post("/user/token", {
      //       token: refreshToken,
      //     });
      //     localStorage.setItem("access_token", data.accessToken);
      //     originalRequest.headers["access-token"] = data.accessToken;
      //     return axiosInstance(originalRequest);
      //   } catch (refreshError) {
      //     const axiosError = refreshError as AxiosError;
      //     if (axiosError.response && axiosError.response.status === 401) {
      //       localStorage.removeItem("accessToken");
      //       localStorage.removeItem("refreshToken");
      //       window.location.href = "/signin";
      //     }
      //   }
      // } else {
      //   window.location.href = "/signin";
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
