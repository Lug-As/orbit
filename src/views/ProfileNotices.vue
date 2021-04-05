<template>
	<div class="profile__notification profile__contant tab-2">
		<preloader v-if="noticesLoading"/>
		<div v-else-if="notices && notices.length" class="profile__notification-row">
			<template
				v-for="notice in notices"
			>
				<profile-response-notice v-if="notice.type === 'responses'" :notice="notice"/>
				<profile-offer-notice v-else-if="notice.type === 'offers'" :notice="notice"/>
				<profile-request-notice v-else-if="notice.type === 'requests'" :notice="notice"/>
			</template>
		</div>
		<template v-else>
			<p class="empty-result-text">У вас пока нет уведомлений</p>
		</template>
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
import ProfileRequestNotice from '@/components/profile/ProfileRequestNotice'

export default {
	name: 'ProfileNotices',
	components: {ProfileRequestNotice, ProfileResponseNotice, ProfileOfferNotice, Preloader},
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
	},
	methods: {
		loadNotices() {
			this.$store.dispatch('loadNotices', {
				page: this.page,
			})
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
