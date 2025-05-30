import { Select, DatePicker, Card, Row, Col, Typography, Space } from "antd";
import useActive from "../../hooks/active/useactive";
import ActiveCard from "./components/activecard";
import { ActiveDto } from "../../dto/activeDto";
import { ThunderboltOutlined, FilterOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function Active() {
	const {
		activeTypeHandleChange,
		cardItems,
		activitieTypeOption,
		activeTimeHandleChange,
	} = useActive();

	return (
		<div className="p-4 md:p-8 bg-gray-50 min-h-screen">
			<Card className="rounded-2xl shadow-xs mb-6">
				<Title level={3} className="text-center mb-6">
					<ThunderboltOutlined className="text-blue-500 mr-2" />
					精彩活动探索
				</Title>

				{/* 过滤器区域 */}
				<Card
					title={
						<div className="flex items-center">
							<FilterOutlined className="text-green-500 mr-2" />
							<span>活动筛选器</span>
						</div>
					}
					className="rounded-xl mb-8"
				>
					<Row gutter={[24, 16]} justify="center">
						<Col xs={24} md={12} lg={8}>
							<Space direction="vertical" className="w-full">
								<div className="text-gray-600">活动类型</div>
								<Select
									mode="multiple"
									allowClear
									placeholder="选择活动类型"
									onChange={activeTypeHandleChange}
									options={activitieTypeOption}
									className="w-full"
									suffixIcon={<ThunderboltOutlined />}
								/>
							</Space>
						</Col>

						<Col xs={24} md={12} lg={8}>
							<Space direction="vertical" className="w-full">
								<div className="text-gray-600">时间范围</div>
								<RangePicker
									showTime={{ format: "HH:mm" }}
									format="YYYY/MM/DD HH:mm"
									onChange={activeTimeHandleChange}
									className="w-full"
									placeholder={["开始时间", "结束时间"]}
								/>
							</Space>
						</Col>
					</Row>
				</Card>

				{/* 活动卡片网格 */}
				<Title level={5} className="ml-4 mb-4">
					共 {cardItems.length} 个活动
				</Title>
				<Row gutter={[24, 24]} justify="start">
					{cardItems.map((cardItem: ActiveDto) => (
						<Col
							key={cardItem.id}
							xs={24}
							sm={12}
							md={8}
							lg={6}
							xl={6}
							className="flex"
						>
							<ActiveCard
								cardInfo={cardItem}
							/>
						</Col>
					))}
				</Row>
			</Card>

			<div className="text-center text-gray-400 mt-6 text-sm">
				数据更新于 {new Date().toLocaleDateString()}
			</div>
		</div>
	);
}