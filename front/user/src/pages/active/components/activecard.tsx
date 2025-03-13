import dayjs from "dayjs";
import { Button, Card, Tag, Typography } from "antd";
import {
	EnvironmentOutlined,
	ClockCircleOutlined,
	AppstoreOutlined,
	ArrowRightOutlined,
} from "@ant-design/icons";
import useActiveCard from "../../../hooks/active/useactivecard";
import { ActiveDto, ActivitieType } from "../../../dto/activeDto";

const { Meta } = Card;
const { Text } = Typography;

export default function ActiveCard({ cardInfo }: { cardInfo: ActiveDto }) {
	const { goActiveDetail } = useActiveCard();

	return (
		<Card
			hoverable
			className="rounded-xl overflow-hidden w-full h-full shadow-md hover:shadow-xl transition-all duration-300"
			cover={
				<img
					alt={cardInfo.title}
					src={cardInfo.activitieImgUrl}
					className="h-48 object-cover"
				/>
			}
		>
			<div className="flex flex-col gap-3">
				<Tag
					color="geekblue"
					className="self-start text-sm px-3 py-1 rounded-full"
				>
					<AppstoreOutlined className="mr-1" />
					{ActivitieType[cardInfo.activitieType] || "未知类型"}
				</Tag>

				<Meta
					title={
						<Text
							ellipsis={{ tooltip: cardInfo.title }}
							className="text-lg font-bold text-gray-800"
						>
							{cardInfo.title}
						</Text>
					}
				/>

				<div className="flex flex-col gap-2 text-gray-600">
					<div className="flex items-center">
						<EnvironmentOutlined className="mr-2 text-red-500" />
						<Text ellipsis>{cardInfo.activeAddress}</Text>
					</div>
					<div className="flex items-center">
						<ClockCircleOutlined className="mr-2 text-green-500" />
						<span>
							{dayjs(cardInfo.startDate).format(
								"YYYY-MM-DD HH:mm"
							)}
						</span>
					</div>
				</div>

				<Button
					type="primary"
					shape="round"
					icon={<ArrowRightOutlined />}
					onClick={() => goActiveDetail(cardInfo.id)}
					className="mt-4 self-end flex items-center"
					size="middle"
				>
					查看详情
				</Button>
			</div>
		</Card>
	);
}
