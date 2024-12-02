import http from ".";
import { loginDto } from "../dto/userDto";

export const registerAPI = (data: loginDto) => {
	return http.post("/user/register", data);
};

export const loginAPI = (data: loginDto) => {
	return http.post("/user/login", data);
};
