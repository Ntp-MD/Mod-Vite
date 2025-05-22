import { createRouter, createWebHistory } from "vue-router";

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/**/*.vue");

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  const name = path.split("/").pop().replace(".vue", "");
  const isToggleHide = path.includes("/smo-app/"); // Check if it's an smo-app route

  return {
    path: name.toLowerCase() === "font" ? "/" : `/${name.toLowerCase()}`,
    name: name.toLowerCase(),
    component: viewFiles[path],
    meta: {
      HideThis: !isToggleHide,
    },
  };
});

// Add a fallback route for unmatched paths (NotFound.vue)
if (viewFiles["/src/views/NotFound.vue"]) {
  routes.push({
    path: "/:pathMatch(.*)*", // Catch-all route
    component: viewFiles["/src/views/NotFound.vue"], // Dynamically import NotFound component
  });
}

// Create the Vue Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use HTML5 history mode for routing
  routes,
});

router.beforeEach((to, from, next) => {
  // Perform actions before navigation
  next();
});

export default router;
