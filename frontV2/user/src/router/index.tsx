import { useRoutes, Navigate } from "react-router";

import Layout from "../pages/layout";
import Home from "../pages/home";
import Me from "../pages/me";
import Active from "../pages/active";
import ActiveDetail from "../pages/active/activedetail";
import Login from "../pages/login";
import Register from "../pages/register";

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
	{
		path: "/login",
		element: <Login />,
	},
	{
		path:"/register",
		element:<Register />
	},
];

export default function Router() {
	return useRoutes(routes);
}
