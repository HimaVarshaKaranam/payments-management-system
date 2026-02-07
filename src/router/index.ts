import { createRouter, createWebHistory } from 'vue-router'
import PaymentList from '../views/PaymentList.vue'
import PaymentForm from '../views/PaymentForm.vue'
import PaymentDetail from '../views/PaymentDetail.vue'
import UserList from '../views/UserList.vue'
import UserForm from '../views/UserForm.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // src/router/index.ts
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/payments', name: 'payments', component: PaymentList },
    { path: '/payments/new', component: PaymentForm },
    { path: '/payments/edit/:id', component: PaymentForm },
    { path: '/payments/:id', component: PaymentDetail },
    { path: '/users', component: UserList },
    { path: '/users/create', component: UserForm },
  ]
})

export default router