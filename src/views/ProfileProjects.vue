<template>
	<div class="profile__offer profile__questionnaire profile__contant tab-4">
		<div class="profile__offer-row profile__questionnaire-row">
			<div class="profile__questionnaire-create">
				<button
					@click="toggleCreateMode"
					class="profile__questionnaire-create-button button-grand-black"
				>
					<picture>
						<source srcset="../assets/img/plus-create.webp" type="image/webp">
						<img src="../assets/img/plus-create.png" alt=""></picture>
					Добавить предложение
				</button>
			</div>
			<transition name="slide-up-down">
				<project-form
					@submit="createProject"
					v-if="createMode"
				/>
			</transition>
			<div class="profile__questionnaire-accounts">
				<div class=" profile__questionnaire-accounts-row">
					<div class="profile__questionnaire-accounts-row-title">
						<h2 class="profile__offer-accounts-row-title-h2 profile__questionnaire-accounts-row-title-h2">
							Актуальные предложения работы
						</h2>
					</div>
					<preloader v-if="projectLoading"/>
					<div v-else-if="userProjects" class="offers__project-list">
						<div
							v-for="project in userProjects"
							class="offers__proposal-body"
						>
							<div class="offers__proposal-body-title">
								<div class="offers__title-info">
									<router-link
										:to="{name: 'Project', params: { id: project.id }}"
										custom v-slot="{ navigate }"
									>
										<h2 @click="navigate" class="offers__info-text cursor">{{ project.name }}</h2>
									</router-link>
								</div>
								<div class="offers__title-price price-info">
									<p class="offers__price-text ">Желаемый бюджет:</p>
									<span class="offers__price-value">{{ project.budget.toLocaleString() }} ₽</span>
								</div>
							</div>
							<div class="offers__proposal-item details">
								<div class="offers__proposal-item-info">
									<p class="offers__details-text">
										{{ project.text | cut }}
									</p>
								</div>
							</div>
							<div class="offers__proposal-item region">
								<div class="offers__proposal-item-info justify-item">
									<div class="offers__proposal-item-button">
										<div class="offers__proposal-item-button-row">
											<div class="offers__title-price price-button">
												<p class="offers__price-text">Желаемый бюджет:</p>
												<span class="offers__price-value">{{ project.budget.toLocaleString() }} ₽</span>
											</div>
										</div>
										<div class="offers__item-button">
											<button
												@click="deleteProject(project.id)"
												class="button-grand-black big"
											>
												Удалить предложение
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="objects-pagination">
						<pagination
							:data="userProjectsPagination"
							:limit="2"
							@pagination-change-page="changePage"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Preloader from '@/components/Preloader'
import ProjectForm from '@/components/profile/ProjectForm'

export default {
	name: 'ProfileProjects',
	data: () => ({
		createMode: false,
	}),
	title: 'Мои рекламные предложения',
	components: {ProjectForm, Preloader},
	computed: {
		user() {
			return this.$store.getters.user
		},
		userProjects() {
			return this.$store.getters.userProjects
		},
		userProjectsPagination() {
			return this.$store.getters.userProjectsPagination
		},
		projectLoading() {
			return this.$store.getters.projectLoading
		},
		page() {
			let page
			if (this.$route.query['page']) {
				page = Math.abs(parseInt(this.$route.query['page']))
				if (page === 1) {
					this.clearQueryParam('page')
				}
			} else {
				page = 1
			}
			if (page === 0 || !Number.isInteger(page)) {
				page = 1
			}
			return page
		},
	},
	methods: {
		toggleCreateMode() {
			this.createMode = !this.createMode
		},
		loadUserProjects() {
			this.$store.dispatch('loadUserProjects', {
				page: this.page,
			})
		},
		createProject(project) {
			this.$store.dispatch('createProject', project)
				.then(() => {
					this.toggleCreateMode()
					if (!this.changePage()) {
						this.scrollToTop(390)
						this.loadUserProjects()
					}
				})
				.catch(() => {
					alert('Произошла ошибка отправки формы. Повторите позже.')
				})
		},
		deleteProject(id) {
			if (confirm('Вы точно хотите удалить рекламное предложение? Восстановить его будет невозможно.')) {
				this.$store.dispatch('deleteProject', id)
			}
		},
		clearQueryParam(key) {
			if (this.$route.query[key] !== undefined) {
				let query = Object.assign({}, this.$route.query)
				delete query[key]
				this.$router.replace({query})
			}
		},
		changePage(page = 1) {
			if (page !== this.page) {
				this.scrollToTop(300)
				this.$router.push({
					name: this.$route.name,
					query: {
						page,
					},
				})
					.then(() => this.loadUserProjects())
				return true
			}
			return false
		},
		scrollToTop(top = 0) {
			window.scrollTo({
				top,
				behavior: 'smooth',
			})
		},
	},
	mounted() {
		if (this.user) {
			this.loadUserProjects()
		} else {
			this.$onUserLoad.hook = this.loadUserProjects
		}
	},
}
</script>
