export default function CarouselBar() {
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex font-bold text-3xl m-3">鸭鸭活动管理</div>
			<div className="carousel w-full md:w-2/3 m-2">
				<div id="item1" className="carousel-item w-full">
					<img
						src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
						className="w-full rounded-2xl"
					/>
				</div>
				<div id="item2" className="carousel-item w-full">
					<img
						src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
						className="w-full rounded-2xl"
					/>
				</div>
				<div id="item3" className="carousel-item w-full">
					<img
						src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
						className="w-full rounded-2xl"
					/>
				</div>
				<div id="item4" className="carousel-item w-full">
					<img
						src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
						className="w-full rounded-2xl"
					/>
				</div>
			</div>
			<div className="flex w-1/2 justify-center gap-2 py-2">
				<a href="#item1" className="btn btn-xs">
					1
				</a>
				<a href="#item2" className="btn btn-xs">
					2
				</a>
				<a href="#item3" className="btn btn-xs">
					3
				</a>
				<a href="#item4" className="btn btn-xs">
					4
				</a>
			</div>
		</div>
	);
}
