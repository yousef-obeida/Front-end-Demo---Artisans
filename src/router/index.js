import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../view/home.vue';
import LoginView from '../view/login.vue';
import CatalogView from '../view/catalog.vue';
import { useAuth } from '../composables/useAuth.js';

const routes = [
  { path: '/', redirect: 'Home' ,component: HomeView },
  { path: '/Home', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/catalog', name: 'Catalog', component: CatalogView },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }
  if (to.name === 'Login' && isAuthenticated.value) {
    return next({ name: 'Catalog' });
  }
  return next();
});

export default router;
