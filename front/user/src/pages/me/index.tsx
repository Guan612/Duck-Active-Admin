import UserInfo from "./components/userinfo";
import UserStatistics from "./components/userstatistics";

export default function Me() {
	return (
		<div className="flex flex-col md:flex-row items-center h-full bg-gray-50">
			<div className="w-full md:w-1/2">
				<UserInfo></UserInfo>
			</div>
			<div className="w-full md:w-1/2">
				<UserStatistics></UserStatistics>
			</div>
		</div>
	);
}
