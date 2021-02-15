import tokenService from '@/auth/tokenService'
import user from '@/api/user'

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

// 1|IcJWtQMRA70FlbMdJgkKu96K5aztcNK1PXibBo66

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
			const token = tokenService.getToken()
			if (token) {
				const response = await user.fetchUser(token)
					.catch(err => {
						if (err.response && err.response.status && err.response.status === 401) {
							tokenService.clearToken()
						}
					})
				commit('setUser', User.createFromApiData(response.data.data))
				return token
			}
		},
	},
}
