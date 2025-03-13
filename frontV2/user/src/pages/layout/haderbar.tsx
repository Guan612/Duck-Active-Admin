import useHeaderBar from "../../hooks/layout/usehaderbar";
import { HiSearch, HiUserCircle, HiLogout } from "react-icons/hi";

export default function HaderBar() {
	const { userInfo, logOut, goLogin, goMe } = useHeaderBar();
	return (
		<div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
			{/* 左侧品牌标识 */}
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><a href="/active" className="hover:bg-primary/10 active:bg-primary/20">活动</a></li>
					</ul>
				</div>
				<a href="/" className="btn btn-ghost px-2 hover:bg-transparent">
					<span className="text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-bold">
						鸭鸭活动管理
					</span>
				</a>
			</div>

			{/* 中间导航 */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal gap-2 px-1">
					<li>
						<a href="/active" className="btn btn-ghost text-lg font-medium hover:bg-primary/10 hover:text-primary">
							活动
						</a>
					</li>
				</ul>
			</div>

			{/* 右侧功能区 */}
			<div className="navbar-end gap-2">
				{/* 搜索栏 */}
				<div className="relative group">
					<button className="btn btn-ghost btn-circle md:hidden">
						<HiSearch className="w-6 h-6" />
					</button>
					<div className="hidden md:flex items-center gap-2 transition-all duration-300">
						<input
							type="text"
							placeholder="搜索活动..."
							className="input input-bordered w-48 lg:w-64 focus:ring-2 focus:ring-primary"
						/>
					</div>
				</div>

				{/* 用户功能区 */}
				{userInfo ? (
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary hover:ring-offset-2">
							<div className="w-10 rounded-full">
								<img
									src={userInfo.headerimg || "https://www.svgrepo.com/show/192244/man-user.svg"}
									alt="用户头像"
									className="object-cover"
								/>
							</div>
						</label>
						
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li className="px-4 py-3 border-b">
								<div className="font-bold text-lg text-center truncate">{userInfo.nickname || userInfo.loginId}</div>
							</li>
							<li>
								<button 
									onClick={goMe}
									className="rounded-lg py-2 flex items-center gap-2 hover:bg-primary/10"
								>
									<HiUserCircle className="w-5 h-5 text-primary" />
									个人中心
								</button>
							</li>
							<li>
								<button
									onClick={logOut}
									className="rounded-lg py-2 flex items-center gap-2 hover:bg-red-100 text-red-600"
								>
									<HiLogout className="w-5 h-5" />
									退出登录
								</button>
							</li>
						</ul>
					</div>
				) : (
					<button 
						onClick={goLogin}
						className="btn btn-primary btn-outline gap-2"
					>
						<HiUserCircle className="w-5 h-5" />
						立即登录
					</button>
				)}
			</div>
		</div>
	);
}