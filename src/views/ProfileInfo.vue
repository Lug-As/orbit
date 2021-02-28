<template>
	<div class="profile__information profile__contant tab-1">
		<preloader v-if="userLoading"/>
		<div v-else-if="user" class="profile__information-row">
			<div class="profile__information-title">
				<h2 class="profile__information-title-h2">
					Персональные данные
					<span class="profile__information-span profile__user_id"
							title="Ваш уникальный идентификатор">#{{ user.id }}</span>
				</h2>
				<span class="profile__information-title-confidentiality">Эти данные конфиденциальны. Только ты их
                        видишь.</span>
			</div>
			<div class="profile__information-body">
				<div class="profile__information-body-row">
					<info-item
						title="Имя"
						:value="user.name"
						:max="150"
						@change="saveInfo('name', $event)"
					/>
					<info-item
						title="Номер телефона"
						:value="user.phone"
						:phone="true"
						@change="saveInfo('phone', $event)"
					/>
					<info-item
						title="Эл. почта"
						:value="user.email"
						:email="true"
						@change="saveInfo('email', $event)"
					/>
					<info-item
						title="Телеграм"
						:value="'lug_as'"
						:max="32"
					/>
				</div>
			</div>
			<div class="profile__information-button">
				<button class="profile__information-button-text button-grand-black">Редактировать данные</button>
				<button class="profile__information-button-text button-grand-black">Сохранить изменения</button>
			</div>
		</div>
	</div>
</template>

<script>
import InfoItem from '@/components/profile/InfoItem'
import Preloader from '@/components/Preloader'

export default {
	name: 'ProfileInfo',
	components: {Preloader, InfoItem},
	computed: {
		user() {
			return this.$store.getters.user
		},
		userLoading() {
			return this.$store.getters.userLoading
		},
	},
	methods: {
		saveInfo(type, value) {
			this.user[type] = value
			this.$store.dispatch('saveUserInfo', {
				type, value,
			})
		},
	},
}
</script>

<style scoped>
.profile__user_id {
	color: #bebebe;
}
</style>
