import { message } from "antd";
import { signInActiveAPI } from "../../api/active";
export default function useAddActiveCard() {
	const statusColorMap = {
		4: "orange", // 停止报名
		5: "purple", // 活动结束
		6: "gray", // 活动取消
		2: "green",
		3: "red",
		1: "blue",
	};
    
	const borderColor = `border-l-${
		statusColorMap[myActive.activitie.activitStatus] || "blue"
	}-200`;

	const signInActive = async (singnInId: number) => {
		const res = await signInActiveAPI(singnInId);
		if (res) {
			message.success("签到成功");
		}
	};
	return { signInActive, borderColor,statusColorMap };
}
