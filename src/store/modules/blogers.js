import blogers from '@/api/blogers'

class Bloger {
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
		title, about, image, followers, likes, ad_types, ages, gallery, topics, username, region, country,
	) {
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
			apiData.title, apiData.about, apiData.image, apiData.followers, apiData.likes, apiData.ad_types, apiData.ages,
			apiData.gallery, apiData.topics, apiData.user.name, apiData.region.name, apiData.region.country.name,
		)
	}
}

export default {
	state: {
		blogers: [],
		currentBloger: {},
		loading: true,
	},
	getters: {
		blogers(state) {
			return state.blogers
		},
		currentBloger(state) {
			return state.currentBloger
		},
		loading(state) {
			return state.loading
		},
	},
	mutations: {
		setCurrentBloger(state, payload) {
			state.currentBloger = payload
		},
		setBlogers(state, payload) {
			state.blogers = payload
		},
		startLoading(state) {
			state.loading = true
		},
		stopLoading(state) {
			state.loading = false
		},
	},
	actions: {
		async loadBloger({commit}, id) {
			commit('startLoading')
			try {
				const response = await blogers.fetchBloger(id)
				const result = response.data.data
				commit('setCurrentBloger', Bloger.createFromApiData(result))
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
		async loadBlogers({commit}, {page, params}) {
			commit('startLoading')
			try {
				const response = await blogers.fetchBlogers(page, params)
				const result = response.data.data
				if (Array.isArray(result)) {
					const blogersList = result.forEach(item => {
						return Bloger.createFromApiData(item)
					})
					commit('setBlogers', blogersList)
				}
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
	},
}
