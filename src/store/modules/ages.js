import agesService from '@/api/agesService'

class Age {
	id
	name

	constructor(id, name) {
		this.id = id
		this.name = name
	}

	static createFromApiData(apiData) {
		return new this(apiData.id, apiData.range)
	}
}

export default {
	state: {
		ages: [],
	},
	getters: {
		ages(state) {
			return state.ages
		},
	},
	mutations: {
		setAges(state, payload) {
			state.ages = payload
		},
	},
	actions: {
		async loadAges({commit}) {
			let agesList = await agesService.getAges()
			agesList = agesList.map(item => {
				return Age.createFromApiData(item)
			})
			commit('setAges', agesList)
		},
	},
}
