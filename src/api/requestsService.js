import axios from 'axios'

const RequestsPath = 'requests'

const storeRequest = (request) => {
	return axios.post(RequestsPath, request)
}

const fetchRequests = () => {
	return axios.get(RequestsPath + '/my')
}

export default {
	async sendRequest(request) {
		return await storeRequest(request)
	},
	async getRequests() {
		return await fetchRequests()
	},
	async deleteRequest(id) {
		return axios.delete(RequestsPath + '/' + encodeURI(id))
	}
}
