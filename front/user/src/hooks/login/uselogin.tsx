import { useState } from "react";

export function useLogin() {
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	return { onFinish };
}
