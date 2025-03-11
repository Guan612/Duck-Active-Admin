import useHeaderBar from "../../hooks/layout/usehaderbar";

export default function HaderBar() {
	const { userInfo, logOut, goLogin, goMe } = useHeaderBar();
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a href="/active" className="font-bold">活动</a>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl" href="/">
					鸭鸭活动管理
				</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a href="/active" className="font-bold">活动</a>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<input
					type="text"
					placeholder="Search"
					className="input input-bordered hidden md:flex md:w-50 mx-2"
				/>
				{/* 假设已有用户状态（比如从context或store获取） */}

				{userInfo ? (
					<div className="dropdown dropdown-end">
						{/* 原始已登录内容保持不变 */}
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="rounded-full">
								<img
									alt="用户头像"
									src={
										userInfo.headerimg ||
										"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							<li>
								<a className="justify-center font-bold text-xl">
									{userInfo.nickname || userInfo.loginId}
								</a>
							</li>
							<li>
								<a className="btn btn-sm btn-soft btn-info my-2 font-bold text-black">
									个人中心
								</a>
							</li>
							<li>
								<a
									className="btn btn-sm btn-soft btn-accent font-bold text-black"
									onClick={() => logOut()}
								>
									登出
								</a>
							</li>
						</ul>
					</div>
				) : (
					<button className="btn btn-ghost" onClick={() => goLogin()}>
						去登录
					</button>
				)}
			</div>
		</div>
	);
}
