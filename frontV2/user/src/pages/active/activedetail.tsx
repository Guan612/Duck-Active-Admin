import { ActiveDto } from "../../dto/activeDto";
import useActiveDetail from "../../hooks/active/useactivedetail";

export default function ActiveDetail() {
	const { backActive, joinStatus, activeDetail, joinActive } =
		useActiveDetail();
	return (
		<div className="flex flex-col">
			<button
				className="btn btn-primary w-1/12"
				onClick={() => backActive()}
			>
				返回
			</button>
			<h1 className="text-4xl font-bold text-center">活动详情</h1>
			<img
				className="w-1/2 mx-auto my-4 rounded-lg shadow-lg"
				src={activeDetail.activitieImgUrl}
				alt="Shoes"
			/>
			<p className="text-2xl font-bold text-center">
				{activeDetail.title}
			</p>
			<p>{activeDetail.content}</p>
			<p>{activeDetail.startDate}</p>
			<p>{activeDetail.activeAddress}</p>
			<button
				className="btn btn-primary w-1/12 mx-auto"
				disabled={joinStatus}
				onClick={() => joinActive(activeDetail.id)}
			>
				报名
			</button>
		</div>
	);
}
