<template>
	<section class="main">
		<div class="container">
			<div class="main__row">
				<div class="main__filters">
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
							>Сбросить все</a>
						</div>
						<div class="main__filters-row">
							<div class="main__body-filters">
								<div class="main__body-details">
									<h2 class="main__filters-summary">Цена</h2>
									<div class="main__details-row">
										<div class="main__details-from-to">
											<div class="main__details-from">
												<p class="main__details-text">от</p>
												<div class="main__details-input">
													<input
														v-model.lazy="filterOpts.price_from"
														@change="filter($event, 'price_from')"
														@keydown="resolveInputKeys"
														class="main__details-input-small"
													>
												</div>
											</div>
											<div class="main__details-to">
												<p class="main__details-text">до</p>
												<div class="main__details-input">
													<input
														v-model.lazy="filterOpts.price_to"
														@change="filter($event, 'price_to')"
														@keydown="resolveInputKeys"
														class="main__details-input-small"
													>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="main__body-details">
									<h2 class="main__filters-summary">Тема канала</h2>
									<div class="main__details-row">
										<v-select
											label="name"
											v-model="filterOpts.topic"
											:options="topics"
											:reduce="name => name.id"
											multiple
											@input="filter($event, 'topic')"
											class="main__vue-select"
										/>
										<small class="main__details-small">
											Например: Еда / Отдых / Путешествия
										</small>
									</div>
								</div>
								<div class="main__body-details">
									<h2 class="main__filters-summary">Виды рекламы</h2>
									<div class="main__details-row">
										<v-select
											label="name"
											v-model="filterOpts.type"
											:options="types"
											:reduce="name => name.id"
											multiple
											class="main__vue-select"
											@input="filter($event, 'type')"
										/>
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
								<div class="main__body-details">
									<h2 class="main__filters-summary">Количество лайков</h2>
									<div class="main__details-row">
										<div class="main__details-from-to">
											<div class="main__details-from">
												<p class="main__details-text">от</p>
												<div class="main__details-input">
													<input
														v-model.lazy="filterOpts.likes_from"
														@change="filter($event, 'likes_from')"
														@keydown="resolveInputKeys"
														class="main__details-input-small"
													>
												</div>
											</div>
											<div class="main__details-to">
												<p class="main__details-text">до</p>
												<div class="main__details-input">
													<input
														v-model.lazy="filterOpts.likes_to"
														@change="filter($event, 'likes_to')"
														@keydown="resolveInputKeys"
														class="main__details-input-small"
													>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="main__body-details">
									<h2 class="main__filters-summary">Возрастные категории</h2>
									<div class="main__details-row">
										<v-select
											label="name"
											v-model="filterOpts.age"
											:options="ages"
											:reduce="name => name.id"
											multiple
											class="main__vue-select"
											@input="filter($event, 'age')"
										/>
									</div>
								</div>
								<div class="main__body-details">
									<h2 class="main__filters-summary">Страна</h2>
									<div class="main__details-row">
										<input type="text" class="main__details-input-big">
										<input type="text" class="main__details-input-big">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="main__offers">
					<div class="main__offers-title">
						<div class="main__offers-body">
							<div class="main__title-mobile">
								<div class="main__title-img-mobile">
									<picture>
										<source srcset="../assets/img/filter.webp" type="image/webp">
										<img src="../assets/img/filter.png" alt="">
									</picture>
								</div>
								<div class="main__title-text">Фильтр</div>
							</div>
							<div class="main__offers-sort">
								<div class="main__offer-sort-title">Сортировать:</div>
								<div class="main__offer-sort-choice">
									<div class="main__offer-sort-select">
										<p class="main__offer-sort-option selected">по цене</p>
									</div>
									<div class="main__offer-sort-list" style="display: none;">
										<p class="main__offer-sort-option">По количеству подписчиков</p>
										<p class="main__offer-sort-option">По количеству лайков</p>
										<p class="main__offer-sort-option">По возрастанию</p>
										<p class="main__offer-sort-option">По убыванию</p>
									</div>
								</div>
							</div>
							<div class="main__offers-search">
								<input type="text" placeholder="Введите ник блогера">
							</div>
						</div>
					</div>
					<preloader v-if="loading"/>
					<template v-else-if="accounts.length">
						<div class="main__offers-row">
							<div class="main__body-offers">
								<div
									v-for="account in accounts"
									:key="account.id"
									class="main__offer-body"
								>
									<div class="main__offer-img">
										<router-link :to="{name: 'Account', params: { id: account.id }}">
											<div class="main__offer-background-img">
												<img class="main__offer-img-item" :src="account.image" :alt="account.title">
											</div>
										</router-link>
									</div>
									<div class="main__offer-text">
										<div class="main__offer-title">
											<router-link
												:to="{name: 'Account', params: { id: account.id }}"
												custom v-slot="{ navigate }"
											>
												<h2 @click="navigate" class="main__offer-title-text">{{ account.username }}</h2>
											</router-link>
										</div>
										<div class="main__offer-info">
											<div class="main__offer-info-item">
												<h2 class="main__offer-info-title">
													{{ account.title }}
												</h2>
												<p class="main__offer-info-text">
													{{ account.followers | round }} подписчиков / {{ account.likes | round }} лайков
												</p>
											</div>
											<div class="main__offer-info-item">
												<h2 class="main__offer-info-title">
													Тема канала:
												</h2>
												<p class="main__offer-info-text">
													{{ account.topics | slashedList }}
												</p>
											</div>
											<div class="main__offer-info-item">
												<h2 class="main__offer-info-title">
													Цена рекламы:
												</h2>
												<p class="main__offer-info-text">
													{{ priceRange(account.ad_types) }}
												</p>
											</div>
										</div>
									</div>
									<div class="main__offer-button-item">
										<router-link :to="{name: 'Account', params: { id: account.id }}">
											<button class="main__offer-button button-grand-black">
												Подробнее
											</button>
										</router-link>
									</div>
								</div>
							</div>
							<div class="accounts-pagination">
								<pagination
									:data="accountsPagination"
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

