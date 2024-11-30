import { Carousel } from "antd";
export default function Home() {
	return (
		<div className="flex flex-col justify-center">
			<div className="m-2">
				<Carousel autoplay className="">
					<div className="flex flex-row bg-teal-300 rounded-xl">
						<img
							src="https://n.sinaimg.cn/sinakd20119/600/w1920h1080/20230425/5579-5ae8a7f932ff9d2be5ddce7225c5c5dc.jpg"
							alt=""
							className="rounded-xl h-52 justify-center"
						/>
						<div className="mx-2 text-xl font-bold">123</div>
					</div>
						
					<div className="bg-teal-400 rounded-xl">
						<img
							src="https://n.sinaimg.cn/sinakd20119/600/w1920h1080/20230425/5579-5ae8a7f932ff9d2be5ddce7225c5c5dc.jpg"
							alt=""
							className="rounded-xl h-52 items-center"
						/>
						<div className="mx-2 text-xl font-bold">456</div>
					</div>
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
