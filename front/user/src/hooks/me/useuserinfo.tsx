import userStore from "../../stores/userstore";

export default function useUserInfo() {
	const userInfo = userStore.getState().userInfo;

	return {
		userInfo,
	};
}
