import {
	Button,
	Form,
	Input,
	Modal,
	Select,
	Tabs,
	Card,
	Avatar,
	Tag,
} from "antd";
import useUserInfo from "../../../hooks/me/useuserinfo";
import AddActiveCard from "./addactivecard";
import useAddActiveCard from "../../../hooks/me/useaddactivecard";
import { ActiveDto } from "../../../dto/activeDto";
import { EditOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export default function UserInfo() {
	const {
		userInfo,
		myActive,
		activeStatusOptions,
		changeUserInfoflag,
		handleActiveChange,
		openChangeUserInfo,
		updateNickname,
		updateEmail,
		updatePassword,
		handleChangeUserInfCancel,
	} = useUserInfo();
	return (
		<div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-50">
			{/* 用户信息卡片 */}
			<Card className="rounded-2xl shadow-lg mb-6">
				<div className="flex flex-col md:flex-row items-center gap-6 p-4">
					<Avatar
						src={
							userInfo?.headerimg ||
							"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
						}
						size={128}
						className="shadow-lg border-4 border-white"
					/>
					<div className="flex-1 space-y-2 text-center md:text-left">
						<h1 className="text-3xl font-bold text-gray-800">
							{userInfo?.nickname || userInfo?.loginId}
							{userInfo?.nickname && (
								<Tag color="blue" className="ml-2">
									{userInfo?.loginId}
								</Tag>
							)}
						</h1>
						<div className="space-y-1 text-gray-600">
							<p className="flex items-center justify-center md:justify-start">
								<MailOutlined className="mr-2" />
								{userInfo?.email || "未绑定邮箱"}
							</p>
						</div>
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={openChangeUserInfo}
							className="mt-4"
						>
							编辑资料
						</Button>
					</div>
				</div>
			</Card>

			{/* 修改信息模态框 */}
			<Modal
				title="账户设置"
				open={changeUserInfoflag}
				onCancel={handleChangeUserInfCancel}
				footer={null}
				width={800}
				className="rounded-lg"
			>
				<Tabs defaultActiveKey="1" className="p-4">
					<Tabs.TabPane tab="修改昵称" key="1">
						<Form
							layout="vertical"
							onFinish={(values) => {
								updateNickname(values.nickname);
								handleChangeUserInfCancel();
							}}
						>
							<Form.Item
								label="新昵称"
								name="nickname"
								rules={[
									{ required: true, message: "请输入新昵称" },
								]}
							>
								<Input placeholder="请输入不超过20个字符的新昵称" />
							</Form.Item>
							<Button type="primary" htmlType="submit" block>
								更新昵称
							</Button>
						</Form>
					</Tabs.TabPane>

					<Tabs.TabPane tab="修改邮箱" key="2">
						<Form
							layout="vertical"
							onFinish={(values) => {
								updateEmail(values.email);
								handleChangeUserInfCancel();
							}}
						>
							<Form.Item
								label="新邮箱"
								name="email"
								rules={[
									{
										type: "email",
										message: "请输入有效邮箱地址",
									},
								]}
							>
								<Input placeholder="name@example.com" />
							</Form.Item>
							<Button type="primary" htmlType="submit" block>
								更新邮箱
							</Button>
						</Form>
					</Tabs.TabPane>

					<Tabs.TabPane tab="修改密码" key="3">
						<Form
							layout="vertical"
							onFinish={(values) => {
								updatePassword(
									values.oldPassword,
									values.newPassword,
									values.confirmPassword
								);
								handleChangeUserInfCancel();
							}}
						>
							<Form.Item
								label="当前密码"
								name="oldPassword"
								dependencies={["newPassword"]}
								rules={[
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												getFieldValue("newPassword") &&
												!value
											) {
												return Promise.reject(
													new Error(
														"修改密码需要输入旧密码"
													)
												);
											}
											return Promise.resolve();
										},
									}),
								]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder="输入当前密码"
								/>
							</Form.Item>

							<Form.Item
								label="新密码"
								name="newPassword"
								dependencies={["oldPassword"]}
								rules={[
									{ min: 6, message: "密码至少6位" },
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												getFieldValue("oldPassword") &&
												!value
											) {
												return Promise.reject(
													new Error(
														"修改密码需要输入新密码"
													)
												);
											}
											return Promise.resolve();
										},
									}),
								]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder="至少6个字符"
								/>
							</Form.Item>

							<Form.Item
								label="确认新密码"
								name="confirmPassword"
								dependencies={["newPassword"]}
								rules={[
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												getFieldValue("newPassword") &&
												!value
											) {
												return Promise.reject(
													new Error("请确认新密码")
												);
											}
											if (
												value &&
												getFieldValue("newPassword") !==
													value
											) {
												return Promise.reject(
													new Error(
														"两次输入的密码不一致"
													)
												);
											}
											return Promise.resolve();
										},
									}),
								]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder="再次输入新密码"
								/>
							</Form.Item>
							<Button type="primary" htmlType="submit" block>
								更新密码
							</Button>
						</Form>
					</Tabs.TabPane>
				</Tabs>
			</Modal>

			{/* 活动信息部分 */}
			<Card
				title={<div className="text-xl font-bold">我的活动管理</div>}
				className="rounded-2xl shadow-lg"
				extra={
					<Select
						mode="multiple"
						allowClear
						placeholder="状态筛选"
						onChange={handleActiveChange}
						options={activeStatusOptions}
						className="min-w-[180px]"
					/>
				}
			>
				<div
					className={`grid gap-4 grid-cols-1 md:grid-cols-2
    				${myActive?.length >= 5 ? "h-[38vh] overflow-y-auto pr-3" : ""}
    				grid-auto-rows min-max(200px, auto)`}
				>
					{myActive?.map((cardInfo) => (
						<div key={cardInfo.id}>
							<AddActiveCard myActive={cardInfo} />
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}
