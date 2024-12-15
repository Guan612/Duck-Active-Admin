import { useNavigate } from "react-router-dom";
import { ActivitieType } from "../../dto/activeDto";
export default function useActiveCard() {
	const navigate = useNavigate();

	const getActivitieType = (typeValue: number): string => {
		return ActivitieType[typeValue] || "未知活动类型";
	};

	const goActiveDetail = (id: number) => {
		navigate(`/activedetail/${id}`);
	};

	return {
		goActiveDetail,
		getActivitieType,
	};
}
