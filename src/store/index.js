import Vue from 'vue'
import Vuex from 'vuex'
import tab from './modules/tab'
import menu from './modules/menu'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tab,
        menu,
        user
    }
})