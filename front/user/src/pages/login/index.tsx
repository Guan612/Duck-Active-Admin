import { Button, Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useLogin from "../../hooks/login/uselogin";
export default function Login() {
	const { onFinish } = useLogin();
	return (
		<div className="flex flex-col md:flex-row justify-center items-center h-screen">
			<div className="flex flex-col justify-center items-center rounded-2xl shadow-lg w-full h-1/2 md:w-1/2 bg-gradient-to-r from-transblue via-white to-transpink">
				<div className="flex flex-col h-full w-full m-2">
					<div className="text-center text-2xl font-bold m-2">
						欢迎来到活动报名网站
					</div>
					<Form
						layout="vertical"
						onFinish={onFinish}
						className="m-2 p-2 justify-center items-center"
					>
						<Form.Item
							label="登录ID"
							name="loginId"
							rules={[
								{
									required: true,
									message: "登录ID为必填项",
								},
							]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="请输入登录ID"
							/>
						</Form.Item>
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
						<Form.Item>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
					<div className="text-center text-sm">
						没有账号？<a className="text-blue-500">点击注册</a>
					</div>
				</div>
			</div>
		</div>
	);
}
