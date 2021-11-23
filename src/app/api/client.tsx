import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.musixmatch.com/ws/1.1",
  timeout: 10000,
  timeoutErrorMessage: "TimeoutError",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apikey = process.env.MM_APIKEY;
    if (apikey) config.params["apikey"] = apikey;

    return config;
  },
  (error) => {
    // this function is going to called every time we have some issues with the request, for example no internet connection
    return Promise.reject(error);
  }
);

export default axiosInstance;
