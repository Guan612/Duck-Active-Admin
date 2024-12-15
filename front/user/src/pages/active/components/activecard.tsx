import dayjs from "dayjs";
import { Button, Image } from "antd";
import useActiveCard from "../../../hooks/active/useactivecard";
import { ActiveDto, ActivitieType } from "../../../dto/activeDto";
export default function ActiveCard({ cardInfo }: { cardInfo: ActiveDto }) {
	const { goActiveDetail } = useActiveCard();
	return (
		<div className="flex flex-col m-2">
			<div className="text-xl font-bold text-center">
				{cardInfo.title}
			</div>
			<div className="">
				<img
					className="rounded-lg"
					src={cardInfo.activitieImgUrl}
				></img>
			</div>
			<div className="flex justify-between items-center">
				<div>
					<div className="">
						类型：
						{ActivitieType[cardInfo.activitieType] || "未知类型"}
					</div>
					<div className="">地点：{cardInfo.activeAddress}</div>
					<div className="">
						开始时间：
						{dayjs(cardInfo.startDate).format("YYYY-MM-DD")}
					</div>
				</div>
				<Button
					className="font-bold"
					onClick={() => goActiveDetail(cardInfo.id)}
				>
					详情
				</Button>
			</div>
		</div>
	);
}
