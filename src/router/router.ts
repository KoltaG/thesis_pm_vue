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
import ProjectDetails from "../pages/ProjectDetails.vue";
import UserManagement from "../pages/UserManagement.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: Dashboard,
      },
      {
        path: "/project/:id",
        component: ProjectDetails,
      },
      {
        path: "/user-management",
        component: UserManagement,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const { authState } = useAuth();

    // If not logged in, redirect to login
    if (!authState.value.isLoggedIn && to.path !== "/login") {
      next({ path: "/login" });
    }
    // If logged in and trying to access /login, redirect to home
    else if (authState.value.isLoggedIn && to.path === "/login") {
      next({ path: "/" });
    } else {
      // Allow the navigation
      next();
    }
  }
);

export default router;
