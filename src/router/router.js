import { createRouter, createWebHistory } from "vue-router";
import login from "../components/login.vue";
import VueCookies from "vue-cookies";

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../components/users.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/addUsers",
    name: "addUsers",
    component: () => import("../components/addUsers.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/update",
    name: "update",
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
