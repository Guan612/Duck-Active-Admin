import axios from "axios";
import userStore from "../stores/userstore";
import { message } from "antd";

const http = axios.create({
	baseURL: "http://localhost:3000/apis",
	timeout: 2000,
});

http.interceptors.request.use(
	async (config) => {
		const userInfo = userStore.getState().userInfo; // 直接访问 zustand store 的状态
		if (!userInfo) {
			return config;
		}
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
		message.error(error.response?.data?.message || "未知错误");
		return Promise.reject(error);
	}
);

export default http;
