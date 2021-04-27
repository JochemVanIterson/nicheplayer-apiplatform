const routes = [
  {
    path: '/',
    component: () => import('pages/Home.vue')
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
      { path: 'my/playlist/:id', component: () => import('pages/myMusic/Playlist.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresLogin: true },
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', component: () => import('pages/admin/Dashboard.vue'), meta: { title: 'Dashboard' } },

      { path: 'users', component: () => import('pages/admin/Users/List.vue'), meta: { title: 'Users' } },
      { path: 'users/create', component: () => import('pages/admin/Users/Create.vue'), meta: { title: 'Users' } },
      { path: 'users/:id/show', component: () => import('pages/admin/Users/Show.vue'), meta: { title: 'Users' } },
      { path: 'users/:id/edit', component: () => import('pages/admin/Users/Edit.vue'), meta: { title: 'Users' } },

      { path: 'albums', component: () => import('pages/admin/Albums/List.vue'), meta: { title: 'Albums' } },
      { path: 'albums/create', component: () => import('pages/admin/Albums/Create.vue'), meta: { title: 'Albums' } },
      { path: 'albums/:id/show', component: () => import('pages/admin/Albums/Show.vue'), meta: { title: 'Albums' } },
      { path: 'albums/:id/edit', component: () => import('pages/admin/Albums/Edit.vue'), meta: { title: 'Albums' } },

      { path: 'songs', component: () => import('pages/admin/Songs/List.vue'), meta: { title: 'Songs' } },
      { path: 'songs/create', component: () => import('pages/admin/Songs/Create.vue'), meta: { title: 'Songs' } },
      { path: 'songs/:id/show', component: () => import('pages/admin/Songs/Show.vue'), meta: { title: 'Songs' } },
      { path: 'songs/:id/edit', component: () => import('pages/admin/Songs/Edit.vue'), meta: { title: 'Songs' } },

      { path: 'media_objects', component: () => import('pages/admin/MediaObjects/List.vue'), meta: { title: 'Media' } },
      { path: 'media_objects/create', component: () => import('pages/admin/MediaObjects/Create.vue'), meta: { title: 'Media' } },
      { path: 'media_objects/:id/show', component: () => import('pages/admin/MediaObjects/Show.vue'), meta: { title: 'Media' } },
      { path: 'media_objects/:id/edit', component: () => import('pages/admin/MediaObjects/Edit.vue'), meta: { title: 'Media' } }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
    meta: { hideForAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('pages/RegisterPage.vue'),
    meta: { hideForAuth: true }
  },
  {
    path: '/player',
    name: 'Player',
    meta: { requiresLogin: true },
    component: () => import('pages/FullscreenPlayer.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
