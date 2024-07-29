import { createRouter, createWebHistory } from "vue-router";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import login from "../components/login.vue";
import VueCookies from "vue-cookies";
// import { reload } from "firebase/auth";



const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/users",
    name: "users",
    // meta: { requiresAuth: true },
    component: () => import("../components/users.vue"),
    meta: { requiresAuth: true},
  },
  {
    path: "/addUsers",
    name: "addUsers",
    // meta: { requiresAuth: true },
    component: () => import("../components/addUsers.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/update",
    name: "update",
    // meta: { requiresAuth: true },
    component: () => import("../components/update.vue"),
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Verificar si la cookie de autenticación está presente
  const userAuthenticated = VueCookies.get("userAuthenticated");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !userAuthenticated
  ) {
    next({ name: "login" });
  } else if (to.name === "login" && userAuthenticated) {
    next({ name: "users" });
  } else {
    next();
  }
});

export default router;
