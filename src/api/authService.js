import axios from 'axios'

const registerRequest = (userData) => {
	return axios.post('register', userData)
}
const loginRequest = (userData) => {
	return axios.post('login', userData)
}
const forgetRequest = (userData) => {
	return axios.post('password/email', userData)
}

export default {
	async register(userData) {
		return await registerRequest(userData)
	},
	async login(userData) {
		return await loginRequest(userData)
	},
	async forget(userData) {
		return await forgetRequest(userData)
	},
}
