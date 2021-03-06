<template>
	<section class="profile">
		<div class="container">
			<div class="profile__tab-menu">
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
					<li class="profile__tab-menu-ul-li profile__tab-menu-ul-li-last">
						<span class="profile__tab-menu-li-link black-arrow">Разместить</span>
						<ul class="profile__tab-menu-ul-drop">
							<router-link
								:to="{name: 'ProfileAccounts'}"
								custom
								v-slot="{navigate, isActive}"
							>
								<li
									@click="navigate"
									class="profile__tab-menu-ul-li-drop"
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
									class="profile__tab-menu-ul-li-drop"
									:class="{
										'choice': isActive,
									}"
								>
									<span class="profile__tab-menu-li-link">Рекламное предложение</span>
								</li>
							</router-link>
						</ul>
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
					</div>
					<div class="profile__confirmation-button">
						<preloader height="90" v-if="mailSending"/>
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

export default {
	name: 'Profile',
	data: () => ({
		mailSending: false,
	}),
	components: {Preloader},
	computed: {
		user() {
			return this.$store.getters.user
		},
		userLoading() {
			return this.$store.getters.userLoading
		},
		noticesCount() {
			return this.$store.getters.notices.length
		},
	},
	methods: {
		resendVerification() {
			this.mailSending = true
			verificationService.resendEmailVerification()
				.then(() => {
					this.$notify('Письмо с подтверждением отправлено на ваш E-mail.')
				})
				.catch(e => {
					if (e.response && e.response.status === 429) {
						alert('Вы слишком часто просите переотправить вам подтверждение. Повторите попытку позже.')
					}
				})
				.finally(() => {
					this.mailSending = false
				})
		},
	},
	mounted() {
		if (this.user) {
			if (this.user.verifyed) {
				this.$store.dispatch('loadNotices', {page: 1})
			}
		} else {
			this.$onUserLoad.hook(() => {
				if (this.user.verifyed) {
					this.$store.dispatch('loadNotices', {page: 1})
				}
			})
		}
	},
}
</script>

<style>

</style>
