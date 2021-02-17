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
						</div>
						<div class="main__filters-row">
							<div class="main__body-filters">
								<!--								<div class="main__body-details">-->
								<!--									<h2 class="main__filters-summary">Цена</h2>-->
								<!--									<div class="main__details-row">-->
								<!--										<div class="main__details-from-to">-->
								<!--											<div class="main__details-from">-->
								<!--												<p class="main__details-text">от</p>-->
								<!--												<div class="main__details-input">-->
								<!--													<input v-model="value[0]" type="number" class="main__details-input-small">-->
								<!--												</div>-->
								<!--											</div>-->
								<!--											<div class="main__details-to">-->
								<!--												<p class="main__details-text">до</p>-->
								<!--												<div class="main__details-input">-->
								<!--													<input v-model="value[1]" type="number" class="main__details-input-small">-->
								<!--												</div>-->
								<!--											</div>-->
								<!--										</div>-->
								<!--										<div class="main__details-range">-->
								<!--											<double-range v-model="value"/>-->
								<!--										</div>-->
								<!--									</div>-->
								<!--								</div>-->
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
													<input type="tel" class="main__details-input-small">
												</div>
											</div>
											<div class="main__details-to">
												<p class="main__details-text">до</p>
												<div class="main__details-input">
													<input type="tel" class="main__details-input-small">
												</div>
											</div>
										</div>
										<div class="main__details-range">
											<input type="range" class="main__details-input-range">
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
													<input type="tel" class="main__details-input-small">
												</div>
											</div>
											<div class="main__details-to">
												<p class="main__details-text">до</p>
												<div class="main__details-input">
													<input type="tel" class="main__details-input-small">
												</div>
											</div>
										</div>
										<div class="main__details-range">
											<input type="range" class="main__details-input-range">
										</div>
									</div>
								</div>
								<div class="main__body-details">
									<h2 class="main__filters-summary">Страна</h2>
									<div class="main__details-row">
										<input type="text" class="main__details-input-big">
										<input type="text" class="main__details-input-big">
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
					<div v-if="loading" class="preload-container">
						<preloader/>
					</div>
					<template v-else-if="accounts">
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
											<button
												class="main__offer-button button-grand-black">Подробнее
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
					<h3 v-else>Пусто</h3>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'
import DoubleRange from '@/components/DoubleRange'

export default {
	name: 'AccountsList',
	data: () => ({
		// value: [0, 50],
		filterOpts: {
			topic: [],
			age: [],
			type: [],
			region: [],
		},
	}),
	components: {DoubleRange, Preloader},
	computed: {
		/**
		 * @return {Array.<Account>}
		 */
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
			return ['topic', 'type', 'age', 'region']
		},
		page() {
			let page = this.$route.query.page ? Math.abs(parseInt(this.$route.query.page)) : 1
			page = page !== 0 ? page : 1
			return page
		},
		selectedFilters() {
			return Object.keys(this.$route.query)
				.filter(key => this.allowedFilterTypes.includes(key))
				.reduce((obj, key) => {
					let rawItem = this.$route.query[key]
					if (rawItem.includes(',')) {
						rawItem = rawItem.split(',').map(item => parseInt(item))
					} else {
						rawItem = [parseInt(rawItem)]
					}
					obj[key] = rawItem.filter(item => Number.isInteger(item))
					return obj
				}, {})
		},
	},
	methods: {
		changePage(page = 1) {
			if (page !== this.page) {
				this.reloadPage({page})
			}
		},
		reloadPage(addQuery) {
			this.$router.push({
				name: this.$route.name,
				query: {
					...this.$route.query,
					...addQuery,
				},
			})
			this.loadAccounts()
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
				params: {
					...this.selectedFilters,
				},
			})
		},
		filter(val, filterType) {
			if (this.allowedFilterTypes.includes(filterType)) {
				this.reloadPage({
					[filterType]: val.join(','),
				})
			}
		},
	},
	mounted() {
		this.loadAccounts()
		this.$store.dispatch('loadTopics')
			.then(() => (this.$store.dispatch('loadTypes')))
			.then(() => (this.$store.dispatch('loadAges')))
			.then(() => {
				this.filterOpts = {
					...this.filterOpts,
					...this.selectedFilters,
				}
			})
	},
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
