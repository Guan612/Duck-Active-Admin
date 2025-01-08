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

  const uploadAvata = (info: any) => {
    if (info.file.status === "done") {
      // 上传成功后，获取返回的 URL
      message.success("头像上传成功");
      const uploadedUrl = info.file.response.url;
      setImageUrl(uploadedUrl); // 保存头像 URL

      // 将头像 URL 设置到表单字段 avatar 中
      form.setFieldsValue({
        avatar: uploadedUrl,
      });
    } else if (info.file.status === "error") {
      message.error("上传失败");
    }
  };

  return { onFinish, uploadAvata, imageUrl };
}
