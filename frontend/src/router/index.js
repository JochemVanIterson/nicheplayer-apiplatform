import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

/* { store, ssrContext } */
export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    const requiresLogin = to.matched.some(record => record.meta.requiresLogin)
    const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

    let loginResponse
    let nextRoute

    if (requiresLogin || requiresAdmin) {
      loginResponse = await store.dispatch('system/waitForLogin')
    }

    if (!nextRoute && requiresLogin) {
      if (!loginResponse) nextRoute = { path: '/login', query: { to: to.fullPath } }
    }
    if (!nextRoute && requiresAdmin) {
      if (!loginResponse) nextRoute = { path: '/login', query: { to: to.fullPath } }
      else if (!loginResponse.roles.includes('ROLE_ADMIN')) nextRoute = { path: '/error401', query: { to: from.fullPath } }
    }
    if (!nextRoute && hideForAuth && (store.getters['system/isLoggedIn'])) nextRoute = { path: '/explore' }

    if (!nextRoute && to.name === 'MyAlbumItem') {
      const paymentResponse = await store.dispatch('cache/payments/getFromAPIByAlbum', { album: parseInt(to.params.id), joinFields: ['album'] })
      const nfcCardResponse = await store.dispatch('cache/nfc/getFromAPIByAlbum', { album: parseInt(to.params.id), joinFields: ['album'] })
      if (!nfcCardResponse && paymentResponse && paymentResponse.paymentStatus !== 'success') {
        console.log('payment exists but is not success', paymentResponse)
        nextRoute = { path: '/error401', query: { to: from.fullPath } }
      } else if (!paymentResponse && !nfcCardResponse) {
        console.log('payment and nfc card don\'t exist', paymentResponse, nfcCardResponse)
        nextRoute = { path: '/error401', query: { to: from.fullPath } }
      }
    }

    if (nextRoute) next(nextRoute)
    else next()
  })

  return Router
}
