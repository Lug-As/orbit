export default {
	/**
	 * @returns {String|null} Token
	 * */
	getToken() {
		return String(localStorage.getItem(this.tokenName)).trim()
	},

	/**
	 * @param {String} token
	 * */
	setToken(token) {
		localStorage.setItem(this.tokenName, String(token).trim())
	},

	clearToken() {
		localStorage.removeItem(this.tokenName)
	},

	get tokenName() {
		return 'auth-token'
	},
}
