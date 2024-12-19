import { Select,DatePicker } from "antd";
import useActive from "../../hooks/active/useactive";
import ActiveCard from "./components/activecard";
import { ActiveDto } from "../../dto/activeDto";

export default function Active() {
	const { RangePicker } = DatePicker;
	const { handleChange, options, cardItems, activitieTypeOption } = useActive();
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="flex flex-col">
				<div className="text-2xl font-bold m-4 text-center">
					活动选择
				</div>
				<div className="flex flex-col justify-center md:flex-row">
					<div className="flex justify-center items-center m-2">
						<div>选择类型</div>
						<Select
							className="w-64 mx-1"
							mode="multiple"
							allowClear
							placeholder="选择类型"
							onChange={handleChange}
							options={activitieTypeOption}
						/>
					</div>

					<div className="flex justify-center items-center m-2">
						<div>选择时间</div>
						<RangePicker
							className="w-64 mx-1"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4  max-w-7xl mx-auto m-2">
					{cardItems.map((cardItem: ActiveDto) => (
						<div
							className="rounded-xl m-2 shadow-lg bg-gradient-to-r from-transblue via-white to-transpink hover:shadow-xl hover:scale-105"
							key={cardItem.id}
						>
							<ActiveCard cardInfo={cardItem} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
