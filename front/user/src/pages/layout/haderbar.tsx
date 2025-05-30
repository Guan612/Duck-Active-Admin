import { Avatar, Button, Popover, Dropdown, Layout, Input, Menu } from "antd";
import useHeaderBar from "../../hooks/layout/usehaderbar";
import {
	UnorderedListOutlined,
	UserOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Header } = Layout;
const { Search } = Input;

export default function HeaderBar() {
	const { onSearch, userInfo, logOut, goLogin, goMe } = useHeaderBar();
	const [menuVisible, setMenuVisible] = useState(false);

	const userMenu = {
		items: [
			{
				key: "1",
				label: (
					<Button
						type="text"
						block
						onClick={goMe}
						className="text-left"
					>
						个人中心
					</Button>
				),
			},
			{
				key: "2",
				label: (
					<Button
						type="text"
						danger
						block
						onClick={logOut}
						className="text-left"
					>
						退出登录
					</Button>
				),
			},
		],
	};

	const navItems = [
		{ key: "1", path: "/", label: "首页" },
		{ key: "2", path: "/active", label: "活动探索" },
		{ key: "3", path: "/me", label: "个人中心" },
	];

	return (
		<div className="bg-white/80 backdrop-blur-xs shadow-xs z-50 sticky top-0 px-4 md:px-8 h-16">
			<div className="max-w-7xl mx-auto flex items-center justify-between h-full">
				{/* 左侧导航 */}
				<div className="flex items-center gap-6">
					<Link to="/" className="flex items-center gap-2">
						<div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							鸭鸭活动
						</div>
					</Link>

					{/* 桌面导航 */}
					<nav className="hidden md:flex items-center gap-4 ml-6">
						{navItems.map((item) => (
							<Link
								key={item.key}
								to={item.path}
								className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>

				{/* 右侧功能区 */}
				<div className="flex items-stretch gap-4">
					{/* 搜索栏 */}
					<div className="hidden md:flex items-center w-64">
						<Search
							placeholder="搜索活动..."
							enterButton={
								<SearchOutlined className="text-gray-500" />
							}
							onSearch={onSearch}
							className="rounded-full h-10"
						/>
					</div>

					{/* 用户信息 */}
					{userInfo ? (
						<Dropdown menu={userMenu} trigger={["click"]}>
							<button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-full transition-colors h-10">
								<Avatar
									src={userInfo?.headerimg}
									icon={<UserOutlined />}
									className="border-2 border-blue-200"
									size={32}
								/>
								<span className="text-gray-700 font-bold hidden lg:block">
									{userInfo.nickname || userInfo.loginId}
								</span>
							</button>
						</Dropdown>
					) : (
						<Button
							type="primary"
							shape="round"
							onClick={goLogin}
							className="h-10 flex items-center"
						>
							登录/注册
						</Button>
					)}

					{/* 移动端菜单按钮 */}
					<div className="md:hidden flex items-center">
						<div className="md:hidden">
							<Dropdown
								menu={{
									items: navItems.map((item) => ({
										key: item.key,
										label: (
											<Link to={item.path}>
												{item.label}
											</Link>
										),
									})),
								}}
							>
								<Button
									type="text"
									icon={
										<UnorderedListOutlined className="text-xl" />
									}
								/>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
