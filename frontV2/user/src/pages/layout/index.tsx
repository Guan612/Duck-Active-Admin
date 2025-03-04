import { Outlet } from "react-router";
import HaderBar from "./haderbar";

export default function Layout() {
	return (
		<div className="flex flex-col h-full">
			<HaderBar />
			<Outlet />
		</div>
	);
}
