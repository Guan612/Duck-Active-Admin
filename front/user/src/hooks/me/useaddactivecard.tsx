import { message } from "antd";
import { signInActiveAPI } from "../../api/registration";
export default function useAddActiveCard() {
	const signInActive = async (singnInId: number) => {
		const res = await signInActiveAPI(singnInId);
		if (res) {
			message.success("签到成功");
			location.reload() 
		}
	};
	return { signInActive };
}
