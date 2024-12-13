import ReactECharts from "echarts-for-react";
export default function UserStatistics() {
	// 配置项
	const options = {
		title: {
			text: "得分统计",
		},
		tooltip: {},
		xAxis: {
			data: ["明德", "笃行", "尽美", "博学"],
		},
		yAxis: {},
		series: [
			{
				name: "分数",
				type: "bar",
				data: [5, 10, 5, 10],
			},
		],
	};

	return (
		<div className="flex flex-col">
			<div className="text-2xl font-bold text-center mt-2">用户统计</div>
			<div className="flex justify-center">
				<div className="h-96 w-80">
					<ReactECharts option={options} style={{ height: "100%" }} />
				</div>
			</div>
		</div>
	);
}
