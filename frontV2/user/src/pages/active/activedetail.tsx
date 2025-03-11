import dayjs from "dayjs";
import useActiveDetail from "../../hooks/active/useactivedetail";
import { ActiveDto, ActivitieType } from "../../dto/activeDto";
import { CiLocationOn, CiClock1, CiUser } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";

export default function ActiveDetail() {
	const { backActive, joinStatus, activeDetail, joinActive } =
		useActiveDetail();
	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8">
			<button 
				className="btn btn-ghost hover:bg-gray-100 mb-4"
				onClick={() => backActive()}
			>
				← 返回活动列表
			</button>

			<div className="space-y-8">
				<header className="text-center space-y-4">
					<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
						{activeDetail.title}
						<div className="divider w-24 mx-auto my-2" />
					</h1>
					
					<div className="badge badge-lg badge-accent gap-1">
						<CiUser className="text-lg" />
						<span>
							{activeDetail.remainingNum}/{activeDetail.activitiePeopleNum}人参与
						</span>
					</div>
				</header>

				<div className="card bg-base-100 shadow-xl overflow-hidden">
					<figure className="relative aspect-video">
						<img
							className="w-full h-full object-cover"
							src={activeDetail.activitieImgUrl}
							alt="活动图片"
						/>
						<div className="absolute bottom-4 right-4 badge badge-outline gap-1">
							<BiCategory />
							{ActivitieType[activeDetail.activitieType] || "未知类型"}
						</div>
					</figure>

					<div className="card-body p-6 md:p-8 space-y-6">
						<article className="prose max-w-none text-gray-700 leading-relaxed">
							{activeDetail.content}
						</article>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
							<div className="flex items-start gap-3">
								<CiClock1 className="flex-shrink-0 text-xl mt-1 text-primary" />
								<div>
									<p className="text-sm text-gray-500">活动时间</p>
									<p className="font-medium">
										{dayjs(activeDetail.startDate).format("YYYY-MM-DD HH:mm")}
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<CiLocationOn className="flex-shrink-0 text-xl mt-1 text-primary" />
								<div>
									<p className="text-sm text-gray-500">活动地点</p>
									<p className="font-medium">{activeDetail.activeAddress}</p>
								</div>
							</div>
						</div>

						<div className="text-center">
							<button
								className={`btn ${joinStatus ? 'btn-success' : 'btn-primary'} 
									px-10 py-4 text-lg transition-transform hover:scale-105`}
								disabled={joinStatus}
								onClick={() => joinActive(activeDetail.id)}
							>
								{joinStatus ? (
									<>
										已报名
									</>
								) : (
									"立即报名"
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
