import { createRouter, createWebHistory } from 'vue-router';

// Dynamically import all `.vue` files from the `views` folder
const viewFiles = import.meta.glob('@/views/*.vue');

// Dynamically create routes for each file
const routes = Object.keys(viewFiles).map((path) => {
  const name = path.split('/').pop().replace('.vue', ''); // Extract page name from file path
  return {
    path: `/${name.toLowerCase()}`, // Use file name as route path (e.g., "/page1")
    component: viewFiles[path], // Use the dynamically imported component
  };
});

// Add a fallback route for when no route matches
routes.push({
  path: '/:pathMatch(.*)*', // Catch-all route
  component: viewFiles['/src/views/NotFound.vue'] || null, // Optional: Set a NotFound component
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
