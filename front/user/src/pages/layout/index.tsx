import { Outlet } from "react-router-dom";
import HeaderBar from "./haderbar";
import useLayout from "../../hooks/layout/uselayout";

export default function Layout() {
	useLayout()
	return (
		<div className="flex flex-col h-full">
			<HeaderBar />
			<Outlet />
		</div>
	);
}
