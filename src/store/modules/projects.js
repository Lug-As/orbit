import projectsService from '@/api/projectsService'

class Project {
	id
	name
	text
	budget
	username
	user_id
	region
	country
	ad_types
	followers_from
	followers_to
	responses_count

	constructor(
		id, name, text, budget, user, region, country, followers_from, followers_to,
		responses_count = null, ad_types = null,
	) {
		this.id = id
		this.name = name
		this.text = text
		this.budget = budget
		this.user_id = user.id
		this.region = region
		this.country = country
		this.followers_from = followers_from
		this.followers_to = followers_to
		this.ad_types = ad_types
		this.responses_count = responses_count

		this.username = user.name
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.text, apiData.budget, apiData.user, apiData.region?.name,
			apiData.region?.country.name, apiData.followers_from, apiData.followers_to,
			apiData.responses_count, apiData.ad_types,
		)
	}

	static createFromShortApiData(apiData) {
		return new this(
			apiData.id, apiData.name, apiData.text, apiData.budget, apiData.user, apiData.region?.name,
			apiData.region?.country.name, apiData.followers_from, apiData.followers_to, apiData.responses_count,
		)
	}
}

export default {
	state: {
		projects: [],
		projectsPagination: {},
		userProjects: [],
		userProjectsPagination: {},
		currentProject: {},
		projectLoading: true,
	},
	getters: {
		projects(state) {
			return state.projects
		},
		userProjects(state) {
			return state.userProjects
		},
		userProjectsPagination(state) {
			return state.userProjectsPagination
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
		destroyCurrentProject(state) {
			state.currentProject = {}
		},
		setProjects(state, payload) {
			state.projects = payload
		},
		setProjectsPagination(state, payload) {
			state.projectsPagination = payload
		},
		removeFromUserProjects(state, id) {
			state.userProjects = state.userProjects.filter(project => project.id !== id)
		},
		setUserProjects(state, payload) {
			state.userProjects = payload
		},
		setUserProjectsPagination(state, payload) {
			state.userProjectsPagination = payload
		},
		startProjectLoading(state) {
			state.projectLoading = true
		},
		stopProjectLoading(state) {
			state.projectLoading = false
		},
	},
	actions: {
		async loadProject({commit}, id) {
			commit('startProjectLoading')
			try {
				const response = await projectsService.fetchProject(id)
				const result = response.data.data
				const project = Project.createFromApiData(result)
				commit('setCurrentProject', project)
				return project
			} catch (e) {
				throw e
			} finally {
				commit('stopProjectLoading')
			}
		},
		async loadProjects({commit}, payload = {
			page: 1,
			params: {},
		}) {
			commit('startProjectLoading')
			try {
				const response = await projectsService.fetchProjects(payload.page, payload.params),
					result = response.data
				if (Array.isArray(result.data)) {
					const projectsList = result.data.map(item => {
						return Project.createFromShortApiData(item)
					})
					delete result.data
					commit('setProjectsPagination', result)
					commit('setProjects', projectsList)
				}
			} catch (e) {
				throw e
			} finally {
				commit('stopProjectLoading')
			}
		},
		async loadUserProjects({commit}, {
			page = 1,
		}) {
			commit('startProjectLoading')
			const response = await projectsService.fetchUserProjects(page),
				result = response.data
			const projectsList = result.data.map(item => {
				return Project.createFromShortApiData(item)
			})
			delete result.data
			commit('setUserProjectsPagination', result)
			commit('setUserProjects', projectsList)
			commit('stopProjectLoading')
		},
		async deleteProject({commit}, id) {
			projectsService.deleteProject(id)
				.then(() => {
					commit('removeFromUserProjects', id)
				})
		},
		async createProject({commit}, project) {
			await projectsService.createProject(project)
		}
	},
}
