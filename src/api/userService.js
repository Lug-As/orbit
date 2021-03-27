import axios from 'axios'

const UserPath = 'user'

export default {
	async fetchUser(token) {
		return axios.get(UserPath, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async putUserInfo(type, value) {
		if (type === 'image') {
			const formData = new FormData()
			formData.append(type, value)
			return axios.post(UserPath, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		}
		return axios.post(UserPath, {
			[type]: value,
		})
	},
}
