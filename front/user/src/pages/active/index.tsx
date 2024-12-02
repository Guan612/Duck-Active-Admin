import { Select } from "antd";
import useActiveCard from "../../hooks/active/useactivecard";
import useActive from "../../hooks/active/useactive";
import ActiveCard from "./components/activecard";

export default function Active() {
	const { handleChange, options } = useActive();
	const { cardItems } = useActiveCard();
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="flex flex-col">
				<div className="text-2xl font-bold m-4 text-center">
					活动选择
				</div>
				<div className="flex flex-col md:flex-row">
					<div className="flex justify-center items-center mx-2">
						<div>选择活动</div>
						<Select
							className="w-64 mx-1"
							mode="multiple"
							allowClear
							placeholder="选择活动"
							defaultValue={["a10", "c12"]}
							onChange={handleChange}
							options={options}
						/>
					</div>

					<div className="flex justify-center items-center mx-2">
						<div>选择类型</div>
						<Select
							className="w-64 mx-1"
							mode="multiple"
							allowClear
							placeholder="选择类型"
							defaultValue={["a10", "c12"]}
							onChange={handleChange}
							options={options}
						/>
					</div>

					<div className="flex justify-center items-center mx-2">
						<div>选择时间</div>
						<Select
							className="w-64 mx-1"
							mode="multiple"
							allowClear
							placeholder="选择时间"
							defaultValue={["a10", "c12"]}
							onChange={handleChange}
							options={options}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto m-2">
					{cardItems.map((index) => (
						<div
							className="rounded-xl m-2 shadow-lg bg-gradient-to-r from-transblue via-white to-transpink hover:shadow-xl hover:scale-105"
							key={index}
						>
							<ActiveCard></ActiveCard>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
