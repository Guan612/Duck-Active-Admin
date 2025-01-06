import { InboxOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import useRegister from "../../hooks/register/useregister";

export default function Register() {
  const { onFinish } = useRegister();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen mx-6">
      <div className="flex flex-col justify-center items-center rounded-2xl shadow-lg w-full h-2/3 md:w-1/2 bg-gradient-to-r from-transblue via-white to-transpink">
        <div className="flex flex-col h-full w-full m-2">
          <div className="text-center text-2xl font-bold m-2">
            欢迎来到活动报名网站
          </div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="m-2 p-2 justify-center items-center"
          >
            <div className="flex flex-col md:flex-row">
              <Form.Item
                label="登录ID"
                name="loginId"
                className="mx-2"
                rules={[
                  {
                    required: true,
                    message: "登录ID为必填项",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="请输入登录ID" />
              </Form.Item>
              <Form.Item label="昵称" name="nickname">
                <Input placeholder="请输入昵称" />
              </Form.Item>
            </div>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码为必填项",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "请输入正确的邮箱格式",
                },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="上传头像">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                //beforeUpload={beforeUpload}
                //onChange={handleChange}
              >
                {/* {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )} */}
              </Upload>
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit" className="w-28">
                注册
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center text-sm">
            已有账号？
            <a className="text-blue-500" href="/login">
              点击登录
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
