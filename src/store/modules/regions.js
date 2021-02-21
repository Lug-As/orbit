import regionsService from '@/api/regionsService'

class Region {
	id
	name

	constructor(id, name) {
		this.id = id
		this.name = name
	}

	static createFromApiData(apiData) {
		return new this(apiData.id, apiData.name)
	}
}

export default {
	state: {
		regions: [],
	},
	getters: {
		regions(state) {
			return state.regions
		},
	},
	mutations: {
		setRegions(state, payload) {
			state.regions = payload
		},
	},
	actions: {
		async loadRegions({commit}) {
			let regionsList = await regionsService.getRegions()
			let formatRegionList = []
			regionsList.forEach(country => {
				formatRegionList.push({
					name: null,
					group: country.name,
				})
				country.regions.forEach(region => {
					formatRegionList.push(Region.createFromApiData(region))
				})
			})
			commit('setRegions', formatRegionList)
		},
	},
}
