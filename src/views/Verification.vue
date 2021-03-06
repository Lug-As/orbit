<template>
	<preloader v-if="true"/>
</template>

<script>
import Preloader from '@/components/Preloader'
import verificationService from '@/api/verificationService'

export default {
	name: 'Verification',
	components: {Preloader},
	computed: {
		id() {
			return this.$route.params['id']
		},
		hash() {
			return this.$route.params['hash']
		},
		expires() {
			return this.$route.query['expires']
		},
		signature() {
			return this.$route.query['signature']
		},
		user() {
			return this.$store.getters.user
		},
	},
	methods: {
		verify() {
			verificationService.verifyEmail(this.id, this.hash, this.expires, this.signature)
				.then(() => {
					this.$notify('Ваш E-mail успешно подтвержден! Обновите страницу, чтобы пользоваться сервисом.')
				})
				.catch(() => {
					alert('Что-то пошло не так! :( Возможно срок действия ссылки истёк либо она была повреждена.')
				})
				.finally(() => {
					this.$router.push({
						name: 'Profile',
						query: {
							'reload': 'true',
						},
					})
				})
		},
	},
	mounted() {
		if (this.user) {
			this.verify()
		} else {
			this.$onUserLoad.hook(this.verify)
		}
	},
}
</script>
