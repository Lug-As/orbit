import Vue from 'vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'
import vSelect from 'vue-select'
import router from './router'
import store from './store'
import App from './App.vue'
import PaginationCmp from './components/pagination/Pagination'
import roundNumber from './helpers/filters/roundNumber'
import slashedList from './helpers/filters/slashedList'
import cutText from './helpers/filters/cutText'
import phoneNumber from './helpers/filters/phoneNumber'
import inputMask from './helpers/directives/inputMask'
import titleMixin from './helpers/mixins/titleMixin'
import {ApiBaseUrl} from './api/info'
import './assets/css/main.css'
import 'vue-select/dist/vue-select.css'
import './assets/css/my.scss'


Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(vClickOutside)
Vue.component('v-select', vSelect)
Vue.component('pagination', PaginationCmp)
Vue.directive('mask', inputMask)
Vue.filter('round', roundNumber)
Vue.filter('phone', phoneNumber)
Vue.filter('cut', cutText)
Vue.filter('slashedList', slashedList)
Vue.mixin(titleMixin)

axios.defaults.baseURL = ApiBaseUrl

Vue.prototype.$onUserLoad = {
	hook(callback) {
		this.stack.push(callback)
	},
	stack: [],
}

new Vue({
	beforeCreate() {
		this.$store.dispatch('loadUser')
			.then(token => {
				if (token) {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
					this.$onUserLoad.stack.forEach(func => func())
				}
			})
	},
	router,
	store,
	render: h => h(App),
}).$mount('#app')

