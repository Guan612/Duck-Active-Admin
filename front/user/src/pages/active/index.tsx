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
			<div>
				<h1 className="text-2xl font-bold mb-4">活动选择</h1>
				<Select
					className="w-64 mx-2"
					mode="multiple"
					allowClear
					placeholder="选择活动"
					defaultValue={['a10', 'c12']}
					onChange={handleChange}
					options={options}
				/>
				<Select
					className="w-64 mx-2"
					mode="multiple"
					allowClear
					placeholder="选择类型"
					defaultValue={['a10', 'c12']}
					onChange={handleChange}
					options={options}
				/>
				<Select
					className="w-64 mx-2"
					mode="multiple"
					allowClear
					placeholder="选择时间"
					defaultValue={['a10', 'c12']}
					onChange={handleChange}
					options={options}
				/>
			</div>
		</div>
	);
}
