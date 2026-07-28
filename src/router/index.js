import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/products', name: 'Products', component: () => import('@/views/Products.vue') },
  { path: '/solutions', name: 'Solutions', component: () => import('@/views/Solutions.vue') },
  { path: '/pricing', name: 'Pricing', component: () => import('@/views/Pricing.vue') },
  { path: '/cases', name: 'Cases', component: () => import('@/views/Cases.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/toolbox', name: 'Toolbox', component: () => import('@/views/Toolbox.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() { return { top: 0 } },
})

export default router
