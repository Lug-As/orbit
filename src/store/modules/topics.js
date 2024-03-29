import topicsService from '@/api/topicsService'

class Topic {
	id
	name

	constructor(id, name) {
		this.id = id
		this.name = name
	}

	static createFromApiData(apiData) {
		return new this(apiData.id, apiData.name)
	}
}

export default {
	state: {
		topics: [],
	},
	getters: {
		topics(state) {
			return state.topics
		},
	},
	mutations: {
		setTopics(state, payload) {
			state.topics = payload
		},
	},
	actions: {
		async loadTopics({commit, getters}) {
			if (!getters.topics.length) {
				let topicsList = await topicsService.getTopics()
				topicsList = topicsList.map(item => {
					return Topic.createFromApiData(item)
				})
				commit('setTopics', topicsList)
			}
		},
	},
}
