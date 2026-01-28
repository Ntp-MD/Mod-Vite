import { createRouter, createWebHistory } from "vue-router";

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
    };
  });

// ensure root redirects to the desired start tab
childRoutes.unshift({
  path: "",
  redirect: { name: START_PAGE_NAME },
});

const routes = [
  {
    path: "/",
    component: () => import("../Layout/AppLayout.vue"),
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

export default router;
