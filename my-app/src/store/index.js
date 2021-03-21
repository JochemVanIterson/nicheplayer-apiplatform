import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'
import greeting from './modules/greeting/'
import album from './modules/album/'
import song from './modules/song/'
import mediaobject from './modules/mediaobject/'
import playhistory from './modules/playhistory/'
import system from './modules/system'

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
      greeting,
      album,
      song,
      mediaobject,
      playhistory,
      system
    },

    plugins: [dataState],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
