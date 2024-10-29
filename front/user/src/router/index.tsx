import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../pages/layout";
import Login from "../pages/login";

const routes = [
	{
		path: "/",
		element: <Layout />,
	},
	{
		path: "/login",
		element: <Login />,
	},
];

export default function Router() {
	return useRoutes(routes);
}
