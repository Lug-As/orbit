import Vue from 'vue'
import VuePagination from 'laravel-vue-pagination'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/main.css'

Vue.config.productionTip = false

Vue.component('pagination', VuePagination);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')

