import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { LoginAPI } from "@/api/user";
import type { loginDto } from "@/dto/userDto";
import router from "@/router";

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref(null);
    const getUserInfo = async (data: loginDto) => {
      const res = await LoginAPI(data);
      userInfo.value = res.userInfo;
      if (res) {
        message.success("欢迎你" + res.userInfo.loginId);
        router.push("/");
      }
    };

    const logOut = () => {
      userInfo.value = null
      message.success("退出登录成功");
      router.push("/auth/login");
    };

    return { userInfo, getUserInfo, logOut };
  },
  {
    persist: true, // 持久化存储
  }
);
