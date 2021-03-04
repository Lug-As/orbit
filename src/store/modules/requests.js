import requestsService from '@/api/requestsService'

export default {
	state: {
		requests: [],
		requestsLoading: false,
		requestsPagination: {},
	},
	getters: {
		requests(state) {
			return state.requests
		},
		requestsLoading(state) {
			return state.requestsLoading
		},
		requestsPagination(state) {
			return state.requestsPagination
		},
	},
	mutations: {
		setRequests(state, payload) {
			state.requests = payload
		},
		startRequestsLoading(state) {
			state.requestsLoading = true
		},
		stopRequestsLoading(state) {
			state.requestsLoading = false
		},
		setRequestsPagination(state, payload) {
			state.requestsPagination = payload
		},
		removeFromRequests(state, id) {
			state.requests = state.requests.filter(ac => ac.id !== id)
		},
	},
	actions: {
		async loadRequests({commit}, {
			page = 1
		}) {
			commit('startRequestsLoading')
			const response = await requestsService.getRequests(page),
				result = response.data
			const requestsList = result.data.map(item => ({
				...item,
				reference: 'https://www.tiktok.com/' + item.name,
			}))
			delete result.data
			commit('setRequestsPagination', result)
			commit('setRequests', requestsList)
			commit('stopRequestsLoading')
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
			await requestsService.sendRequest(request)
		}
	},
}
