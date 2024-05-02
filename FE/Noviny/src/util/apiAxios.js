import axios from "axios";
import { getAuthToken } from "./auth";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["x-access-token"] = `${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
