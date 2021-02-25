import projectsService from '@/api/projectsService'

class Project {
	id
	name
	text
	budget
	username
	region
	country
	ad_types
	followers_from
	followers_to

	constructor(
		id, name, text, budget, username, region, country, followers_from, followers_to, ad_types = null,
	) {
		this.id = id
		this.name = name
		this.text = text
		this.budget = budget
		this.username = username
		this.region = region
		this.country = country
		this.followers_from = followers_from
		this.followers_to = followers_to
		this.ad_types = ad_types
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.text, apiData.budget, apiData.user.name, apiData.region?.name,
			apiData.region?.country.name, apiData.followers_from, apiData.followers_to, apiData.ad_types,
		)
	}

	static createFromShortApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.text, apiData.budget, apiData.user.name, apiData.region?.name,
			apiData.region?.country.name, apiData.followers_from, apiData.followers_to,
		)
	}
}

export default {
	state: {
		projects: [],
		projectsPagination: {},
		currentProject: {},
		projectLoading: true,
	},
	getters: {
		projects(state) {
			return state.projects
		},
		projectsPagination(state) {
			return state.projectsPagination
		},
		currentProject(state) {
			return state.currentProject
		},
		projectLoading(state) {
			return state.projectLoading
		},
	},
	mutations: {
		setCurrentProject(state, payload) {
			state.currentProject = payload
		},
		setProjectsPagination(state, payload) {
			state.projectsPagination = payload
		},
		destroyCurrentProject(state) {
			state.currentProject = {}
		},
		setProjects(state, payload) {
			state.projects = payload
		},
		startLoading(state) {
			state.projectLoading = true
		},
		stopLoading(state) {
			state.projectLoading = false
		},
	},
	actions: {
		async loadProject({commit}, id) {
			commit('startLoading')
			try {
				const response = await projectsService.fetchProject(id)
				const result = response.data.data
				commit('setCurrentProject', Project.createFromApiData(result))
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
		async loadProjects({commit, state}, payload = {
			page: 1,
			params: {},
		}) {
			commit('startLoading')
			try {
				const response = await projectsService.fetchProjects(payload.page, payload.params),
					result = response.data
				if (Array.isArray(result.data)) {
					const projectsList = result.data.map(item => {
						return Project.createFromShortApiData(item)
					})
					commit('setProjectsPagination', result)
					commit('setProjects', projectsList)
				}
			} catch (e) {
				throw e
			} finally {
				commit('stopLoading')
			}
		},
	},
}
