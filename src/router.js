import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth";

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/**/*.vue");

const pageTarget = ["namepage1", "namepage1"];
const publicPages = ["/login"];

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  const name = path.split("/").pop().replace(".vue", "");
  const isToggleHide = pageTarget.includes(name.toLowerCase());

  return {
    path: name.toLowerCase() === "dashboard" ? "/" : `/${name.toLowerCase()}`,
    name: name.toLowerCase(),
    component: viewFiles[path],
    meta: {
      HideThis: !isToggleHide,
      requiresAuth: !publicPages.includes(`/${name.toLowerCase()}`),
    },
  };
});

// Add a fallback route for unmatched paths (NotFound.vue)
if (viewFiles["/src/views/NotFound.vue"]) {
  routes.push({
    path: "/:pathMatch(.*)*",
    component: viewFiles["/src/views/NotFound.vue"],
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Initialize auth state from localStorage
  authStore.initializeAuth();

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    next("/login");
  } else if (to.path === "/login" && authStore.isAuthenticated) {
    // Redirect to home if already authenticated
    next("/");
  } else {
    next();
  }
});

export default router;
