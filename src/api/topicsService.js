import axios from 'axios'

const TopicsPath = 'topics'

const validTopicsFormat = (result) => {
	let valid = true
	if (!Array.isArray(result) || !result.length) {
		return false
	}
	result.forEach(item => {
		if (item === null || typeof item !== 'object' || item.id === undefined || item.name === undefined) {
			return valid = false
		}
	})
	return valid
}

const cachedTopics = () => {
	const storageItem = sessionStorage.getItem(TopicsPath)
	let result
	try {
		result = JSON.parse(storageItem)
		if (!validTopicsFormat(result)) {
			throw new Error('Неверный формат кэшированных данных')
		}
	} catch (e) {
		sessionStorage.removeItem(TopicsPath)
		result = null
	}
	return result
}

const setCacheTopics = (val) => {
	sessionStorage.setItem(TopicsPath, val)
}

const fetchTopics = () => {
	return axios.get(TopicsPath)
}

export default {
	async getTopics(cache = true) {
		if (cache) {
			const cachedResult = cachedTopics()
			if (cachedResult !== null) {
				return cachedResult
			}
		}
		const response = await fetchTopics()
		const topics = response.data.data
		if (cache) {
			setCacheTopics(JSON.stringify(topics))
		}
		return topics
	},
}

