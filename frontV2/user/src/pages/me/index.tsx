import UserData from "./components/userdata";
import UserInfo from "./components/userinfo";

export default function Me() {
	return (
		<div className="flex flex-col">
			<h1 className="text-4xl font-bold text-center m-3">个人中心</h1>
			<div className="flex flex-col md:flex-row gap-4 m-2">
				<div className="w-full md:w-1/2 min-w-[300px]">
					<UserInfo />
				</div>
				<div className="w-full md:w-1/2 min-w-[300px]">
					<UserData />
				</div>
			</div>
		</div>
	);
}
