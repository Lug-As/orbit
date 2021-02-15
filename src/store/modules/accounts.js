import accountsService from '@/api/accountsService'

class Account {
	id
	title
	about
	image
	followers
	likes
	ad_types
	ages
	gallery
	topics
	username
	region
	country

	constructor(
		id, title, image, followers, likes, ad_types, topics, username,
		about = null, ages = null, gallery = null, region = null, country = null,
	) {
		this.id = id
		this.title = title
		this.about = about
		this.image = image
		this.followers = followers
		this.likes = likes
		this.ad_types = ad_types
		this.ages = ages
		this.gallery = gallery
		this.topics = topics
		this.username = username
		this.region = region
		this.country = country
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.title, apiData.image, apiData.followers, apiData.likes, apiData.ad_types, apiData.topics,
			apiData.user.name,apiData.about, apiData.ages, apiData.gallery, apiData.region.name,
			apiData.region.country.name,
		)
	}

	static createFromShortApiData(apiData) {
		return new this(
			apiData.id, apiData.title, apiData.image, apiData.followers, apiData.likes, apiData.ad_types,
			apiData.topics, apiData.user.name,
		)
	}
}

export default {
	state: {
		accounts: [],
		accountsPagination: {},
		currentAccount: {},
		loading: true,
	},
	getters: {
		accounts(state) {
			return state.accounts
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
				commit('setCurrentAccount', Account.createFromApiData(result))
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
		async loadAccounts({commit, state}, payload = {
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
					commit('setAccountsPagination', result)
					commit('setAccounts', accountsList)
				}
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
	},
}
