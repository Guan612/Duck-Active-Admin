import { Button, Image } from "antd";
import useActiveCard from "../../../hooks/active/useactivecard";
export default function ActiveCard({ cardKey }) {
	const {goActiveDetail} = useActiveCard()
	return (
		<div className="flex flex-col m-2">
			<div className="text-xl font-bold text-center">校园原神活动展览</div>
			<div className="">
				<img
					className="rounded-lg"
					src="https://img1.baidu.com/it/u=1614944575,1449735529&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"
				></img>
			</div>
			<div className="flex justify-between items-center">
				<div>
					<div className="">类型：笃行</div>
					<div className="">地点：红蓝交界处</div>
					<div className="">开始时间：2024-12-10</div>
				</div>
				<Button className="font-bold" onClick={() => goActiveDetail(cardKey)}>详情</Button>
			</div>
		</div>
	);
}
