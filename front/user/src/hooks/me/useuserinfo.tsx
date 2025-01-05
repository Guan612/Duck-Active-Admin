import userStore from "../../stores/userstore";
import { getMyActiveAPI } from "../../api/registration";
import { useEffect, useState } from "react";
import { ActiveDto } from "../../dto/activeDto";
export default function useUserInfo() {
	const[myActive,setMyActive] = useState([])
	const[changeUserInfoflag,setChangeUserInfoflag] = useState(false)

	const userInfo = userStore.getState().userInfo;

	const getMyActive = async () => {
		const res = await getMyActiveAPI();
		setMyActive(res)
	}

	const handleActiveChange = (value) => {
		console.log(`selected ${value}`);
	};

	const openChangeUserInfo = ()=>{
		setChangeUserInfoflag(true)
	}

	const isChangeUserInfoOk = ()=>{
		setChangeUserInfoflag(true)
	}

	const handleChangeUserInfCancel =()=>{
		setChangeUserInfoflag(false)
	}

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
		  label: '已参加活动',
		}
	];

	return {
		myActive,
		userInfo,
		activeStatusOptions,
		changeUserInfoflag,
		openChangeUserInfo,
		handleActiveChange,
		isChangeUserInfoOk,
		handleChangeUserInfCancel,
	};
}
