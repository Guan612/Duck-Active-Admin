import { useState } from "react";
import { registerAPI } from "../../api/user";
import { registerDto } from "../../dto/userDto";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { uploadAvatarAPI } from "../../api/upload";

interface RegisterResponse {
  loginId: string;
}

export default function useRegister() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const onFinish = async (value: Omit<registerDto, "avatar">) => {
    try {
      const payload = {
        ...value,
        headerimg: imageUrl || undefined, // 使用上传成功后的 URL
      };
      console.log("Register payload:", payload);
      const res: AxiosResponse<RegisterResponse> = await registerAPI(payload);
      if (res) {
        message.success(`${res.loginId} 注册成功`);
        navigate("/login");
      }
    } catch (error) {
      message.error("注册失败，请重试");
      console.error("注册错误:", error);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/PNG 文件!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadAvatar = async ({ file }: { file: any }) => {
    if (file.status === "done") {
      try {
        const res = await uploadAvatarAPI(file.originFileObj);
        const url = res.url; // Adjust to match your API response structure
        message.success(`${file.name} 文件上传成功`);
        //console.log("Got avatar URL:", url);
        setImageUrl(url);
        form.setFieldsValue({
          headerimg: url,
        });
      } catch (error) {
        message.error(`${file.name} 文件上传失败`);
        console.error("Upload failed:", error);
      }
    } else if (file.status === "error") {
      message.error(`${file.name} 文件上传失败`);
    }
  };

  return { onFinish, uploadAvatar, beforeUpload, imageUrl };
}
