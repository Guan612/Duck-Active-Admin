import {
	LockOutlined,
	UploadOutlined,
	UserOutlined,
	MailOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import useRegister from "../../hooks/register/useregister";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
	const { onFinish, uploadAvatar, beforeUpload, imageUrl } = useRegister();

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
			>
				<div className="h-2 bg-linear-to-r from-blue-500 to-purple-500" />
				<div className="p-8 space-y-6">
					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold text-gray-800">
							新用户注册
						</h1>
						<p className="text-gray-500">
							加入我们，发现更多精彩活动
						</p>
					</div>

					<Form
						layout="vertical"
						onFinish={onFinish}
						className="space-y-4"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Form.Item
								label="登录账号"
								name="loginId"
								rules={[
									{
										required: true,
										message: "请输入登录账号",
									},
								]}
							>
								<Input
									size="large"
									prefix={
										<UserOutlined className="text-gray-400" />
									}
									placeholder="请输入账号"
								/>
							</Form.Item>
							<Form.Item
								label="用户昵称"
								name="nickname"
								rules={[
									{ required: true, message: "请输入昵称" },
								]}
							>
								<Input
									size="large"
									prefix={
										<SmileOutlined className="text-gray-400" />
									}
									placeholder="请输入昵称"
								/>
							</Form.Item>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Form.Item
								label="设置密码"
								name="password"
								rules={[
									{ required: true, message: "请输入密码" },
								]}
								hasFeedback
							>
								<Input.Password
									size="large"
									prefix={
										<LockOutlined className="text-gray-400" />
									}
									placeholder="至少8位字符"
								/>
							</Form.Item>
							<Form.Item
								label="电子邮箱"
								name="email"
								rules={[
									{ required: true, message: "请输入邮箱" },
									{
										type: "email",
										message: "邮箱格式不正确",
									},
								]}
							>
								<Input
									size="large"
									prefix={
										<MailOutlined className="text-gray-400" />
									}
									placeholder="example@domain.com"
								/>
							</Form.Item>
						</div>
						<Form.Item
							label="用户头像"
							name="headerimg"
							extra="支持JPG/PNG格式，大小不超过2MB"
						>
							<Upload
								name="file"
								listType="picture-card"
								className="avatar-uploader w-full"
								showUploadList={false}
								action={import.meta.env.VITE_API_BASE_URL+"/uploadfile/avter"}
								beforeUpload={beforeUpload}
								onChange={uploadAvatar}
							>
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="w-full h-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 transition-all"
								>
									{imageUrl ? (
										<img
											src={imageUrl}
											alt="avatar"
											className="w-full h-full object-cover rounded-lg"
										/>
									) : (
										<div className="text-center text-gray-400">
											<UploadOutlined className="text-2xl mb-2" />
											<p className="m-0">点击上传头像</p>
										</div>
									)}
								</motion.div>
							</Upload>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								block
								size="large"
								className="hover:shadow-md transition-all"
							>
								立即注册
							</Button>
						</Form.Item>

						<div className="text-center text-sm text-gray-500">
							已有账号？{" "}
							<Link
								to="/login"
								className="text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2"
							>
								立即登录
							</Link>
						</div>
					</Form>
				</div>
			</motion.div>
		</div>
	);
}
