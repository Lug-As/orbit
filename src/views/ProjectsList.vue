<template>
	<section class="offers main">
		<div class="container">
			<div class="offers__row">
				<transition name="fade">
					<div class="offers__filters main__filters" v-if="filtersOpened" @click.self="displayFilters = false">
						<div class="main__filters-container">
							<div class="main__filters-row">
								<div class="main__title">
									<div class="main__title-img">
										<picture>
											<source srcset="../assets/img/filter.webp" type="image/webp">
											<img src="../assets/img/filter.png" alt=""></picture>
									</div>
									<div class="main__title-text">Фильтр</div>
									<a
										v-if="wasFiltered"
										@click.prevent="clearFilters"
										class="reset-filters-link"
										href="#"
									>
										Сбросить все
									</a>
								</div>
								<div class="main__filters-row">
									<div class="main__body-filters">
										<div class="main__body-details">
											<h2 class="main__filters-summary">Бюджет</h2>
											<div class="main__details-row">
												<div class="main__details-from-to">
													<div class="main__details-from">
														<p class="main__details-text">от</p>
														<div class="main__details-input">
															<input
																v-model.lazy="filterOpts.budget_from"
																@change="filter($event, 'budget_from')"
																@keydown="resolveInputKeys"
																class="main__details-input-small"
															>
														</div>
													</div>
													<div class="main__details-to">
														<p class="main__details-text">до</p>
														<div class="main__details-input">
															<input
																v-model.lazy="filterOpts.budget_to"
																@change="filter($event, 'budget_to')"
																@keydown="resolveInputKeys"
																class="main__details-input-small"
															>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="main__body-details">
											<h2 class="main__filters-summary">Виды рекламы</h2>
											<div class="main__details-row">
												<v-select
													label="name"
													v-model="filterOpts.type"
													:options="types"
													:reduce="opt => opt.id"
													multiple
													class="main__vue-select"
													@input="filter($event, 'type')"
												>
													<span slot="no-options">Ничего не найдено</span>
												</v-select>
											</div>
										</div>
										<div class="main__body-details">
											<h2 class="main__filters-summary">Количество подписчиков</h2>
											<div class="main__details-row">
												<div class="main__details-from-to">
													<div class="main__details-from">
														<p class="main__details-text">от</p>
														<div class="main__details-input">
															<input
																v-model.lazy="filterOpts.followers_from"
																@change="filter($event, 'followers_from')"
																@keydown="resolveInputKeys"
																class="main__details-input-small"
															>
														</div>
													</div>
													<div class="main__details-to">
														<p class="main__details-text">до</p>
														<div class="main__details-input">
															<input
																v-model.lazy="filterOpts.followers_to"
																@change="filter($event, 'followers_to')"
																@keydown="resolveInputKeys"
																class="main__details-input-small"
															>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
				<div class="offers__proposal">
					<div class="offers__proposal-title">
						<div class="offers__title-body">
							<div class="offers__title-filter-button">
								<button class="offers__filter-button main__title-mobile "
										  @click="displayFilters = !displayFilters">
									<div class="offers__button-img main__title-img-mobile">
										<picture>
											<source srcset="../assets/img/filter.webp" type="image/webp">
											<img src="../assets/img/filter.png" alt=""></picture>
									</div>
									<div class="offers__button-title main__title-text" @click="openFilterWindow">
										Фильтр
									</div>
								</button>
							</div>
							<div class="offers__proposal-input">
								<input
									v-model.trim.lazy="searchQuery"
									type="text"
									placeholder="Введите запрос и нажмите Enter"
									@change="search"
								>
								<button class="search-icon"></button>
							</div>
						</div>
					</div>
					<preloader v-if="loading"/>
					<template v-else-if="projects.length">
						<div class="offers__proposal-row">
							<div class="offers__proposal-offers">
								<div
									v-for="project in projects"
									:key="project.id"
									class="offers__proposal-body"
								>
									<div class="offers__proposal-body-title">
										<div class="offers__title-info">
											<router-link
												:to="{name: 'Project', params: { id: project.id }}"
												custom v-slot="{ navigate }"
											>
												<h2 @click="navigate" class="offers__info-text">{{ project.name }}</h2>
											</router-link>
										</div>
										<div class="offers__title-price price-info">
											<p class="offers__price-text ">Желаемый бюджет:</p>
											<span class="offers__price-value">{{ project.budget.toLocaleString() }} ₽</span>
										</div>
									</div>
									<div class="offers__proposal-item details">
										<div class="offers__proposal-item-info">
											<p class="offers__details-text">{{ project.text | cut }}</p>
										</div>
									</div>
									<div class="offers__proposal-item requirements"
										  v-if="project.followers_from || project.followers_to">
										<div class="offers__proposal-item-info">
											<h2 class="offers__proposal-item-title">
												Желаемая аудитория:
											</h2>
											<p class="offers__proposal-item-text">
												<template v-if="project.followers_from">
													от {{ project.followers_from }}
												</template>
												<template v-if="project.followers_to">
													до {{ project.followers_to }}
												</template>
												подписчиков
											</p>
										</div>
									</div>
									<div class="offers__proposal-item region">
										<div class="offers__proposal-item-info justify-item">
											<div
												v-if="project.region"
												class="offers__proposal-info-text"
											>
												<h2 class="offers__proposal-item-title">Регион:</h2>
												<p class="offers__proposal-item-text">
													{{ project.region }}, {{ project.country }}.
												</p>
											</div>
											<div v-else class="filler"></div>
											<div class="offers__proposal-item-button">
												<div class="offers__proposal-item-button-row">
													<div class="offers__item-button-text title-button">
														<h3 class="offers__item-text-title">Откликов: <span
															class="offers__item-text-span">{{ project.responses_count }}</span></h3>
													</div>
													<div class="offers__title-price price-button">
														<p class="offers__price-text">Желаемый бюджет:</p>
														<span class="offers__price-value">{{
																project.budget.toLocaleString()
															}} ₽</span>
													</div>
												</div>
												<div class="offers__item-button">
													<router-link :to="{name: 'Project', params: { id: project.id }}">
														<button class="button-grand-black big">Узнать больше</button>
													</router-link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="objects-pagination">
								<pagination
									:data="projectsPagination"
									:limit="2"
									@pagination-change-page="changePage"
								/>
							</div>
						</div>
					</template>
					<template v-else>
						<p class="empty-result-text">По вашему запросу ничего не найдено</p>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'
