import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useLogin from "../../hooks/login/uselogin";
import { motion } from "framer-motion";

export default function Login() {
	const { onFinish } = useLogin();

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
			>
				{/* 头部装饰条 */}
				<div className="h-2 bg-linear-to-r from-blue-500 to-purple-500" />

				<div className="p-8 space-y-6">
					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold text-gray-800">
							活动报名系统
						</h1>
						<p className="text-gray-500">开启你的精彩活动体验</p>
					</div>

					<Form
						layout="vertical"
						onFinish={onFinish}
						className="space-y-4"
					>
						<Form.Item
							label="账号"
							name="loginId"
							rules={[
								{ required: true, message: "请输入登录账号" },
							]}
						>
							<Input
								size="large"
								prefix={
									<UserOutlined className="text-gray-400" />
								}
								placeholder="请输入账号"
								className="hover:border-blue-400 focus:border-blue-500"
							/>
						</Form.Item>

						<Form.Item
							label="密码"
							name="password"
							rules={[
								{ required: true, message: "请输入登录密码" },
							]}
						>
							<Input.Password
								size="large"
								prefix={
									<LockOutlined className="text-gray-400" />
								}
								placeholder="请输入密码"
								className="hover:border-blue-400 focus:border-blue-500"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								block
								size="large"
								className="hover:shadow-md transition-all"
							>
								立即登录
							</Button>
						</Form.Item>
					</Form>

					<div className="text-center text-sm text-gray-500">
						还没有账号？{" "}
						<a
							href="/register"
							className="text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2"
						>
							快速注册
						</a>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
