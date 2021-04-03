const routes = [
  {
    path: '/',
    component: () => import('pages/Home.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresLogin: true },
    children: [
      { path: 'explore/', component: () => import('pages/explore/Explore.vue') },
      { path: 'explore/album/:id', component: () => import('pages/explore/Album.vue') },

      { path: 'my/album', component: () => import('pages/myMusic/Albums.vue') },
      { path: 'my/album/:id', component: () => import('pages/myMusic/AlbumsItem.vue') },
      { path: 'my/songs', component: () => import('pages/myMusic/Songs.vue') },
      { path: 'my/playlist/:id', component: () => import('pages/myMusic/Playlist.vue') },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
    meta: { hideForAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
