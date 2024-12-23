import { createRouter, createWebHashHistory } from "vue-router";

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/views/*.vue");

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  // Extract the file name without extension (e.g., "Dashboard" from "Dashboard.vue")
  const name = path.split("/").pop().replace(".vue", "");

  return {
    path: name.toLowerCase() === "home" ? "/" : `/${name.toLowerCase()}`, // Set "/" for Home.vue
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

// Ensure `/Home` redirects to `/` (if Home.vue exists)
if (viewFiles["/src/views/Home.vue"]) {
  routes.push({
    path: "/Home",
    redirect: "/",
  });
}

// Create the Vue Router instance
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // Use hash mode for routing
  routes,
});

export default router;
