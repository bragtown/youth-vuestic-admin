import * as types from '../../mutation-types'
import dashboard from './dashboard'
import addyouth from './addyouth'
import ym from './ym'
import yw from './yw'
import youngwomen from './youngwomen'
import youngmen from './youngmen'

const state = {
  items: [
    dashboard,
    addyouth,
    ym,
    yw

  ]
}

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM] (state, payload) {
    let menuItem = payload.menuItem
    let expand = payload.expand
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand
    }
  }
}

const actions = {
  toggleExpandMenuItem ({commit}, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
