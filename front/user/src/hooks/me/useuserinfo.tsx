import userStore from "../../stores/userstore";
import { getMyActiveAPI } from "../../api/registration";
import { useEffect, useState } from "react";
import { ActiveDto } from "../../dto/activeDto";
export default function useUserInfo() {
	const[myActive,setMyActive] = useState([])

	const userInfo = userStore.getState().userInfo;

	const getMyActive = async () => {
		const res = await getMyActiveAPI();
		setMyActive(res)
	}

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	useEffect(() => {
	    getMyActive()
	},[])

	const activeStatusOptions = [
		{
		  value: 0,
		  label: '已报名',
		},
		{
		  value: 1,
		  label: '已参加活动',
		},
		{
		  value: 2,
		  label: '活动结束',
		},
		{
		  value: 3,
		  label: '已取消报名',
		},
		{
		  value: 4,
		  label: '为参加活动',
		}
	];

	return {
		myActive,
		userInfo,
		activeStatusOptions,
		handleChange,
	};
}
