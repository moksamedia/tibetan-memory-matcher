
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/dates', component: () => import('pages/DatesPage.vue') },
      { path: '/numbers', component: () => import('pages/NumbersPage.vue') },      { path: '/numbers', component: () => import('pages/NumbersPage.vue') },
      { path: '/numbers', component: () => import('pages/NumbersPage.vue') },      { path: '/times', component: () => import('pages/TimesPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
