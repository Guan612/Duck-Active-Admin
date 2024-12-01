import { Select } from "antd";

export default function Active() {
	const options = [];
	for (let i = 10; i < 36; i++) {
	options.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
	}
	const handleChange = (value) => {
	console.log(`selected ${value}`);
	};
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="flex flex-col">
				<div className="text-2xl font-bold m-4 text-center">活动选择</div>
				<div className="flex flex-col md:flex-row">
				<div className="flex justify-center items-center mx-2">
					<div>选择活动</div>
					<Select
						className="w-64 mx-1"
						mode="multiple"
						allowClear
						placeholder="选择活动"
						defaultValue={['a10', 'c12']}
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
						defaultValue={['a10', 'c12']}
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
						defaultValue={['a10', 'c12']}
						onChange={handleChange}
						options={options}
					/>
				</div>
					
				</div>
				
			</div>
		</div>
	);
}
