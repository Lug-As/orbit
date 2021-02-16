import axios from 'axios'

const TopicsPath = 'topics'

export default {
	async fetchTopics() {
		return axios.get(TopicsPath)
	},
}

