import axios from 'axios'

const registerRequest = (userData) => {
	return axios.post('register', userData)
}

export default {
	async register(userData) {
		return await registerRequest(userData)
	},
}
