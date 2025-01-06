import { useState } from "react";
import { registerAPI } from "../../api/user";
import { registerDto } from "../../dto/userDto";

export default function useRegister() {
  const onFinish = async (value: registerDto) => {
    const res = await registerAPI(value);
    if (res) {
    }
  };

  return { onFinish };
}