export default {
	name: 'AccountsList',
	data: () => ({
		filterOpts: {
			topic: null,
			age: null,
			type: null,
			region: null,
			followers_from: null,
			followers_to: null,
			likes_from: null,
			likes_to: null,
			price_from: null,
			price_to: null,
		},
	}),
	computed: {
		accounts() {
			return this.$store.getters.accounts
		},
		loading() {
			return this.$store.getters.loading
		},
		accountsPagination() {
			return this.$store.getters.accountsPagination
		},
		topics() {
			return this.$store.getters.topics
		},
		types() {
			return this.$store.getters.types
		},
		ages() {
			return this.$store.getters.ages
		},
		allowedFilterTypes() {
			return Object.keys(this.filterOpts)
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
	},
	methods: {
		changePage(page = 1) {
			if (page !== this.page) {
				this.reloadPage({page})
				this.scrollToTop()
			}
		},
		scrollToTop() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		},
		clearQueryParam(key) {
			if (this.$route.query[key] !== undefined) {
				let query = Object.assign({}, this.$route.query)
				delete query[key]
				this.$router.replace({query})
			}
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
				.then(() => this.loadAccounts())
				.then(() => this.freshFilterOpts())
		},
		priceRange(types) {
			if (types.length === 0) return 'Договорная'
			if (types.length === 1) return types[0].price + '₽'
			let maxPrice = 0
			types.forEach(type => {
				if (type.price > maxPrice) {
					maxPrice = type.price
				}
			})
			let minPrice = maxPrice
			types.forEach(type => {
				if (type.price < minPrice) {
					minPrice = type.price
				}
			})
			if (minPrice === maxPrice) {
				return minPrice + '₽'
			}
			return 'От ' + minPrice + '₽ до ' + maxPrice + '₽'
		},
		loadAccounts() {
			return this.$store.dispatch('loadAccounts', {
				page: this.page,
				params: {...this.selectedFilters},
			})
		},
		filter(ev, filterType) {
			if (this.allowedFilterTypes.includes(filterType)) {
				let query
				if (Array.isArray(ev)) {
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
				})
			}
		},
		resolveInputKeys(ev) {
			if (![8, 46, 37, 38, 39, 40, 116].includes(ev.keyCode)) {
				const key = ev.key
				if (!Number.isInteger(parseInt(key))) {
					ev.returnValue = false
					if (ev.preventDefault) ev.preventDefault()
				}
			}
		},
		clearFilters() {
			this.reloadPage({}, false)
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
	},
	mounted() {
		this.loadAccounts()
		this.$store.dispatch('loadTopics')
			.then(() => (this.$store.dispatch('loadTypes')))
			.then(() => (this.$store.dispatch('loadAges')))
			.then(() => (this.freshFilterOpts()))
	},
	components: {Preloader},
}
</script>

<style lang="scss" scoped>
.main {
	&__offer {
		&-title-text, &-info-text {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&-title-text {
			cursor: pointer;
		}

		&-body {
			@media (min-width: 768px) {
				width: 50%;
			}
			@media (min-width: 1000px) {
				width: 33%;
			}
		}

		&-img-item {
			object-fit: cover;
			object-position: 50% 25%;
		}
	}

	&__body-details {
		overflow: inherit;
	}
}

.empty-result-text {
	margin: 50px 0;
	text-align: center;
}

.reset-filters-link {
	margin-left: 15px;
	line-height: 30px;
	font-size: 14px;
	transition: color .2s;

	&:hover {
		color: lighten(#007bff, 17);
	}
}
</style>

<style lang="scss">
.main {
	&__vue-select {
		& .vs__search::placeholder,
		& .vs__dropdown-toggle,
		& .vs__dropdown-menu {
			border: 1px solid #061a62;
			border-radius: 15px;
			padding: 2px 5px 6px;
			font-size: 14px;
		}

		& .vs__dropdown-option--selected {
			background-color: lighten(#5897fb, 30);
			color: inherit;
			cursor: default;
		}
	}
}
</style>
