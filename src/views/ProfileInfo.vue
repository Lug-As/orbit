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
				<div class="profile__questionnaire-avatar-info-wrap">
					<div
						v-show="!userImageLoading"
						class="profile__questionnaire-avatar profile__questionnaire-avatar-info"
					>
						<div class="profile__questionnaire-img profile__questionnaire-img-info cursor"
							  @click="$refs['imageinput'].click()">
							<img v-if="src" :src="src" alt="">
							<img v-else-if="user.image" :src="user.image" alt="">
							<picture v-else>
								<source srcset="../assets/img/noneimg.webp" type="image/webp">
								<img src="../assets/img/noneimg.png" alt="">
							</picture>
						</div>
						<div class="profile__questionnaire-load profile__questionnaire-load-info">
							<label class="profile__questionnaire-load-button profile__questionnaire-load-button-info">
								<input
									ref="imageinput"
									@change="uploadImage"
									type="file"
									style="display:none"
								>
								Загрузить фото
							</label>
						</div>
					</div>
					<preloader v-show="userImageLoading" height="200"/>
				</div>
			</div>
			<p class="profile__questionnaire-helper-text secondary">Нажмите на любое из полей, чтобы отредактировать
				его.</p>
		</div>
	</div>
</template>

<script>
import InfoItem from '@/components/profile/InfoItem'
import Preloader from '@/components/Preloader'

const MAX_FILE_SIZE = 5000000
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export default {
	name: 'ProfileInfo',
	title: 'Мои данные',
	components: {Preloader, InfoItem},
	data: () => ({
		image: null,
		src: null,
		reader: null,
	}),
	computed: {
		user() {
			return this.$store.getters.user
		},
		userLoading() {
			return this.$store.getters.userLoading
		},
		userImageLoading() {
			return this.$store.getters.userImageLoading
		},
	},
	watch: {
		image(file) {
			if (file) {
				this.reader.readAsDataURL(file)
				this.saveInfo('image', file, () => {
					this.$router.push({
						name: this.$route.name,
						query: {
							...this.$route.query,
							'image_loaded': 'true',
						},
					})
					this.$router.go(0)
				})
			} else {
				this.src = ''
			}
		},
	},
	methods: {
		uploadImage(ev) {
			const file = ev.target.files[0]
			if (file) {
				if (!ALLOWED_MIME_TYPES.includes(file.type)) {
					return alert('Картинка должна быть в этих форматах ' + ALLOWED_MIME_TYPES.join(', '))
				}
				if (file.size > MAX_FILE_SIZE) {
					return alert('Размер файла не должен превышать ' + Math.floor(MAX_FILE_SIZE / 1000 / 1000) + ' МБ')
				}
				this.image = file
			}
		},
		saveInfo(type, value, hook = null) {
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
						if (hook) {
							hook()
						} else {
							this.$notify('Новые данные сохранены!')
						}
						if (type === 'email') {
							setTimeout(() => {
								this.$router.go(0)
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
	mounted() {
		this.reader = new FileReader()
		this.reader.onloadend = () => {
			this.src = this.reader.result
		}
	},
}
</script>

