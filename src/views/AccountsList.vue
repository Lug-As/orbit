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
									<img src="../assets/img/filter.png" alt="">
								</picture>
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
											:reduce="opt => opt.id"
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
											:reduce="opt => opt.id"
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
											:reduce="opt => opt.id"
											multiple
											class="main__vue-select"
											@input="filter($event, 'age')"
										/>
									</div>
								</div>
								<div class="main__body-details">
									<h2 class="main__filters-summary">Регион</h2>
									<div class="main__details-row">
										<v-select
											label="name"
											v-model="filterOpts.region"
											:options="regions"
											:reduce="opt => opt.id"
											:selectable="option => !option.hasOwnProperty('group')"
											class="main__vue-select main__vue-select--region"
											multiple
											@input="filter($event, 'region')"
										>
											<template #option="{ group, name }">
												<div v-if="group" class="group">
													{{ group }}
												</div>
												<template v-else>
													{{ name }}
												</template>
											</template>
										</v-select>
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
								<v-select
									v-model="sortOpt"
									:options="sortOptions"
									:reduce="label => label.key"
									class="main__sort-vue-select"
									@input="sort"
									:clearable="false"
									:searchable="false"
								/>
							</div>
							<div class="main__offers-search">
								<input
									v-model.trim.lazy="searchQuery"
									type="text"
									placeholder="Введите ник или имя блогера"
									@change="search"
								>
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
							<div class="objects-pagination">
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
	title: 'Все блогеры',
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
		sortOpt: null,
		defSortOpt: 4,
		oldSortOpt: null,
		searchQuery: null,
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
		regions() {
			return this.$store.getters.regions
		},
		allowedFilterTypes() {
			return Object.keys(this.filterOpts)
		},
		allowedSortTypes() {
			return this.sortOptions.map(opt => opt.type).filter(i => i !== undefined)
		},
		sortOptions() {
			let opts = [
				{
					key: 0,
					label: 'По количеству подписчиков',
					type: 'followers',
				},
				{
					key: 1,
					label: 'По количеству лайков',
					type: 'likes',
				},
				{
					key: 4,
					label: 'Новые',
				},
			]
			if (this.filterOpts.type && this.filterOpts.type.length === 1) {
				opts = opts.concat([
					{
						key: 2,
						label: 'По возрастанию цены рекламы',
						type: 'price',
						dir: 'asc',
					},
					{
						key: 3,
						label: 'По убыванию цены рекламы',
						type: 'price',
					}])
			}
			return opts
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
		selectedSort() {
			const param = this.$route.query['sort']
			const dir = this.$route.query['dir']
			if (this.allowedSortTypes.includes(param)) {
				const sortObj = this.getSortObjectByType(param, dir)
				const out = {
					sort: param,
				}
				if (sortObj.dir) {
					out.dir = sortObj.dir
				}
				return out
			}
			return {}
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
				.then(() => this.freshOpts())
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
			if (minPrice === null && maxPrice === null) {
				return 'Договорная'
			}
			if (minPrice === null || maxPrice === null) {
				return (minPrice || maxPrice) + '₽'
			}
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
					...this.selectedSort,
					...this.queryObject,
				},
			})
		},
		sort(sortKey) {
			if (sortKey === null) {
				return this.sort(this.sortOpt = this.defSortOpt)
			}
			if ((this.oldSortOpt !== null && this.oldSortOpt !== this.sortOpt) || this.sortOpt !== this.defSortOpt) {
				const sortObj = this.getSortObjectByKey(sortKey)
				this.reloadPage({
					sort: sortObj.type,
					dir: sortObj.dir,
				})
			}
			this.oldSortOpt = this.sortOpt
		},
		search(ev) {
			const q = ev.target.value
			this.reloadPage({
				q,
			})
		},
		getSortObjectByKey(sortKey) {
			return this.sortOptions.find(opt => opt.key === sortKey)
		},
		getSortObjectByType(type, dir) {
			return this.sortOptions.find(opt => {
				let find = opt.type === type
				find = dir ? find && opt.dir : find && !opt.dir
				return find
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
		resolveInputKeys(ev) {
			const allowedKeyCodes = [8, 46, 37, 38, 39, 40, 116, 13]
			if (!allowedKeyCodes.includes(ev.keyCode)) {
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
		freshOpts() {
			this.freshFilterOpts()
			this.freshSortOpt()
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
		freshSortOpt() {
			let val = this.defSortOpt
			if (Object.keys(this.selectedSort).length) {
				const sortObj = this.getSortObjectByType(this.selectedSort.sort, this.selectedSort.dir)
				val = sortObj.key
			}
			this.sortOpt = val
		},
		freshSearchQuery() {
			this.searchQuery = this.paramQuery
		},
	},
	mounted() {
		if (!this.accounts.length || this.page !== this.accountsPagination.current_page) {
			this.loadAccounts()
		}
		this.$store.dispatch('loadTopics')
			.then(() => this.$store.dispatch('loadTypes'))
			.then(() => this.$store.dispatch('loadAges'))
			.then(() => this.$store.dispatch('loadRegions'))
			.then(() => this.freshOpts())
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

		&s-search {
			font-size: 15px;
			@media (min-width: 1366px) {
				input {
					padding-left: 8px;
				}
				width: 30%;
			}
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
}
</style>
