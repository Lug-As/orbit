import Vue from 'vue'
import Vuex from 'vuex'
import blogers from '@/store/modules/blogers'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		blogers,
	},
})
