import { useNavigate, useParams } from "react-router";
import { checkActiveStatusAPI, getActiveDetailAPI } from "../../api/active";
import { addActiveAPI, isJoinAPI } from "../../api/registration";
import { useEffect, useState } from "react";
import { ActiveDto } from "../../dto/activeDto";
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
		const res = await addActiveAPI({ activeId: Number(activeId) });
		if (res) {
			isJoinActive();
			getActiveDetail();
		}
	};

	const isJoinActive = async () => {
		const res = await isJoinAPI(detailId);
		setJoinStatus(res);
	};

	const checkActiveStatus = async() => {
	    const res = await checkActiveStatusAPI(detailId);
		return res;
	}

	useEffect(() => {
		checkActiveStatus();
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
