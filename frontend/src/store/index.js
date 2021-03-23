import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import system from './modules/system'
import audioplayer from './modules/audioplayer'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const dataState = createPersistedState({
    paths: ['system']
  })

  const Store = new Vuex.Store({
    modules: {
      // Local system stores
      system,
      audioplayer
    },

    plugins: [dataState],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
