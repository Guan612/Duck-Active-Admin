import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfo = defineStore('user', 
  () => {
    const userInfo = ref({})

    return {  }
})
