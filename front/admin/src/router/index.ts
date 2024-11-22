import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import Auth from "@/views/auth/index.vue";
import Login from "@/views/auth/login/index.vue";
import Register from "@/views/auth/register/index.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "layout",
			component: Layout,
			children: [
				{
					path: "/",
					name: "home",
					component: Home,
					meta: { title: "首页" },
				},
			],
		},
		{
			path: "/auth",
			name: "auth",
			component: Auth,
			children: [
				{
					path: "/auth/login",
					name: "login",
					component: Login,
				},
				{
					path: "/auth/register",
					name: "register",
					component: Register,
				},
			],
		},
	],
});

router.beforeEach((to, from, next) => {
  //token部分
  next();
})

export default router;
