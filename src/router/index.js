import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/accounts/:id',
		name: 'Bloger',
		component: () => import('../views/Bloger'),
	},
	{
		path: '*',
		name: '404',
		component: () => import('../views/NotFound'),
	}
]

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})
