import axios from 'axios'
import {ApiUrl} from './apiInfo'

const Accounts = '/accounts'

export default {
	async fetchBloger(id) {
		return axios.get(ApiUrl + Accounts + '/' + parseInt(id))
	},
	fetchBlogers(page = 1, params = {}) {
		const response = axios.get(ApiUrl + Accounts)
		console.log(response)
	},
}
