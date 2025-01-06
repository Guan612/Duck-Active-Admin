import http from ".";
import { loginDto, registerDto } from "../dto/userDto";

export const registerAPI = (data: registerDto) => {
	return http.post("/user/register", data);
};

export const loginAPI = (data: loginDto) => {
	return http.post("/user/login", data);
};
