// Cache

// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
import * as actions from './actions'

import albums from './albums'
import songs from './songs'
import mediaObjects from './mediaObjects'

export default {
    namespaced: true,
    actions: actions,
    modules: {
        albums,
        songs,
        mediaObjects
    }
}
