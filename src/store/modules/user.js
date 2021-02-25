import tokenService from '@/auth/tokenService'
import userService from '@/api/userService'

class User {
	id
	name
	email
	phone
	verifyed

	// !!! Telegram !!!
	constructor(id, name, email, phone, verifyed) {
		this.id = id
		this.name = name
		this.email = email
		this.phone = phone
		this.verifyed = verifyed
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.email, apiData.phone, apiData.verifyed,
		)
	}
}

export default {
	state: {
		user: null,
	},
	getters: {
		user(state) {
			return state.user
		},
		authCheck(state) {
			return state.user !== null
		},
		guestCheck(state) {
			return state.user === null
		},
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		},
	},
	actions: {
		async loadUser({commit}) {
			let token = tokenService.getToken()
			if (token !== null) {
				let set = true
				const response = await userService.fetchUser(token)
					.catch(err => {
						set = false
						if (err.response && err.response.status && err.response.status === 401) {
							tokenService.clearToken()
							token = null
						} else {
							throw err
						}
					})
				if (set) {
					commit('setUser', User.createFromApiData(response.data.data))
				}
			}
			return token
		},
	},
}
