import ReactECharts from "echarts-for-react";
import useUserStatistics from "../../../hooks/me/useuserstatistics";
export default function UserStatistics() {
	const { options,options2 } = useUserStatistics();
	return (
		<div className="flex flex-col">
			<div className="text-2xl font-bold text-center mt-2">用户统计</div>
			<div className="flex justify-center">
				<div className="h-96 w-80">
					<ReactECharts option={options} style={{ height: "100%" }} />
				</div>
			</div>
			<div className="flex justify-center">
				<div className="h-96 w-80">
					<ReactECharts option={options2} style={{ height: "100%" }} />
				</div>
			</div>
		</div>
	);
}
