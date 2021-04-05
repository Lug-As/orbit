<template>
	<section class="profile">
		<div class="container">
			<div class="profile__tab-menu">
				<h2 class="profile__main-title">Личный кабинет</h2>
				<ul class="profile__tab-menu-ul">
					<router-link
						:to="{name: 'Profile'}"
						active-class="choice"
						:exact="true"
						class="profile__tab-menu-ul-li profile__tab-menu-ul-li-drop"
					>
						<div class="profile__tab-menu-li-body">
							<span class="profile__tab-menu-li-link">Мои данные</span>
						</div>
					</router-link>
					<router-link
						:to="{name: 'ProfileNotices'}"
						active-class="choice"
						class="profile__tab-menu-ul-li profile__tab-menu-ul-li-drop"
					>
						<div class="profile__tab-menu-li-body">
							<span class="profile__tab-menu-li-link">Уведомления</span>
							<span v-if="noticesCount" class="profile__tab-menu-li-span">{{ noticesCount }}</span>
						</div>
					</router-link>
					<li
						v-click-outside="hideMobileMenu"
						@mouseenter="showDesktopMenu"
						@mouseleave="hideDesktopMenu"
						@click="toggleMobileMenu"
						class="profile__tab-menu-ul-li profile__tab-menu-ul-li-last"
						:class="{
							'profile__tab-menu-ul-li-hover': displayMenu,
						}"
					>
						<span class="profile__tab-menu-li-link black-arrow">Разместить</span>
						<transition name="fade">
							<ul class="profile__tab-menu-ul-drop" @click="hideDesktopMenu" v-if="displayMenu">
								<router-link
									:to="{name: 'ProfileAccounts'}"
									custom
									v-slot="{navigate, isActive}"
								>
									<li
										@click="navigate"
										class="profile__tab-menu-ul-li profile__tab-menu-ul-li-drop"
										:class="{
										'choice': isActive,
									}"
									>
										<span class="profile__tab-menu-li-link">Анкету блогера</span>
									</li>
								</router-link>
								<router-link
									:to="{name: 'ProfileProjects'}"
									custom
									v-slot="{navigate, isActive}"
								>
									<li
										@click="navigate"
										class="profile__tab-menu-ul-li profile__tab-menu-ul-li-drop"
										:class="{
										'choice': isActive,
									}"
									>
										<span class="profile__tab-menu-li-link">Рекламное предложение</span>
									</li>
								</router-link>
							</ul>
						</transition>
					</li>
				</ul>
			</div>
			<div class="profile__confirmation" v-if="!userLoading && !user.verifyed">
				<div class="profile__confirmation-row">
					<div class="profile__confirmation-text">
						<p class="profile__confirmation-text-p">
							Чтобы создавать заявки и получать предложения - подтвердите свою почту. Мы отправили вам сообщение
							на E-mail.
						</p>
						<p class="profile__confirmation-text-p secondary">
							(Обновите страницу, если вы уже подтвердили почту)
						</p>
					</div>
					<div class="profile__confirmation-button">
						<preloader small v-if="mailSending"/>
						<button
							v-else
							@click="resendVerification"
							class="button-grand-black"
						>
							Отправить повторно
						</button>
					</div>
				</div>
			</div>
			<br>
			<preloader v-if="userLoading"/>
			<router-view v-else/>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'
import verificationService from '@/api/verificationService'
import vClickOutside from 'v-click-outside'

export default {
	name: 'Profile',
	data: () => ({
		mailSending: false,
		displayMenu: false,
	}),
	directives: {
		clickOutside: vClickOutside.directive,
	},
	components: {Preloader},
	computed: {
		user() {
			return this.$store.getters.user
		},
		userLoading() {
			return this.$store.getters.userLoading
		},
		noticesCount() {
			return this.$store.getters.noticesPagination.total
		},
		isDesktop() {
			return document.body.clientWidth >= 1366
		},
		isMobile() {
			return !this.isDesktop
		},
	},
	methods: {
		showDesktopMenu() {
			if (this.isDesktop) {
				this.displayMenu = true
			}
		},
		hideDesktopMenu() {
			if (this.isDesktop) {
				this.displayMenu = false
			}
		},
		toggleMobileMenu() {
			if (this.isMobile) {
				this.displayMenu = !this.displayMenu
			}
		},
		hideMobileMenu() {
			if (this.isMobile) {
				this.displayMenu = false
			}
		},
		resendVerification() {
			this.mailSending = true
			verificationService.resendEmailVerification()
				.then(() => {
					this.$notify('Письмо с подтверждением отправлено на ваш E-mail.')
				})
				.catch(e => {
					if (e.response && e.response.status === 429) {
						alert('Вы слишком часто просите переотправить Вам подтверждение. Повторите попытку позже.')
					}
				})
				.finally(() => {
					this.mailSending = false
				})
		},
		loadNotices() {
			if (this.user.verifyed) {
				this.$store.dispatch('loadNotices', {
					page: this.$route.name === 'ProfileNotices' ? this.page : 1,
				})
			}
		},
	},
	mounted() {
		if (this.$route.query['reload']) {
			this.clearQueryParam('reload')
			setTimeout(() => {
				location.reload()
			}, 400)
		}
		if (this.user) {
			this.loadNotices()
		} else {
			this.$onUserLoad.hook(() => {
				this.loadNotices()
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.profile {
	margin-top: 25px;
}

.profile__main-title {
	font-family: "Montserrat-Bold", sans-serif;
	font-size: 24px;
	margin-bottom: 30px;
}
</style>
