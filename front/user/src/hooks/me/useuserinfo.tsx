import userStore from "../../stores/userstore";
import { getMyActiveAPI } from "../../api/registration";
import { useEffect, useState } from "react";
import { ActiveDto } from "../../dto/activeDto";
export default function useUserInfo() {
	const[myActive,setMyActive] = useState<ActiveDto>([])

	const userInfo = userStore.getState().userInfo;

	const getMyActive = async () => {
		const res = await getMyActiveAPI();
		setMyActive(res)
	}

	useEffect(() => {
	    getMyActive()
	},[])

	return {
		myActive,
		userInfo,
	};
}
