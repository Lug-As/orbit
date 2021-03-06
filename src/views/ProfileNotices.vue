<template>
	<div class="profile__notification profile__contant tab-2">
		<preloader v-if="noticesLoading"/>
		<div v-else-if="notices && notices.length" class="profile__notification-row">
			<div
				v-for="notice in notices"
				class="profile__notification-body"
			>
				<profile-response-notice v-if="notice.type === 'responses'" :notice="notice"/>
				<profile-offer-notice v-else-if="notice.type === 'offers'" :notice="notice"/>
			</div>
		</div>
		<div class="objects-pagination">
			<pagination
				:data="noticesPagination"
				:limit="2"
				@pagination-change-page="changePage"
			/>
		</div>
	</div>
</template>

<script>
import Preloader from '@/components/Preloader'
import ProfileOfferNotice from '@/components/profile/ProfileOfferNotice'
import ProfileResponseNotice from '@/components/profile/ProfileResponseNotice'

export default {
	name: 'ProfileNotices',
	components: {ProfileResponseNotice, ProfileOfferNotice, Preloader},
	title: 'Уведомления',
	computed: {
		notices() {
			return this.$store.getters.notices
		},
		noticesLoading() {
			return this.$store.getters.noticesLoading
		},
		noticesPagination() {
			const pagination = this.$store.getters.noticesPagination,
				notsCount = pagination.total
			if (notsCount) {
				this.$setPageTitle(`Уведомления (${notsCount})`)
			}
			return pagination
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
		loadNotices() {
			this.$store.dispatch('loadNotices', {
				page: this.page,
			})
		},
		clearQueryParam(key) {
			if (this.$route.query[key] !== undefined) {
				let query = Object.assign({}, this.$route.query)
				delete query[key]
				this.$router.replace({query})
			}
		},
		scrollToTop(top = 0) {
			window.scrollTo({
				top,
				behavior: 'smooth',
			})
		},
		changePage(page = 1) {
			if (page !== this.page) {
				this.scrollToTop(280)
				this.$router.push({
					name: this.$route.name,
					query: {
						page,
					},
				})
					.then(() => this.loadNotices())
				return true
			}
			return false
		},
	},
}
</script>
