import axios from 'axios'

const registerRequest = (userData) => {
	return axios.post('register', userData)
}
const loginRequest = (userData) => {
	return axios.post('login', userData)
}

export default {
	async register(userData) {
		return await registerRequest(userData)
	},
	async login(userData) {
		return await loginRequest(userData)
	},
}
