import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'
import user from './modules/user'
import topics from './modules/topics'
import types from './modules/types'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		accounts, user, topics, types,
	},
})
