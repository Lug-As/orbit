export default {
	getToken() {
		return localStorage.getItem(this.tokenName)
	},

	setToken(token) {
		localStorage.setItem(this.tokenName, token)
	},

	clearToken() {
		localStorage.removeItem(this.tokenName)
	},

	get tokenName() {
		return 'auth-token'
	},
}
