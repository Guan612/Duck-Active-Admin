import type { loginDto, registerDto } from "@/dto/userDto";
import http from ".";

export const RegisterAPI = (data:registerDto)=>{
    return http.post("/user/register", data);
}

export const LoginAPI = (data: loginDto) => {
    return http.post("/user/adminlogin", data);
}

export const getUserListAPI = ()=>{
    return http.get('/user')
}