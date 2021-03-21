import greetingRoutes from './greeting'
import albumRoutes from '../router/album';
import songRoutes from '../router/song';
import mediaobjectRoutes from '../router/mediaobject';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      ...greetingRoutes
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...greetingRoutes,
      ...albumRoutes,
      ...songRoutes,
      ...mediaobjectRoutes
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
