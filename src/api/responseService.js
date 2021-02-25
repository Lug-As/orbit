import axios from 'axios'

const ResponsesPath = 'responses'

const storeResponse = (response) => {
	return axios.post(ResponsesPath, response)
}

export default {
	async sendResponse(response) {
		return await storeResponse(response)
	},
}

