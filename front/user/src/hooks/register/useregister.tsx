import { useState } from "react";
import { registerAPI } from "../../api/user";
import { registerDto } from "../../dto/userDto";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any[]>([]); // 新增状态来管理文件列表
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = async (value: registerDto) => {
    const res = await registerAPI(value);
    if (res) {
      message.success(`${res.loginId}注册成功`);
      navigate("/login");
    }
  };

  const uploadAvatar = (info: any) => {
    // 文件类型验证
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(info.file.type)) {
      message.error('仅支持 JPG/PNG/GIF 格式');
      return;
    }

    // 文件大小验证 (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (info.file.size > maxSize) {
      message.error('文件大小不能超过 2MB');
      return;
    }

    if (info.file.status === "uploading") {
      message.loading('头像上传中...', 0);
      return;
    }

    if (info.file.status === "done") {
      message.destroy();
      if (info.file.response?.url) {
        message.success("头像上传成功");
        const uploadedUrl = info.file.response.url;
        setImageUrl(uploadedUrl);
        form.setFieldsValue({
          avatar: uploadedUrl,
        });
      } else {
        message.error('上传成功但未获取到文件URL');
      }
    } else if (info.file.status === "error") {
      message.destroy();
      message.error(info.file.response?.message || '上传失败');
    }
  };

  return { onFinish, uploadAvatar, imageUrl };
}
