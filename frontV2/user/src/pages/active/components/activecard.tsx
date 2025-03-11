import dayjs from "dayjs";
import { ActiveDto, ActivitieType } from "../../../dto/activeDto";
import useActiveCard from "../../../hooks/active/useactivecard";

export default function ActiveCard({ cardItem }: { cardItem: ActiveDto }) {
	const { goActiveDetail } = useActiveCard();

	return (
		<div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
			<figure className="relative h-48">
				<img
					src={cardItem.activitieImgUrl}
					alt={cardItem.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute top-2 right-2 badge badge-accent gap-1">
					{ActivitieType[cardItem.activitieType] || "未知类型"}
				</div>
			</figure>
			
			<div className="card-body p-4 flex-grow">
				<h2 className="card-title text-lg mb-2">{cardItem.title}</h2>
				<p className="text-gray-600 line-clamp-3 text-sm mb-4 flex-grow">
					{cardItem.content}
				</p>
				
				<div className="space-y-2 mb-4">
					<div className="flex items-center text-sm text-gray-500">
						<span>
							开始时间：{dayjs(cardItem.startDate).format("YYYY-MM-DD")}
						</span>
					</div>
				</div>

				<div className="card-actions justify-between">
					<button 
						className="btn btn-primary btn-sm flex-1"
						onClick={() => goActiveDetail(cardItem.id)}
					>
						查看详情
					</button>
					<button className="btn btn-outline btn-sm flex-1">
						快速报名
					</button>
				</div>
			</div>
		</div>
	);
}