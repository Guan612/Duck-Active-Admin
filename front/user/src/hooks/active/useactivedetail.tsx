import { useNavigate, useParams } from "react-router-dom";
import { getActiveDetailAPI, addActiveAPI, isJoinAPI } from "../../api/active";
import { useEffect, useState } from "react";
import { ActiveDto } from "../../dto/activeDto";
import { message } from "antd";
export default function useActiveDetail() {
	const [activeDetail, setActiveDetail] = useState<ActiveDto>({});
	const [joinStatus, setJoinStatus] = useState(false);

	const navigate = useNavigate();
	const detailId = useParams().id;

	const getActiveDetail = async () => {
		const res = await getActiveDetailAPI(detailId);
		setActiveDetail(res);
	};

	const backActive = () => {
		navigate("/active");
	};

	const joinActive = async (activeId: number) => {
		const res = await addActiveAPI({ activeId: activeId });
		if (res) {
			isJoinActive();
			message.success("活动报名成功");
		}
	};

	const isJoinActive = async () => {
		const res = await isJoinAPI(detailId);
		setJoinStatus(res);
	};

	useEffect(() => {
		getActiveDetail();
		isJoinActive();
	}, []);

	return {
		backActive,
		activeDetail,
		joinActive,
		joinStatus,
	};
}
