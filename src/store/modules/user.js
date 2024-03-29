import tokenService from '@/auth/tokenService'
import userService from '@/api/userService'
import axios from 'axios'

class User {
	id
	name
	email
	phone
	verifyed
	telegram
	image

	constructor(id, name, email, phone, verifyed, telegram, image = null) {
		this.id = id
		this.name = name
		this.email = email
		this.phone = phone
		this.verifyed = verifyed
		this.telegram = telegram
		this.image = image
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.email, apiData.phone, apiData.verifyed, apiData.telegram, apiData.image,
		)
	}
}

export default {
	state: {
		user: null,
		userLoading: true,
		userImageLoading: false,
	},
	getters: {
		user(state) {
			return state.user
		},
		userLoading(state) {
			return state.userLoading
		},
		userImageLoading(state) {
			return state.userImageLoading
		},
		authCheck(state) {
			return state.user !== null || (state.userLoading && tokenService.isTokenSet())
		},
		guestCheck(state, getters) {
			return !getters.authCheck
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
		startUserImageLoading(state) {
			state.userImageLoading = true
		},
		stopUserImageLoading(state) {
			state.userImageLoading = false
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
							location.reload()
							token = null
						} else {
							throw err
						}
					})
				if (set) {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
					commit('setUser', User.createFromApiData(response.data.data))
					commit('stopUserLoading')
				}
			}
			return token
		},
		async saveUserInfo({commit}, payload = {
			type, value,
		}) {
			commit('startUserImageLoading')
			await userService.putUserInfo(payload.type, payload.value)
			commit('stopUserImageLoading')
		},
	},
}
