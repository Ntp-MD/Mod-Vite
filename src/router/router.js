import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// auto-load real pages under /views
const START_PAGE_NAME = "onlinewebsiteviews"; // must match lowercase route name

// auto-load real pages under /pages
const viewFiles = import.meta.glob("@/**/**/*.vue", { eager: false });

const childRoutes = Object.keys(viewFiles)
  .filter((p) => !p.endsWith("/AppLayout.vue"))
  .map((p) => {
    const name = p.split("/").pop().replace(".vue", "");
    const routeName = name.toLowerCase();
    return {
      path: routeName === "home" || routeName === "index" ? "" : routeName,
      name: routeName,
      component: viewFiles[p],
      meta: { requiresAuth: true },
    };
  });

// ensure root redirects to the desired start tab
childRoutes.unshift({
  path: "",
  redirect: { name: START_PAGE_NAME },
  meta: { requiresAuth: true },
});

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/",
    component: () => import("../Layout/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: childRoutes,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../ui/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  auth.initializeAuth();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: "login", query: { redirect: to.fullPath } });
  }

  if (to.meta.guest && auth.isAuthenticated) {
    // If authenticated, send to preferred start page
    return next({ name: auth.startPage && childRoutes.some((r) => r.name === auth.startPage) ? auth.startPage : START_PAGE_NAME });
  }

  // When authenticated and landing on root (or no route name), choose start page:
  if (auth.isAuthenticated && (to.path === "/" || !to.name)) {
    if (to.query && to.query.redirect) return next({ path: String(to.query.redirect) });

    // 1) explicit startPage from auth store (if valid)
    if (auth.startPage && childRoutes.some((r) => r.name === auth.startPage)) {
      return next({ name: auth.startPage });
    }

    // 2) prefer Dashboard if it exists
    if (childRoutes.some((r) => r.name === START_PAGE_NAME)) {
      return next({ name: START_PAGE_NAME });
    }

    // 3) fallback to first available child
    const defaultChild = childRoutes.find((r) => r.name);
    if (defaultChild) return next({ name: defaultChild.name });
  }

  next();
});

export default router;
// ...existing code...
