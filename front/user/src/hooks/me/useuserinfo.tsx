import userStore from "../../stores/userstore";
import { getMyActiveAPI } from "../../api/registration";
import { updateUserInfoAPI } from "../../api/user";
import { useEffect, useState } from "react";
import { UserInfo } from "../../dto/userDto";
import { message } from "antd";
import type { AxiosError } from "axios";
export default function useUserInfo() {
  const [myActive, setMyActive] = useState([]);
  const [changeUserInfoflag, setChangeUserInfoflag] = useState(false);

  const userInfo = userStore.getState().userInfo;

  const getMyActive = async () => {
    try {
      const res = await getMyActiveAPI();
      if (res.length) {
        setMyActive(res);
      }
    } catch (error: unknown) {
      console.error("获取活动信息失败:", error);
      message.error(error.response?.data?.message || "获取活动信息失败");
    }
  };

  const handleActiveChange = (value: number) => {
    console.log(`selected ${value}`);
  };

  const openChangeUserInfo = () => {
    setChangeUserInfoflag(true);
  };

  const updateNickname = async (nickname: string) => {
    try {
      const updatedUser = await updateUserInfoAPI(userInfo.id, { nickname });
      userStore.setState((state: { userInfo: UserInfo }) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          ...updatedUser,
        },
      }));
      message.success("昵称更新成功");
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error("修改昵称失败:", err);
      message.error(err.response?.data?.message || "修改昵称失败");
      throw err;
    }
  };

  const updateEmail = async (email: string) => {
    try {
      const updatedUser = await updateUserInfoAPI(userInfo.id, { email });
      userStore.setState((state: { userInfo: UserInfo }) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          ...updatedUser,
        },
      }));
      message.success("邮箱更新成功");
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error("修改邮箱失败:", err);
      message.error(err.response?.data?.message || "修改邮箱失败");
      throw err;
    }
  };

  const updatePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      const updatedUser = await updateUserInfoAPI(userInfo.id, {
		confirmPassword,
        oldPassword,
        newPassword,
      });
      userStore.setState((state: { userInfo: UserInfo }) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          ...updatedUser,
        },
      }));
      message.success("密码更新成功");
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error("修改密码失败:", err);
      message.error(err.response?.data?.message || "修改密码失败");
      throw err;
    }
  };

  const handleChangeUserInfCancel = () => {
    setChangeUserInfoflag(false);
  };

  useEffect(() => {
    getMyActive();
  }, []);

  const activeStatusOptions = [
    {
      value: 0,
      label: "已报名",
    },
    {
      value: 1,
      label: "已参加活动",
    },
    {
      value: 2,
      label: "活动结束",
    },
    {
      value: 3,
      label: "已取消报名",
    },
    {
      value: 4,
      label: "已参加活动",
    },
  ];

  return {
    myActive,
    userInfo,
    activeStatusOptions,
    changeUserInfoflag,
    openChangeUserInfo,
    handleActiveChange,
    updateNickname,
    updateEmail,
    updatePassword,
    handleChangeUserInfCancel,
  };
}
