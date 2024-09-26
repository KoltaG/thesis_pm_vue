import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import Login from "../pages/Login.vue";
import Layout from "../components/layout/Layout.vue";
import { useAuth } from "../composables/useAuth";
import Dashboard from "../pages/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const { authState } = useAuth();

      if (!authState.value.isLoggedIn) {
        // If user is not logged in, redirect to login page
        next({ path: "/login" });
      } else {
        // If user is logged in, proceed to the route
        next();
      }
    },

    children: [
      {
        path: "",
        component: Dashboard,
      },
      //   {
      //     path: '/project/:projectId',
      //     component: ProjectDetails,
      //     props: true, // Allow props to be passed to the component
      //   },
      //   {
      //     path: '/user-management',
      //     beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      //       const { authState } = useAuth();
      //       if (authState.value.user?.role === 'PM') {
      //         next();
      //       } else {
      //         next({ path: '/' });
      //       }
      //     },
      //     component: UserManagement,
      //   },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
