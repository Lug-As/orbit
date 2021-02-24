import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'
import user from './modules/user'
import topics from './modules/topics'
import types from './modules/types'
import ages from './modules/ages'
import regions from './modules/regions'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		accounts, user, topics, types, ages, regions, projects
	},
})
