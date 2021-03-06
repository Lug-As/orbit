import tokenService from '@/auth/tokenService'
import userService from '@/api/userService'

class User {
	id
	name
	email
	phone
	verifyed
	telegram

	constructor(id, name, email, phone, verifyed, telegram) {
		this.id = id
		this.name = name
		this.email = email
		this.phone = phone
		this.verifyed = verifyed
		this.telegram = telegram
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.email, apiData.phone, apiData.verifyed, apiData.telegram,
		)
	}
}

export default {
	state: {
		user: null,
		userLoading: false,
	},
	getters: {
		user(state) {
			return state.user
		},
		userLoading(state) {
			return state.userLoading
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
		startUserLoading(state) {
			state.userLoading = true
		},
		stopUserLoading(state) {
			state.userLoading = false
		},
	},
	actions: {
		async loadUser({commit}) {
			let token = tokenService.getToken()
			if (token !== null) {
				commit('startUserLoading')
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
					.finally(() => {
						commit('stopUserLoading')
					})
				if (set) {
					commit('setUser', User.createFromApiData(response.data.data))
				}
			}
			return token
		},
		async saveUserInfo({commit}, payload = {
			type, value,
		}) {
			await userService.putUserInfo(payload.type, payload.value)
		},
	},
}
