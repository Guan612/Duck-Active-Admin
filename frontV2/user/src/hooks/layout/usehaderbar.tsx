import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/userstore";

export default function useHeaderBar() {
	const navigate = useNavigate(); //使用跳转函数
	const { Search } = Input;
	const { clearUserInfo } = userStore();
	const onSearch = (value: string) => {
		console.log(value);
	};
	const userInfo = userStore.getState().userInfo;

	const logOut = () => {
		clearUserInfo();
		message.success("退出登录成功");
		navigate("/login");
	};

	const goLogin = () => {
		navigate("/login");
	};

	const goMe = () => {
		navigate("/me");
	}

	return { Search, onSearch, userInfo, logOut, goLogin, goMe };
}
