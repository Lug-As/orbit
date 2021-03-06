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
			<div class="profile__confirmation" v-if="false">
				<div class="profile__confirmation-row">
					<div class="profile__confirmation-text">
						<p class="profile__confirmation-text-p">
							Чтобы создавать заявки и получать предложения -
							подтвердите свою почту. Мы отправили вам сообщение на E-mail.
						</p>
					</div>
					<div class="profile__confirmation-button">
						<button class="button-grand-black">
							Отправить повторно
						</button>
					</div>
				</div>
			</div>
			<router-view/>
			<div class="profile__notifications" v-if="false">
				<div class="profile__notifications-row">
					<div class="profile__notifications-img">
						<picture>
							<source srcset="../assets/img/notific.webp" type="image/webp">
							<img src="../assets/img/notific.png" alt=""></picture>
					</div>
					<div class="profile__notifications-text">
						<p class="profile__notifications-text-p">
							Благодарим за создание! <br> Ваша заявка будет рассмотрена <br> администраторами в течение 24
							часов!
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Profile',
	computed: {
		user() {
			return this.$store.getters.user
		},
		noticesCount() {
			return this.$store.getters.notices.length
		},
	},
	mounted() {
		if (this.user) {
			this.$store.dispatch('loadNotices', {page: 1})
		} else {
			this.$onUserLoad.hook(() => {
				this.$store.dispatch('loadNotices', {page: 1})
			})
		}
	},
}
</script>

<style>

</style>
