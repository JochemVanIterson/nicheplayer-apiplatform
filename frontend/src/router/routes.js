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

      { path: 'my/album', name: 'MyAlbumList', component: () => import('pages/myMusic/Albums.vue') },
      { path: 'my/album/:id', name: 'MyAlbumItem', component: () => import('pages/myMusic/AlbumsItem.vue') },
      { path: 'my/songs', name: 'MySongs', component: () => import('pages/myMusic/Songs.vue') },
      { path: 'my/playlist/:id', component: () => import('pages/myMusic/Playlist.vue') }
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/UserSettingsLayout.vue'),
    meta: { requiresLogin: true },
    redirect: '/settings/user',
    children: [
      { path: 'user', component: () => import('pages/userSettings/User.vue'), meta: { title: 'User settings' } },
      { path: 'audioplayer', component: () => import('pages/userSettings/AudioPlayer.vue'), meta: { title: 'Audio player' } }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAdmin: true },
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
      { path: 'media_objects/:id/edit', component: () => import('pages/admin/MediaObjects/Edit.vue'), meta: { title: 'Media' } },

      { path: 'sources', component: () => import('pages/admin/Sources/List.vue'), meta: { title: 'Sources' } },
      // { path: 'sources/create', component: () => import('pages/admin/Sources/Create.vue'), meta: { title: 'Sources' } },
      { path: 'sources/:id/show', component: () => import('pages/admin/Sources/Show.vue'), meta: { title: 'Sources' } },
      // { path: 'sources/:id/edit', component: () => import('pages/admin/Sources/Edit.vue'), meta: { title: 'Sources' } },

      { path: 'payments', component: () => import('pages/admin/Payments/List.vue'), meta: { title: 'Payments' } },
      { path: 'payments/create', component: () => import('pages/admin/Payments/Create.vue'), meta: { title: 'Payments' } },
      { path: 'payments/:id/show', component: () => import('pages/admin/Payments/Show.vue'), meta: { title: 'Payments' } },
      { path: 'payments/:id/edit', component: () => import('pages/admin/Payments/Edit.vue'), meta: { title: 'Payments' } },

      { path: 'nfc', component: () => import('pages/admin/Nfc/List.vue'), meta: { title: 'Nfc' } },
      { path: 'nfc/create', component: () => import('pages/admin/Nfc/Create.vue'), meta: { title: 'Nfc' } },
      { path: 'nfc/:id/show', component: () => import('pages/admin/Nfc/Show.vue'), meta: { title: 'Nfc' } },
      { path: 'nfc/:id/edit', component: () => import('pages/admin/Nfc/Edit.vue'), meta: { title: 'Nfc' } },

      { path: 'play_history', component: () => import('pages/admin/PlayHistory/List.vue'), meta: { title: 'Play History' } },
      { path: 'play_history/:id/show', component: () => import('pages/admin/PlayHistory/Show.vue'), meta: { title: 'Play History' } }
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
  {
    path: '/nfc',
    name: 'NfcEntry',
    component: () => import('pages/NfcPage.vue')
  },

  {
    path: '/error401',
    name: 'error401',
    component: () => import('pages/Error401.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    name: 'error404',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
