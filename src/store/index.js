import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layers:[],
    style:{}
  },
  mutations: {
    addLayer (state, layer) {
      state.layers.unshift(layer)
    },
    deleteLayer(state, index) {
      state.layers.splice(index,1)
    },
    setMapStyle(state, style) {
      state.style = style
    }
  },
  actions: {
  },
  modules: {
  }
})
