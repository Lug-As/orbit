import typesService from '@/api/typesService'

class Type {
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
		types: [],
	},
	getters: {
		types(state) {
			return state.types
		},
	},
	mutations: {
		setTypes(state, payload) {
			state.types = payload
		},
	},
	actions: {
		async loadTypes({commit, getters}) {
			if (!getters.types.length) {
				let typesList = await typesService.getTypes()
				typesList = typesList.map(item => {
					return Type.createFromApiData(item)
				})
				commit('setTypes', typesList)
			}
		},
	},
}
