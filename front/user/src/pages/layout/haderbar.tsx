import { Avatar, Button, Popover, Dropdown, Layout, Input, Menu } from "antd";
import useHeaderBar from "../../hooks/layout/usehaderbar";
import {
	UnorderedListOutlined,
	UserOutlined,
	SearchOutlined,
	DownOutlined,
	MenuOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
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
		<div className="bg-white/90 backdrop-blur-sm shadow-sm z-50 sticky top-0 px-4 md:px-6 h-16 transition-all duration-300">
			<div className="max-w-7xl mx-auto flex items-center h-full justify-between">
				{/* 左侧导航 - Enhanced with spacing and animation */}
				<div className="flex items-center gap-5">
					<Link to="/" className="flex items-center gap-2">
						<div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-transform hover:scale-105">
							鸭鸭活动
						</div>
					</Link>

					{/* 桌面导航 - Improved hover effects */}
					<nav className="hidden md:flex items-center gap-6 ml-4">
						{navItems.map((item) => (
							<NavLink
								key={item.key}
								to={item.path}
								className={({ isActive }) =>
									`font-medium transition-colors duration-200 ${
										isActive
											? "text-blue-600 font-semibold"
											: "text-gray-600 hover:text-blue-500"
									}`
								}
							>
												{item.label}
							</NavLink>
						))}
					</nav>
						</div>

				{/* 右侧功能区 - Better spacing and consistency */}
				<div className="flex items-center gap-3">
					{/* 搜索栏 - Modern styling */}
					<div className="hidden md:flex items-center w-56">
						<Search
							placeholder="搜索活动..."
							enterButton={
								<Button
									type="text"
									icon={<SearchOutlined className="text-blue-500" />}
									className="rounded-r-full"
								/>
}
							onSearch={onSearch}
							className="rounded-full border-gray-200 hover:border-blue-300"
						/>
					</div>

					<div className="flex items-center gap-3">
						{/* 用户信息 - Polished dropdown */}
						{userInfo ? (
							<Dropdown menu={userMenu} trigger={["click"]}>
								<button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-all duration-200">
									<Avatar
										src={userInfo?.headerimg}
										icon={<UserOutlined />}
										className="border border-blue-100 shadow-sm"
										size={34}
									/>
									<span className="text-gray-800 font-medium hidden lg:block truncate max-w-[120px]">
										{userInfo.nickname || userInfo.loginId}
									</span>
									<DownOutlined className="text-gray-400 text-xs ml-1"/>
								</button>
							</Dropdown>
						) : (
							<Button
								type="primary"
								shape="round"
								onClick={goLogin}
								className="h-9 font-medium px-5 shadow-sm hover:shadow-md transition-shadow"
							>
								<span className="transform hover:-translate-y-0.5 transition-transform">
									登录/注册
								</span>
							</Button>
						)}

						{/* 移动端菜单 - Better icon alignment */}
						<div className="md:hidden flex items-center">
							<Dropdown
								menu={{
									items: navItems.map(item => ({
										key: item.key,
										label: (
											<Link to={item.path} className="px-4 py-2 block">
												{item.label}
											</Link>
										)
									})),
								}}
								overlayClassName="shadow-lg rounded-xl"
							>
								<Button
									type="text"
									icon={<MenuOutlined className="text-xl text-gray-600" />}
									className="flex items-center justify-center w-10 h-10"
								/>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
