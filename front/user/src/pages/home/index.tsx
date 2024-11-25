import { Carousel } from "antd";
export default function Home() {
	return (
		<div className="flex flex-col justify-center">
			<div className="m-2">
				<Carousel autoplay className="">
					<div className="bg-teal-300 h-60 rounded-xl">
						<img
							src="https://n.sinaimg.cn/sinakd20119/600/w1920h1080/20230425/5579-5ae8a7f932ff9d2be5ddce7225c5c5dc.jpg"
							alt=""
							className="rounded-xl"
						/>
						<div className="">123</div>
					</div>
						
					<div className="bg-teal-400">456</div>
				</Carousel>
			</div>
			<div className="flex flex-row justify-around">
				<div className="w-1/3 h-36 bg-teal-500">123</div>
				<div className="w-1/3 h-36 bg-teal-500">123</div>
				<div className="w-1/3 h-36 bg-teal-500">123</div>
			</div>
		</div>
	);
}