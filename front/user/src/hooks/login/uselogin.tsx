import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/user";
import userStore from "../../stores/userstore";
import { message } from "antd";
import { loginDto } from "../../dto/userDto";

const useLogin = () => {
	const navigate = useNavigate(); //使用跳转函数
	const { setUserInfo } = userStore();
	const onFinish = async (values: loginDto) => {
		try {
			const { userInfo } = await loginAPI(values);
			setUserInfo(userInfo);
			navigate("/");
			message.success("欢迎你，" + userInfo.loginId);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return { onFinish, onFinishFailed };
};

export default useLogin; // 导出useLogin函数
