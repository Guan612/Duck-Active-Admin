import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const userStore = create(
	persist(
		(set) => ({
			userInfo: null,
			setUserInfo: (userInfo: any) => {
				set({ userInfo });
			},
			clearUserInfo: () => {
				set({ userInfo: null });
			},
		}),

		{
			name: "userInfo", // 存储在localStorage中的key
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default userStore;