import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../pages/layout";
import Login from "../pages/login";
import Home from "../pages/home";
import Active from "../pages/active";

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
				path: "/active",
				element: <Active />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
];

export default function Router() {
	return useRoutes(routes);
}
