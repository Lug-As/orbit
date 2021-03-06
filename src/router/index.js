import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import auth from '@/router/middleware/auth'

Vue.use(VueRouter)

const routes = [
	{
		path: '/accounts/:id',
		name: 'Account',
		component: () => import('../views/Account'),
	},
	{
		path: '/accounts',
		name: 'AccountsList',
		component: () => import('../views/AccountsList'),
	},
	{
		path: '/projects/:id',
		name: 'Project',
		component: () => import('../views/Project'),
	},
	{
		path: '/projects',
		name: 'ProjectsList',
		component: () => import('../views/ProjectsList'),
	},
	{
		path: '/profile',
		component: () => import('../views/Profile'),
		children: [
			{
				path: 'notices',
				name: 'ProfileNotices',
				meta: {
					middleware: auth,
				},
				component: () => import('../views/ProfileNotices'),
			},
			{
				path: 'accounts',
				name: 'ProfileAccounts',
				meta: {
					middleware: auth,
				},
				component: () => import('../views/ProfileAccounts'),
			},
			{
				path: 'projects',
				name: 'ProfileProjects',
				meta: {
					middleware: auth,
				},
				component: () => import('../views/ProfileProjects'),
			},
			{
				path: '',
				name: 'Profile',
				meta: {
					middleware: auth,
				},
				component: () => import('../views/ProfileInfo'),
			},
		],
	},
	{
		path: '/verify-email/:id/:hash',
		name: 'Verification',
		component: () => import('../views/Verification'),
	},
	{
		path: '*',
		name: '404',
		meta: {
			layout: false,
		},
		component: () => import('../views/NotFound'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (to.name === from.name) {
			return false
		}
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

router.beforeEach((to, from, next) => {
	if (!to.meta.middleware) {
		return next()
	}
	const middleware = to.meta.middleware
	const context = {
		to,
		from,
		next,
		store,
	}
	return middleware({
		...context,
	})
})

export default router
