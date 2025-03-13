import { RegistrationStatus } from "../../../dto/registrationDto";
import useUserInfo from "../../../hooks/me/useuserinfo";
import {
	HiArrowRight,
	HiOutlineCalendar,
	HiOutlineMail,
	HiUserCircle,
} from "react-icons/hi";

export default function UserInfo() {
	const { myActive, userInfo } = useUserInfo();
	return (
		<div className="space-y-6 w-full">
			{/* 个人信息卡片 */}
			<div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
				<div className="card-body p-6 md:p-8">
					<div className="flex items-start gap-4">
						{/* 头像区域 */}
						<div className="avatar">
							<div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<img
									src={
										userInfo.headerimg ||
										"/default-avatar.webp"
									}
									alt="用户头像"
									className="object-cover"
								/>
							</div>
						</div>

						{/* 用户信息 */}
						<div className="flex-1 space-y-2">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<HiUserCircle className="text-primary" />
								{userInfo.nickname || userInfo.loginId}
							</h2>
							<div className="flex items-center gap-2 text-gray-600">
								<HiOutlineMail className="text-lg" />
								<span
									className={
										!userInfo.email
											? "italic text-gray-400"
											: ""
									}
								>
									{userInfo.email || "未绑定邮箱"}
								</span>
							</div>
						</div>
					</div>

					<div className="divider my-4"></div>
					<button className="btn btn-outline btn-primary self-end gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
						编辑资料
					</button>
				</div>
			</div>

			{/* 活动列表 */}
			<h3 className="text-xl font-semibold px-4 border-l-4 border-primary">
				我的活动
			</h3>
			{myActive.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{myActive.map((active) => (
						<div
							className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
							key={active.id}
						>
							<div className="card-body p-4">
								<h3 className="card-title text-lg line-clamp-1">
									{active.activitie.title}
								</h3>
								<div className="flex items-center gap-2 text-sm text-gray-500">
									<HiOutlineCalendar className="w-4 h-4" />
									<span>
										{new Date(
											active.createdAt
										).toLocaleDateString()}
									</span>
								</div>
								<div className="badge badge-outline badge-sm mt-2">
                                    {RegistrationStatus[active.status]}
                                </div>
								<div className="card-actions justify-end">
									<button className="btn btn-ghost btn-sm text-primary gap-1">
										查看详情
										<HiArrowRight className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center p-8 bg-base-200 rounded-box">
					<HiOutlineCalendar className="w-16 h-16 text-gray-400 mb-4" />
					<p className="text-gray-500">暂无参与中的活动</p>
				</div>
			)}
		</div>
	);
}
