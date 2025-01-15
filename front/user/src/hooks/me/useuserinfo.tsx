import userStore from "../../stores/userstore";
import { getMyActiveAPI } from "../../api/registration";
import { updateUserInfoAPI } from "../../api/user";
import { useEffect, useState } from "react";
import { ActiveDto } from "../../dto/activeDto";
import { updateUserDto, UserInfo } from "../../dto/userDto";
export default function useUserInfo() {
	const[myActive,setMyActive] = useState<ActiveDto[]>([])
	const[changeUserInfoflag,setChangeUserInfoflag] = useState(false)

	const userInfo = userStore.getState().userInfo;

	const getMyActive = async () => {
		const res: { data: ActiveDto[] } = await getMyActiveAPI();
		setMyActive(res.data)
	}

	const handleActiveChange = (value: number) => {
		console.log(`selected ${value}`);
	};

	const openChangeUserInfo = ()=>{
		setChangeUserInfoflag(true)
	}

	const isChangeUserInfoOk = async (formData: updateUserDto) => {
		try {
			await updateUserInfoAPI(userInfo.id, formData);
			// 更新store中的用户信息
			userStore.setState((state: { userInfo: UserInfo }) => ({
				...state,
				userInfo: {
					...state.userInfo,
					...formData
				}
			}));
			setChangeUserInfoflag(false);
		} catch (error) {
			console.error('修改用户信息失败:', error);
		}
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
