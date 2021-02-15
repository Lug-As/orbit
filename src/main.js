import Vue from 'vue'
import PaginationCmp from 'laravel-vue-pagination'
import App from './App.vue'
import router from './router'
import store from './store'
import roundNumber from './filters/roundNumber'
import slashedList from './filters/slashedList'
import './assets/css/main.css'

Vue.config.productionTip = false
Vue.component('pagination', PaginationCmp)
Vue.filter('round', roundNumber)
Vue.filter('slashedList', slashedList)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')

