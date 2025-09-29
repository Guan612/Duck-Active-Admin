import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserInfo } from "../dto/userDto";

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
}

const userStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo: UserInfo) => {
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
