<template>
	<div class="profile__offer profile__questionnaire profile__contant tab-4">
		<div class="profile__offer-row profile__questionnaire-row">
			<div class="profile__questionnaire-create">
				<button class="profile__questionnaire-create-button button-grand-black">
					<picture>
						<source srcset="../assets/img/plus-create.webp" type="image/webp">
						<img src="../assets/img/plus-create.png" alt=""></picture>
					Добавить предложение
				</button>
			</div>
			<div v-if="false" class="profile__questionnaire-body">
				<div class="profile__offer-body-row profile__questionnaire-body-row">
					<div class="profile__offer-body-avatar">
						<picture>
							<source srcset="../assets/img/cosmonavt.webp" type="image/webp">
							<img src="../assets/img/cosmonavt.png" alt=""></picture>
					</div>
					<div class="profile__offer-item profile__questionnaire-item">
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Впишите заголовок предложения
							</h2>
							<input type="text" class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Впишите описание предложения
							</h2>
							<textarea
								class="profile__questionnaire-item-info-textarea">15 000 / Рекламный пост</textarea>
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Бюджет
							</h2>
							<input type="text" value="15 000 / Рекламный пост"
									 class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Вид рекламы
							</h2>
							<div class="profile__questionnaire-item-info-select">
								<p class="profile__questionnaire-item-info-option select">Тематика блога</p>
							</div>
							<div class="profile__questionnaire-item-info-list">
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
							</div>
						</div>

						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Регион
							</h2>
							<input type="text" value="Алтайский край, Россия"
									 class="profile__questionnaire-item-info-input">
							<span class="profile__offer-item-info-span">Заполните поле, если ваша реклама привязана к
                                региону.</span>
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Желаемая аудитория
							</h2>
							<div class="main__details-from-to">
								<div class="main__details-from">
									<p class="main__details-text">от</p>
									<div class="main__details-input">
										<input type="tel"
												 class="profile__details-input-small main__details-input-small">
									</div>
								</div>
								<div class="main__details-to">
									<p class="main__details-text">до</p>
									<div class="main__details-input">
										<input type="tel"
												 class="profile__details-input-small main__details-input-small">
									</div>
									<p class="profile__offer-deteilds-text main__details-text">Подписчиков</p>
								</div>
							</div>
							<span class="profile__offer-item-info-span">Заполните поле, если вы знаете сколько
                                должно быть подписчиков у блогера.</span>
						</div>
						<div class="profile__offer-item-button-create profile__questionnaire-item-button-create">
							<button
								class="profile__offer-item-button profile__questionnaire-item-button button-grand-black">
								Создать предложение
							</button>
							<span class="profile__offer-item-info-span">Внимание! Все предложения модерируются. Если
                                предложение не соответствует нашим
                                правилам, администраторы вправе удалить предложение.</span>
						</div>
					</div>
				</div>
			</div>
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

export default {
	name: 'ProfileProjects',
	components: {Preloader},
	data: () => ({}),
	computed: {
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
		loadUserProjects() {
			this.$store.dispatch('loadUserProjects', {
				page: this.page,
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
			}
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
			this.$onUserLoad.func = this.loadUserProjects
		}
	},
}
</script>
