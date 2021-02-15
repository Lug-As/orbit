import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/accounts/:id',
		name: 'Account',
		component: () => import('../views/Account'),
	},
	{
		path: '/accounts',
		name: 'AccountList',
		component: () => import('../views/AccountsList'),
	},
	{
		path: '*',
		name: '404',
		component: () => import('../views/NotFound'),
	},
]

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		if (savedPosition) {
			return savedPosition
		}
		return {x: 0, y: 0}
	},
	routes,
})
