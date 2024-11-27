import axios from "axios";
import { message } from 'ant-design-vue';
const http = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 2000,
});

http.interceptors.request.use(
	
);

http.interceptors.response.use();

export default http;
