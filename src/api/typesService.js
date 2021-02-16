import axios from 'axios'

const TypesPath = 'types'

export default {
	async fetchTypes() {
		return axios.get(TypesPath)
	},
}

