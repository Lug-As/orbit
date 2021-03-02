import requestsService from '@/api/requestsService'

export default {
	state: {
		requests: [],
		requestsPagination: {},
	},
	getters: {
		requests(state) {
			return state.requests
		},
		requestsPagination(state) {
			return state.requestsPagination
		},
	},
	mutations: {
		setRequests(state, payload) {
			state.requests = payload
		},
		addRequest(state, payload) {
			state.requests.push(payload)
		},
		setRequestsPagination(state, payload) {
			state.requestsPagination = payload
		},
		removeFromRequests(state, id) {
			state.requests = state.requests.filter(ac => ac.id !== id)
		},
	},
	actions: {
		async loadRequests({commit}) {
			const response = await requestsService.getRequests(),
				result = response.data
			const requestsList = result.data.map(item => ({
				...item,
				reference: 'https://www.tiktok.com/' + item.name,
			}))
			delete result.data
			commit('setRequestsPagination', result)
			commit('setRequests', requestsList)
		},
		async removeRequest({commit}, {
			id,
		}) {
			requestsService.deleteRequest(id)
				.then(() => {
					commit('removeFromRequests', id)
				})
		},
		async createRequest({commit}, request) {
			requestsService.sendRequest(request)
				.then(res => {
					commit('addRequest', res.data.data)
				})
		}
	},
}
