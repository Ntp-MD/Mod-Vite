import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Import the Home component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Set Home.vue as the component for the home route
  },
  // Other routes for different pages (e.g., About, Contact)
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
