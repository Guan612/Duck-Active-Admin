import axios from "axios";
import { useUserStore } from "@/stores/userstore";
import { message } from "ant-design-vue";
import router from "@/router";
const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
});

http.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore();
    const token = await userStore.userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    message.error(error.message);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    message.error(error.response.data.message || '未知错误');
    return Promise.reject(error);
  }
);

export default http;
