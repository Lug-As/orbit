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
}

export default {
	state: {
		currentBloger: {},
		loading: true,
	},
	getters: {
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
				commit('setCurrentBloger', new Bloger(
					result.title, result.about, result.image, result.followers, result.likes, result.ad_types, result.ages,
					result.gallery, result.topics, result.user.name, result.region.name, result.region.country.name,
				))
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
	},
}
