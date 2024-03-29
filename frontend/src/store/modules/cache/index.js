// Cache

// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
import * as actions from './actions'

import albums from './albums'
import songs from './songs'
import mediaObjects from './mediaObjects'
import payments from './payments'
import users from './users'
import sources from './sources'
import playHistory from './playHistory'
import nfc from './nfc'

export default {
  namespaced: true,
  actions: actions,
  modules: {
    albums,
    songs,
    mediaObjects,
    payments,
    users,
    sources,
    playHistory,
    nfc
  }
}
