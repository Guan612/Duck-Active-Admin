import { useRoutes, Navigate } from "react-router-dom";

import useAuth from "../hooks/login/useauth";
import { message } from "antd";

import Layout from "../pages/layout";
import Login from "../pages/login";
import Home from "../pages/home";
import Active from "../pages/active";
import Me from "../pages/me";
import ActiveDetail from "../pages/active/components/activedetail";
import Register from "../pages/register";

const RequireAuth = ({ element }) => {
	const auth = useAuth();
	if (!auth) {
		message.error("请先登录后使用");
		return <Navigate to="/login" />;
	} else {
		return element;
	}
	//return auth ? element : <Navigate to="/auth" />;
};

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
				element: <RequireAuth element={<Active />} />,
			},
			{
				path: "/activedetail/:id",
				element: <RequireAuth element={<ActiveDetail />} />,
			},
			{
				path: "/me",
				element: <RequireAuth element={<Me />} />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path:"/register",
		element:<Register/>
	}
];

export default function Router() {
	return useRoutes(routes);
}
