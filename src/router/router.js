import { createRouter, createWebHistory } from 'vue-router'
import login from '../components/login.vue';


const routes = [
    {
        path: '/',
        name: 'login',
        component: login

    },
    {
        path:'/users',
        name: 'users',
        component: () => import('../components/users.vue'),
    },
    {
        path:'/addUsers',
        name:'addUsers',
        component: () => import('../components/addUsers.vue'),
    },
   {
     path:'/update/:id',
     name:'update',
     component: () => import('../components/update.vue'),
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;
