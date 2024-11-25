import axios from "axios";
import userStore from "../stores/userstore";
import { message } from "antd";


const http = axios.create({
    baseURL:"http://localhost:3000/",
    timeout: 2000,
})

http.interceptors.request.use(
    async (config) => {
		const userInfo = userStore.getState().userInfo; // 直接访问 zustand store 的状态
		const token = userInfo.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
    (response) => {
		return response.data;
	},
	(error) => {
		console.log(error);
		const errorCode = error.response?.data?.statusCode;
		// 检查 code 是否为 401
		if (errorCode === 401) {
			// 跳转到登录页面
			localStorage.clear(); // 或者你可以只清除特定的键
			window.location.href = "/login";
			message.error("登录已过期，请重新登录");
			return;
		}
		message.error(error.response?.data?.message || "未知错误");
		return Promise.reject(error);
	}
);

export default http;