import { Carousel } from "antd";
import useHome from "../../hooks/home/usehome";
import { ActiveDto } from "../../dto/activeDto";
export default function Home() {
	const { newactivities } = useHome();
	return (
		<div className="flex flex-col justify-center">
			<div className="m-2">
				<Carousel autoplay className="flex justify-center">
					{newactivities.map((item: ActiveDto) => (
						<div className="md:w-1/3 h-36 flex flex-col bg-transblue rounded-lg">
							<div className="font-bold text-xl m-1 text-center">
								{item.title}
							</div>
							<img
								src={item.activitieImgUrl}
								alt=""
								className="h-20 rounded-lg"
							></img>
						</div>
					))}
				</Carousel>
			</div>
			<div className="flex flex-col justify-around m-2">
				<div className="text-xl font-bold text-center">热门活动</div>
				<div className="flex flex-col md:flex-row justify-center">
					{newactivities.map((item: ActiveDto) => (
						<div className="md:w-1/3 h-36 flex flex-col bg-transblue rounded-lg m-1 p-1 hover:hover:shadow-xl">
							<div className="font-bold text-xl m-1 text-center">
								{item.title}
							</div>
							<img
								src={item.activitieImgUrl}
								alt=""
								className="h-20 rounded-lg"
							></img>
						</div>
					))}
				</div>

				<div className="text-xl font-bold text-center">热门资讯</div>
				<div className="flex flex-col md:flex-row">
					<div className="md:w-1/3 h-36 rounded-lg m-1 bg-teal-500">
						123
					</div>
					<div className="md:w-1/3 h-36 rounded-lg m-1 bg-teal-500">
						123
					</div>
					<div className="md:w-1/3 h-36 rounded-lg m-1 bg-teal-500">
						123
					</div>
				</div>
			</div>
		</div>
	);
}
