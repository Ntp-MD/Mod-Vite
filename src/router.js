// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// only auto-load real pages
const viewFiles = import.meta.glob("@/views/**/*.vue");

// children under AppLayout (exclude AppLayout itself to avoid recursion)
const childRoutes = Object.keys(viewFiles)
  .filter((p) => !p.endsWith("/AppLayout.vue"))
  .map((p) => {
    const name = p.split("/").pop().replace(".vue", "");
    const lower = name.toLowerCase();
    return {
      path: lower === "home" || lower === "index" ? "" : lower, // IMPORTANT: no leading slash
      name: lower,
      component: viewFiles[p],
      meta: { requiresAuth: true },
    };
  });

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/ui/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/",
    component: () => import("@/components/ui/AppLayout.vue"), // AppLayout acts as layout
    meta: { requiresAuth: true },
    children: childRoutes,
  },
  { path: "/:pathMatch(.*)*", name: "notfound", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  auth.initializeAuth();

  if (to.meta.requiresAuth && !auth.isAuthenticated) return next({ name: "login", query: { redirect: to.fullPath } });

  if (to.meta.guest && auth.isAuthenticated) return next({ path: "/" });

  next();
});

export default router;
