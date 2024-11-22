import { createRouter, createWebHashHistory } from "vue-router"; // Import hash history

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob("@/views/*.vue");

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  // Extract the file name (e.g., "Page1.vue")
  const name = path.split("/").pop().replace(".vue", "");

  return {
    path: name.toLowerCase() === "home" ? "/" : `/${name.toLowerCase()}`, // Use `/` for "Home.vue", otherwise `/page-name`
    name, // Use the file name as the route name
    component: viewFiles[path], // Dynamically imported component
  };
});

// Add a fallback route for unmatched paths
routes.push({
  path: "/:pathMatch(.*)*", // Catch-all route
  component: viewFiles["@/views/NotFound.vue"] || null, // Use NotFound.vue if it exists
});

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // Use hash mode for routing
  routes,
});

export default router;
