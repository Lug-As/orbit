import accountsService from '@/api/accountsService'
import Account from '@/store/modules/classes/AccountClass'

export default {
	state: {
		accounts: [],
		accountsPagination: {},
		currentAccount: {},
		userAccounts: null,
		loading: true,
	},
	getters: {
		accounts(state) {
			return state.accounts
		},
		userAccounts(state) {
			return state.userAccounts
		},
		accountsPagination(state) {
			return state.accountsPagination
		},
		currentAccount(state) {
			return state.currentAccount
		},
		loading(state) {
			return state.loading
		},
	},
	mutations: {
		setCurrentAccount(state, payload) {
			state.currentAccount = payload
		},
		setAccountsPagination(state, payload) {
			state.accountsPagination = payload
		},
		destroyCurrentAccount(state) {
			state.currentAccount = {}
		},
		setAccounts(state, payload) {
			state.accounts = payload
		},
		setUserAccounts(state, payload) {
			state.userAccounts = payload
		},
		removeFromUserAccounts(state, id) {
			state.userAccounts = state.userAccounts.filter(ac => ac.id !== id)
		},
		startLoading(state) {
			state.loading = true
		},
		stopLoading(state) {
			state.loading = false
		},
	},
	actions: {
		async loadAccount({commit}, id) {
			commit('startLoading')
			try {
				const response = await accountsService.fetchAccount(id)
				const result = response.data.data
				const account = Account.createFromApiData(result)
				commit('setCurrentAccount', account)
				return account
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
		async loadAccounts({commit}, payload = {
			page: 1,
			params: {},
		}) {
			commit('startLoading')
			try {
				const response = await accountsService.fetchAccounts(payload.page, payload.params),
					result = response.data
				if (Array.isArray(result.data)) {
					const accountsList = result.data.map(item => {
						return Account.createFromShortApiData(item)
					})
					delete result.data
					commit('setAccountsPagination', result)
					commit('setAccounts', accountsList)
				}
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
		async loadUserAccounts({commit, getters}) {
			commit('startLoading')
			try {
				const response = await accountsService.fetchUserAccounts(),
					result = response.data
				const accountsList = result.data.map(item => {
					return Account.createFromShortApiData({
						...item,
						user: {
							name: getters.user.name,
						},
					})
				})
				commit('setUserAccounts', accountsList)
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
		async removeAccount({commit}, {
			id,
		}) {
			accountsService.deleteAccount(id)
				.then(() => {
					commit('removeFromUserAccounts', id)
				})
		},
	},
}
