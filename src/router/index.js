import Vue from 'vue'
import VueRouter from 'vue-router'
import Bloger from '../views/Bloger.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/accounts/:id',
		name: 'Bloger',
		component: Bloger,
	},
]

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})
