import Vue from 'vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'
import vSelect from 'vue-select'
import router from './router'
import store from './store'
import App from './App.vue'
import PaginationCmp from './components/pagination/Pagination'
import roundNumber from './filters/roundNumber'
import slashedList from './filters/slashedList'
import cutText from './filters/cutText'
import {ApiBaseUrl} from './api/info'
import './assets/css/main.css'
import 'vue-select/dist/vue-select.css'
import './assets/css/my.scss'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(vClickOutside)
Vue.component('v-select', vSelect)
Vue.component('pagination', PaginationCmp)
Vue.filter('round', roundNumber)
Vue.filter('cut', cutText)
Vue.filter('slashedList', slashedList)

axios.defaults.baseURL = ApiBaseUrl

new Vue({
	beforeCreate() {
		this.$store.dispatch('loadUser')
			.then(token => {
				if (token) {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
					this.$store.dispatch('loadUserAccounts')
				}
			})
	},
	router,
	store,
	render: h => h(App),
}).$mount('#app')

