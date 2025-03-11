import { useNavigate } from "react-router";
import userStore from "../../stores/userstore";
import toast from "react-hot-toast";

export default function useHeaderBar() {
	const navigate = useNavigate(); //使用跳转函数

	const { clearUserInfo } = userStore();
	
	const userInfo = userStore.getState().userInfo;

	const logOut = () => {
		clearUserInfo();
		toast.success("退出登录成功"); 
		navigate("/login");
	};

	const goLogin = () => {
		navigate("/login");
	};

	const goMe = () => {
		navigate("/me");
	}

	return { userInfo, logOut, goLogin, goMe };
}
