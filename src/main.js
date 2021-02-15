import Vue from 'vue'
import axios from 'axios'
import PaginationCmp from 'laravel-vue-pagination'
import router from './router'
import store from './store'
import App from './App.vue'
import roundNumber from './filters/roundNumber'
import slashedList from './filters/slashedList'
import {ApiBaseUrl} from './api/info'
import './assets/css/main.css'

Vue.config.productionTip = false

Vue.component('pagination', PaginationCmp)
Vue.filter('round', roundNumber)
Vue.filter('slashedList', slashedList)
axios.defaults.baseURL = ApiBaseUrl

new Vue({
	beforeCreate() {
		this.$store.dispatch('loadUser')
			.then(token => {
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			})
	},
	router,
	store,
	render: h => h(App),
}).$mount('#app')

