import { createRouter, createWebHashHistory } from "vue-router";

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/views/*.vue");

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  // Extract the file name (e.g., "Dashboard.vue")
  const name = path.split("/").pop().replace(".vue", "");

  return {
    path: name.toLowerCase() === "home" ? "/" : `/${name.toLowerCase()}`, // Set "/" for Home.vue
    name, // Use the file name as the route name
    component: viewFiles[path], // Dynamically imported component
  };
});

// Add a fallback route for unmatched paths
const notFoundPath = "@/views/NotFound.vue";
if (viewFiles[notFoundPath]) {
  routes.push({
    path: "/:pathMatch(.*)*", // Catch-all route
    component: viewFiles[notFoundPath],
  });
}

// Ensure `/Home` redirects to `/`
routes.push({
  path: "/Home",
  redirect: "/",
});

// Create the Vue Router instance
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // Use hash mode for routing
  routes,
});

export default router;
