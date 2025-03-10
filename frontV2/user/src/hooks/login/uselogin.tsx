import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { loginAPI } from "../../api/user";
import userStore from "../../stores/userstore";
import { loginDto } from "../../dto/userDto";
import { useState } from "react";

const useLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { setUserInfo } = userStore();

	const onSubmit = async (data: loginDto) => {
		try {
			setIsSubmitting(true);
			console.log(data);

			const { userInfo } = await loginAPI(data);
			setUserInfo(userInfo);
			toast.success("登录成功");
			navigate("/");
		} catch (error) {
			console.error(error);
			toast.error("登录失败，请检查用户名和密码");
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		onSubmit,
		handleSubmit,
		register,
		errors,
		isSubmitting,
	};
};

export default useLogin;
