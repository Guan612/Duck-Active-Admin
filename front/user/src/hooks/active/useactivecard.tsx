import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveListAPI } from "../../api/active";
export default function useActiveCard() {
	const [cardItems, setCardItems] = useState([]);

	const navigate = useNavigate();

	const getActiveList = async () => {
		const res = await getActiveListAPI();
		setCardItems(res);
	};

	const getActivitieType = (typeValue: number): string => {
		return menuType[typeValue] || "未知活动类型";
	};

	const goActiveDetail = (id: string) => {
		console.log(id);
		navigate(`/activedetail/${id}`);
	};

	useEffect(() => {
		getActiveList()
	}, []);

	return {
		cardItems,
		goActiveDetail,
		getActivitieType,
	};
}
