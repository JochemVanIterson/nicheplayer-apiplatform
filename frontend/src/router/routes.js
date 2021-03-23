const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/explore/Explore.vue') },
      { path: 'explore/', component: () => import('pages/explore/Explore.vue') },
      { path: 'explore/album/:id', component: () => import('pages/explore/Album.vue') },

      { path: 'my/', component: () => import('pages/myMusic/MyMusic.vue') },
      { path: 'my/album', component: () => import('pages/myMusic/Albums.vue') },
      { path: 'my/album/:id', component: () => import('pages/myMusic/AlbumsItem.vue') },
      { path: 'my/songs', component: () => import('pages/myMusic/Songs.vue') },
      { path: 'my/playlist/:id', component: () => import('pages/myMusic/Playlist.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
