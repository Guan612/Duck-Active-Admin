import { useState } from "react";
import { registerAPI } from "../../api/user";
import { registerDto } from "../../dto/userDto";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from 'axios';

interface RegisterResponse {
  loginId: string;
  avatar?: string;
}

export default function useRegister() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<Array<any>>([]); // 初始化空数组
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = async (value: registerDto) => {
    try {
      const payload = {
        ...value,
        avatar: imageUrl || ''
      };
      console.log('Register payload:', payload);
      const res: AxiosResponse<RegisterResponse> = await registerAPI(payload);
      if (res.data) {
        message.success(`${res.data.loginId}注册成功`);
        navigate("/login");
      }
    } catch (error) {
      message.error('注册失败，请重试');
      console.error('注册错误:', error);
    }
  };

  const [file, setFile] = useState<any>(null);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadAvatar = ({ file }: { file: any }) => {
    if (file.status === 'done') {
      message.success(`${file.name} 文件上传成功`);
      setFile(file);
      if (file.response) {
        console.log('Upload response:', file.response);
        console.log('Response data:', file.response.data);
        const url = file.response.url || file.response.data?.url || file.response.data?.data?.url;
        if (url) {
          console.log('Got avatar URL:', url);
          setImageUrl(url);
          form.setFieldsValue({
            avatar: url
          });
        } else {
          console.warn('No URL found in response:', file.response);
        }
      }
    } else if (file.status === 'error') {
      message.error(`${file.name} 文件上传失败`);
    }
  };

  return { onFinish, uploadAvatar, beforeUpload, imageUrl, file };
}
