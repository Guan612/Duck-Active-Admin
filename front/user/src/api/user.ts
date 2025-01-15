import http from ".";
import { loginDto, registerDto, updateUserDto } from "../dto/userDto";

export const registerAPI = (data: registerDto) => {
  return http.post("/user/register", data);
};

export const loginAPI = (data: loginDto) => {
  return http.post("/user/login", data);
};

export const updateUserInfoAPI = (id: string, data: updateUserDto) => {
  return http.patch(`/user/${id}`, data);
};
