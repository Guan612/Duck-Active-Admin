import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import Auth from "@/views/auth/index.vue";
import Login from "@/views/auth/login/index.vue";
import Register from "@/views/auth/register/index.vue";
import UserCostAdmin from "@/views/useradmin/usercostadmin.vue";
import UserInfoAdmin from "@/views/useradmin/userinfoadmin.vue";
import CreateActiveAdmin from "@/views/activeadmin/createactiveadmin.vue";
import ActiveReviewAdmin from "@/views/activeadmin/activereviewadmin.vue";
import ActiveAdmin from "@/views/activeadmin/activeadmin.vue";
import { message } from "ant-design-vue";
import { useUserStore } from "@/stores/userstore";
import Activedetailadmin from "@/views/activeadmin/activedetailadmin.vue";
import Responsibleadmin from "@/views/activeadmin/responsibleadmin.vue";
import Teacheradmin from "@/views/activeadmin/teacheradmin.vue";

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
				{
					path: "/usercostadmin",
					name: "usercostadmin",
					component: UserCostAdmin,
					meta: { title: "用户角色记录", requiresAuth: true },
				},
				{
					path: "/userinfoadmin",
					name: "userinfoadmin",
					component: UserInfoAdmin,
					meta: { title: "用户信息管理", requiresAuth: true },
				},
				{
					path: "/createactiveadmin",
					name: "createactiveadmin",
					component: CreateActiveAdmin,
					meta: { title: "创建活动", requiresAuth: true },
				},
				{
					path: "/activereviewadmin",
					name: "activereviewadmin",
					component: ActiveReviewAdmin,
					meta: { title: "活动审核管理", requiresAuth: true },
				},
				{
					path: "/activeadmin/:id",
					name: "activeadmin",
					component: ActiveAdmin,
					meta: { title: "活动管理", requiresAuth: true },
				},
				{
					path: "/activedetailadmin/:id",
					name: "activedetailadmin",
					component: Activedetailadmin,
					meta: { title: "活动详情", requiresAuth: true },
				},
				{
					path: "/activeadmin/responisble",
					name: "responisble",
					component: Responsibleadmin,
					meta: {
						title: "活动负责人管理",
						requiresAuth: true,
						roles: [1],
					},
				},
				{
					path: "/activeadmin/teacher",
					name: "teacher",
					component: Teacheradmin,
					meta: {
						title: "活动教师管理",
						requiresAuth: true,
						roles: [2, 3],
					},
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
	const userStore = useUserStore();

	if (to.meta.requiresAuth && !userStore.userInfo?.token) {
		message.error("请先登录");
		return next("/auth/login");
	}

	//学生管理员和老师管理使用不同的入口
	const role = userStore.userInfo?.role;
	if (to.meta.roles && !to.meta.roles.includes(role)) {
		message.error("角色错误，无法进入");
		return next("/");
	}

	next();
});

export default router;
