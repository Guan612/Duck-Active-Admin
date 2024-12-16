import dayjs from "dayjs";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useActiveDetail from "../../../hooks/active/useactivedetail";
import { ActivitieStatus, ActivitieType } from "../../../dto/activeDto";

export default function ActiveDetail() {
	const { backActive, activeDetail, joinActive, joinStatus } =
		useActiveDetail();
	return (
		<div className="flex flex-col">
			<div className="flex items-center">
				<Button
					icon={<LeftOutlined />}
					className="m-2 items-center"
					onClick={() => backActive()}
				>
					返回
				</Button>
				<h1 className="text-3xl font-bold m-4">活动详情</h1>
			</div>

			<div className="flex flex-col md:flex-row ">
				<div className="md:w-1/2 m-2 rounded-lg">
					<img
						src={activeDetail.activitieImgUrl}
						className="rounded-lg"
					></img>
				</div>
				<div className="m-4">
					<div className="flex flex-row justify-between items-center">
						<div className="font-bold text-xl">
							{activeDetail.title}
						</div>
						<div className="font-bold">
							{ActivitieStatus[activeDetail.activitStatus] ||
								"未知状态"}
						</div>
					</div>

					<div className="text-gray-500">
						活动类型：
						{ActivitieType[activeDetail.activitieType] ||
							"未知类型"}
					</div>
					<div className="text-gray-500">
						活动时间：
						{dayjs(activeDetail.startDate).format("YYYY-MM-DD")}至
						{dayjs(activeDetail.endDate).format("YYYY-MM-DD")}
					</div>
					<div className="text-gray-500">
						活动地点：{activeDetail.activeAddress}
					</div>
					<div className="text-gray-500 max-w-2xl">
						活动内容：{activeDetail.content}
					</div>
					<div className="text-gray-500">
						活动总人数/参加人数：{activeDetail.activitiePeopleNum}/{activeDetail.remainingNum}人
					</div>
					<div className="flex justify-end mt-4">
						<Button
							type="primary"
							disabled={
								activeDetail.activitStatus != 2 || joinStatus
							}
							onClick={() => joinActive(activeDetail.id)}
						>
							{joinStatus ? "已报名" : "报名活动"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
