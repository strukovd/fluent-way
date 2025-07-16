import type { RouteRecordRaw } from "vue-router";
import LoginPage from "../components/pages/LoginPage.vue";
import WelcomePage from "../components/pages/WelcomePage.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/welcome",
		alias: "/",
		name: "main",
		component: WelcomePage,
		meta: {
			public: false,
			title: `Главная`,
			layout: "WelcomeLayout",
		},
	},

	{
		path: "/login",
		name: "login",
		component: LoginPage,
		meta: {
			public: true,
			title: `Авторизация`,
			layout: "DefaultLayout",
		},
	},

	{
		path: "/vocabulary",
		name: "VocabularyPage",
		component: () => import("../components/pages/VocabularyPage.vue"),
		meta: {
			public: false,
			title: `Изучение новых слов`,
			layout: "DefaultLayout",
		}
	},

	{
		path: "/vocabulary/learn",
		name: "LearnPage",
		component: () => import("../components/pages/LearnPage.vue"),
		meta: {
			public: false,
			title: `Изучение новых слов`,
			layout: "DefaultLayout",
		}
	},

	{
		path: "/plan",
		name: "PlanPage",
		component: () => import("../components/pages/PlanPage.vue"),
		meta: {
			public: false,
			title: `План`,
			layout: "DefaultLayout",
		}
	},

	// {
	// 	path: "/:pathMatch(.*)*",
	// 	name: "NotFoundPage",
	// 	component: () =>
	// 		import("../components/pages/ServicePages/NotFoundPage.vue"),
	// },
];

export default routes;
