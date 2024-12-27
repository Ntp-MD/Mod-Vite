import { createRouter, createWebHistory } from "vue-router";

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/views/*.vue");

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  // Extract the file name without extension (e.g., "Dashboard" from "Dashboard.vue")
  const name = path.split("/").pop().replace(".vue", "");

  return {
    path: name.toLowerCase() === "Home" ? "/" : `/${name.toLowerCase()}`, // Set "/" for Home.vue
    name, // Use the file name as the route name
    component: viewFiles[path], // Dynamically imported component
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

// Error handling for dynamic imports
router.beforeEach((to, from, next) => {
  const matchedRoute = routes.find((route) => route.path === to.path);
  if (matchedRoute && typeof matchedRoute.component === "function") {
    matchedRoute.component().catch((err) => {
      console.error(`Failed to load component for route ${to.path}:`, err);
      next("/"); // Redirect to home or a custom error page
    });
  } else {
    next();
  }
});

export default router;
