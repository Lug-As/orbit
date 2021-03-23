<template>
	<div class="profile__information profile__contant tab-1">
		<preloader v-if="userLoading"/>
		<div v-else-if="user" class="profile__information-row">
			<div class="profile__information-title">
				<h2 class="profile__information-title-h2">
					Персональные данные
					<span class="profile__information-span secondary"
							title="Ваш уникальный идентификатор">#{{ user.id }}</span>
				</h2>
				<span class="profile__information-title-confidentiality">
					Ваши данные конфиденциальны, доступ к ним есть только у вас.
				</span>
			</div>
			<div class="profile__information-body">
				<div class="profile__information-body-row">
					<info-item
						title="Имя"
						:value="user.name"
						:max="150"
						required
						@change="saveInfo('name', $event)"
					/>
					<info-item
						title="Номер телефона"
						:value="user.phone"
						:phone="true"
						required
						@change="saveInfo('phone', $event)"
					/>
					<info-item
						ref="emailinput"
						title="Эл. почта"
						:value="user.email"
						:email="true"
						required
						@change="saveInfo('email', $event)"
					/>
					<info-item
						title="Телеграм"
						:value="user.telegram"
						:max="32"
						@change="saveInfo('telegram', $event)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import InfoItem from '@/components/profile/InfoItem'
import Preloader from '@/components/Preloader'

export default {
	name: 'ProfileInfo',
	title: 'Мои данные',
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
			let passEmail = true
			const oldVal = this.user[type]
			if (type === 'email') {
				passEmail = confirm('Вы точно хотите изменить email? После его изменения, его необходимо потвердить.')
			}
			if (passEmail) {
				this.user[type] = value
				this.$store.dispatch('saveUserInfo', {
					type, value,
				})
					.then(() => {
						this.$notify('Новые данные сохранены!')
						if (type === 'email') {
							setTimeout(() => {
								location.reload()
							}, 800)
						}
					})
					.catch(e => {
						let displayError = true
						if (
							e.response && e.response.data && e.response.data['errors'] && e.response.data['errors']['email']
						) {
							const email_error = e.response.data['errors']['email'][0]
							if (email_error === 'The email has already been taken.') {
								alert('Такой email уже занят.')
								this.user[type] = oldVal
								this.$refs['emailinput'].freshData()
								displayError = false
							}
						}
						if (displayError) {
							alert('Произошла ошибка отправки формы. Повторите позже.')
							this.user[type] = oldVal
							this.$refs['emailinput'].freshData()
						}
					})
			} else {
				this.$refs['emailinput'].freshData()
			}
		},
	},
}
</script>

