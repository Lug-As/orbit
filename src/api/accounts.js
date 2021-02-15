import axios from 'axios'
import {ApiUrl} from './apiInfo'

const AccountsPath = '/accounts'

export default {
	async fetchAccount(id) {
		return axios.get(ApiUrl + AccountsPath + '/' + encodeURI(id))
	},
	async fetchAccounts(page = 1, params = {}) {
		return axios.get(ApiUrl + AccountsPath + '?page=' + encodeURI(page))
	},
}
