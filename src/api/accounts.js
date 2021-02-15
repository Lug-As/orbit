import axios from 'axios'

const AccountsPath = 'accounts'

export default {
	async fetchAccount(id) {
		return axios.get( AccountsPath + '/' + encodeURI(id))
	},
	async fetchAccounts(page = 1, params = {}) {
		return axios.get( AccountsPath + '?page=' + encodeURI(String(parseInt(page))))
	},
}