import resolveInputKeys from '@/helpers/mixins/resolveInputKeys'

export default {
	name: 'ProjectsList',
	title: 'Все рекламные предложения',
	components: {Preloader},
	data: () => ({
		filterOpts: {
			type: null,
			followers_from: null,
			followers_to: null,
			budget_from: null,
			budget_to: null,
		},
		searchQuery: null,
		displayFilters: false,
	}),
	computed: {
		projects() {
			return this.$store.getters.projects
		},
		projectsPagination() {
			return this.$store.getters.projectsPagination
		},
		loading() {
			return this.$store.getters.projectLoading
		},
		types() {
			return this.$store.getters.types
		},
		allowedFilterTypes() {
			return Object.keys(this.filterOpts)
		},
		filtersOpened() {
			return window.innerWidth >= 1366 || this.displayFilters
		},
		selectedFilters() {
			return Object.keys(this.$route.query)
				.filter(key => this.allowedFilterTypes.includes(key))
				.reduce((obj, key) => {
					let rawItem = this.$route.query[key]
					if (rawItem) {
						if (rawItem.includes(',')) {
							rawItem = rawItem.split(',').map(item => parseInt(item))
						} else if (rawItem) {
							rawItem = [parseInt(rawItem)]
						}
						obj[key] = rawItem.filter(item => Number.isInteger(item))
					} else {
						this.clearQueryParam(key)
					}
					return obj
				}, {})
		},
		paramQuery() {
			const q = this.$route.query['q']
			if (q === '') {
				this.clearQueryParam('q')
			}
			return q
		},
		queryObject() {
			const q = this.paramQuery
			if (q) {
				return {
					q,
				}
			}
			return {}
		},
		wasFiltered() {
			let was = false
			this.allowedFilterTypes.forEach((key) => {
				let opt = this.filterOpts[key]
				if (opt !== null && (Array.isArray(opt) && opt.length)) {
					return was = true
				}
			})
			return was
		},
	},
	methods: {
		changePage(page = 1) {
			if (page !== this.page) {
				this.scrollToTop()
				this.reloadPage({page})
			}
		},
		clearFilters() {
			this.reloadPage({}, false)
		},
		scrollToTop() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		},
		filter(ev, filterType) {
			if (this.allowedFilterTypes.includes(filterType)) {
				let query, addData
				if (Array.isArray(ev)) {
					if (filterType === 'type' && (this.sortOpt === 2 || this.sortOpt === 3)) {
						addData = {
							sort: undefined,
							dir: undefined,
						}
					}
					query = ev.join(',')
				} else {
					query = parseInt(ev.target.value)
					if (!Number.isInteger(query)) {
						query = undefined
					}
				}
				this.reloadPage({
					[filterType]: query,
					page: 1,
					...addData,
				})
			}
		},
		search(ev) {
			const q = ev.target.value
			this.reloadPage({
				q,
			})
		},
		openFilterWindow() {
			//
		},
		loadProjects() {
			return this.$store.dispatch('loadProjects', {
				page: this.page,
				params: {
					...this.selectedFilters,
					...this.queryObject,
				},
			})
		},
		reloadPage(addQuery, savePrevQuery = true) {
			const query = savePrevQuery ? this.$route.query : {}
			return this.$router.push({
				name: this.$route.name,
				query: {
					...query,
					...addQuery,
				},
			})
				.then(() => this.loadProjects())
				.then(() => this.freshOpts())
		},
		freshOpts() {
			this.freshFilterOpts()
			this.freshSearchQuery()
		},
		freshFilterOpts() {
			const selected = this.selectedFilters
			Object.keys(this.filterOpts).forEach(key => {
				if (selected[key] !== undefined) {
					this.filterOpts[key] = selected[key]
				} else {
					this.filterOpts[key] = null
				}
			})
		},
		freshSearchQuery() {
			this.searchQuery = this.paramQuery
		},
	},
	mounted() {
		if (!this.projects.length || this.page !== this.projectsPagination.current_page) {
			this.loadProjects()
		}
		this.$store.dispatch('loadTypes')
			.then(() => this.freshOpts())
	},
	mixins: [
		resolveInputKeys,
	],
}
</script>

<style lang="scss" scoped>
.offers__info-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: pointer;
}

.search-icon {
	$icon_size: 46px;
	height: $icon_size;
	width: $icon_size;
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
	display: inline-block;
	background-image: url('../assets/img/search.png');
	background-size: 66%;
	background-repeat: no-repeat;
	background-position: center;
	border-radius: 15px;

	&:focus {
		box-shadow: 0 0 1px 1px #BEBEBE;

	}

	@media (max-width: 1599px) {
		$icon_size: 40px;
		height: $icon_size;
		width: $icon_size;
	}

	@media (max-width: 1365px) {
		$icon_size: 40px;
		height: $icon_size;
		width: $icon_size;
		background-size: 60%;
	}
}

.offers__proposal-input {
	position: relative;

	input {
		padding: 10px;
	}
}
</style>
