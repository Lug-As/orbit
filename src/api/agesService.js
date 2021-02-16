import axios from 'axios'

const AgesPath = 'ages'

export default {
	async fetchAges() {
		return axios.get(AgesPath)
	},
}

