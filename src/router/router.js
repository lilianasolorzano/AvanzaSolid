import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import login from "../components/login.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/users",
    name: "users",
    meta: { requiresAuth: true },
    component: () => import("../components/users.vue"),
  },
  {
    path: "/addUsers",
    name: "addUsers",
    meta: { requiresAuth: true },
    component: () => import("../components/addUsers.vue"),
  },
  {
    path: "/update",
    name: "update",
    meta: { requiresAuth: true },
    component: () => import("../components/update.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardias de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  onAuthStateChanged(auth, user => {
    if (requiresAuth && !user) {
      next('/login');
    } else {
      next();
    }
  });
});

export default router;
