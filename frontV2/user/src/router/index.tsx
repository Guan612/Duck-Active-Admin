import { useRoutes, Navigate } from "react-router";

import Layout from "../pages/layout";
import Home from "../pages/home";
import Me from "../pages/me";

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
				path: "/me",
				element: <Me />,
			},
		],
	},
];

export default function Router() {
	return useRoutes(routes);
}
