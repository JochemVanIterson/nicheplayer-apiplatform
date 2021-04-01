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

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
      store.dispatch("system/waitForLogin")
        .then(() => {
          next()
        })
        .catch(() => {
          console.log("to", to)
          next({
            path: "/login",
            query: {
              to: to.fullPath
            }
          })
        })
    } else if (to.matched.some(record => record.meta.hideForAuth)) {
      store.dispatch("system/waitForLogin")
        .then(() => {
          next({ path: "/explore" })
        }).catch(() => {
          next()
        })
    } else next()
  })

  return Router
}
