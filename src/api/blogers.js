import axios from 'axios'
import {ApiUrl} from './apiInfo'

const Accounts = '/accounts'

export default {
	async fetchBloger(id) {
		return axios.get(ApiUrl + Accounts + '/' + encodeURI(id))
	},
	async fetchBlogers(page = 1, params = {}) {
		return axios.get(ApiUrl + Accounts + '?page=' + encodeURI(page))
	},
}
