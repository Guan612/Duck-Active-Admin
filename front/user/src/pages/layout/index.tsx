import { Outlet } from "react-router-dom";
import HeaderBar from "./haderbar";

export default function Layout() {
	return (
		<div className="flex flex-col h-screen">
			<HeaderBar />
			<Outlet />
		</div>
	);
}
