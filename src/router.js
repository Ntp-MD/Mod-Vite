import { createRouter, createWebHistory } from "vue-router";

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/views/*.vue");

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  const name = path.split("/").pop().replace(".vue", "");

  return {
    path: name.toLowerCase() === "home" ? "" : `/${name.toLowerCase()}`, // Set "url /" for Home.vue
    name: name.toLowerCase(), // Use the file name as the route name in lowercase
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

router.beforeEach((to, from, next) => {
  // Perform actions before navigation
  next();
});

export default router;
