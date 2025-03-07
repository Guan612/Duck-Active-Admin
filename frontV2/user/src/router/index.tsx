import { useRoutes, Navigate } from "react-router";

import Layout from "../pages/layout";
import Home from "../pages/home";
import Me from "../pages/me";
import Active from "../pages/active";
import ActiveDetail from "../pages/active/activedetail";

const routes = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path:"/active",
				element:<Active/>,
			},
			{
				path: "/activedetail/:id",
				element: <ActiveDetail />,
			},
			{
				path: "/me",
				element: <Me />,
			},
		],
	},
];

export default function Router() {
	return useRoutes(routes);
}
