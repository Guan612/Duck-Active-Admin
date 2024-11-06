import { Avatar } from "antd";
import useHeaderBar from "../../hooks/layout/usehaderbar";

export default function HeaderBar() {
	const { Search, onSearch } = useHeaderBar();
	return (
		<div>
			<div className="flex flex-row bg-gradient-to-r from-transblue via-white to-transpink items-center">
				<div className="m-3 flex flex-row items-center w-full justify-between">
					<div className="flex items-center">
						<div className="font-bold text-2xl p-2">鸭鸭活动</div>
						<div className="hidden md:flex flex-row ">
							<div className="mx-2 font-bold hover:scale-110">
								首页
							</div>
							<div className="mx-2 font-bold hover:scale-110">
								活动
							</div>
							<div className="mx-2 font-bold hover:scale-110">
								我的
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="hidden md:flex mx-2">
							<Search
								placeholder="输入以搜索"
								enterButton
								onSearch={onSearch}
								size="large"
							/>
						</div>
						<Avatar
							src="https://api.qicaiyun.top/sjtx/api.php?lx=c3"
							size={"large"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
