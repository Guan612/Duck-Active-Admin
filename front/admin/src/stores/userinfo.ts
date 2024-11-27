import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginAPI } from '@/api/user'
import type { loginDto } from '@/dto/userDto'

export const useUserInfo = defineStore('user', 
  () => {
    const userInfo = ref({})
    const getUserInfo = async(data:loginDto)=>{
      const res = await LoginAPI(data)
      userInfo.value = res.userInfo
    }

    return {  }
})
