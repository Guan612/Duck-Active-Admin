import { Carousel } from "antd";
export default function Home() {
	return (
		<div className="flex flex-col justify-center">
			<div className="min-w-96 h-36 m-2">
				<Carousel autoplay className="h-full">
					<div className="bg-teal-300">123</div>
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
