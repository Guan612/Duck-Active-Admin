import { useState } from "react";
import { loginDto } from "../../dto/userDto";

export function useLogin() {
	const onFinish = (values: loginDto) => {
		console.log("Success:", values);
	};

	return { onFinish };
}
