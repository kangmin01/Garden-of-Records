import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
});

export default axiosInstance;
