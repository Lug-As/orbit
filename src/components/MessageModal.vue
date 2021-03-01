<template>
	<div class="message-modal">
		<transition name="fade">
			<div
				v-if="showModal"
				class="bloger__massage"
				@click.self="closeModal()"
			>
				<div class="bloger__massage-row">
							<span
								class="bloger__massage-close"
								@click="closeModal()"
							>&times;</span>
					<div class="bloger__massage-alert">
						<h2 class="bloger__alert-h2">
							Все сообщения модерируются. За распространение
							некорректных предложений, или предложений
							неподходящих для нашего сервиса мы вправе отключать
							пользователей. <span class="bloger__alert-span">Будьте корректны!</span>
						</h2>
					</div>
					<form class="bloger__massage-comment" @submit.prevent="handleForm">
						<slot></slot>
						<div class="bloger__massage-title">
							<h2 class="bloger__title-text">Оставь комментарий по поводу задачи</h2>
						</div>
						<div class="bloger__comment-text">
									<textarea
										v-model.trim="offerText"
										class="bloger__text-area"
									></textarea>
							<span
								:class="{
											'red': !this.$v.offerText.maxLength,
										}"
							>{{ this.offerText.length }}/{{ this.$v.offerText.$params.maxLength.max }}</span>
							<p v-if="errorMsg.length" class="red">{{ errorMsg }}</p>
						</div>
						<div class="bloger__comment-button">
							<button class="bloger__button-border">Предложить выполнение задачи</button>
						</div>
					</form>
				</div>
			</div>
		</transition>
		<transition name="side-slide">
			<div class="profile__notifications" v-if="showThanks" @click="closeThanks">
				<div class="profile__notifications-row">
					<div class="profile__notifications-img">
						<picture>
							<source srcset="../assets/img/notific.webp" type="image/webp">
							<img src="../assets/img/notific.png" alt=""></picture>
					</div>
					<div class="profile__notifications-text">
						<p class="profile__notifications-text-p" v-html="notifyText"></p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'

export default {
	name: 'MessageModal',
	props: {
		open: {
			type: Boolean,
			default: false,
			required: false,
		},
		notify: {
			type: Boolean,
			default: false,
			required: false,
		},
		notifyText: {
			type: String,
			default: 'Благодарим за предложение!<br> Блогер уже оповещен вашим <br>личным предложением!',
			required: false,
		},
	},
	data: () => ({
		showModal: false,
		showThanks: false,
		offerText: '',
		errorMsg: '',
	}),
	watch: {
		open(val) {
			if (val === true) {
				this.showModal = true
			}
		},
		notify(val) {
			if (val === true) {
				this.blinkThanks()
			}
		},
	},
	methods: {
		closeModal() {
			this.showModal = false
			this.$emit('close-modal')
		},
		closeThanks() {
			this.showThanks = false
			this.$emit('close-notify')
		},
		openThanks() {
			this.showThanks = true
		},
		blinkThanks() {
			this.openThanks()
			setTimeout(() => {
				if (this.showThanks) {
					this.closeThanks()
				}
			}, 2500)
		},
		handleForm() {
			if (this.validate()) {
				this.$emit('submit', this.offerText)
				this.offerText = ''
				this.errorMsg = ''
				this.$v.$reset()
				this.closeModal()
			}
		},
		validate() {
			this.$v.$touch()
			if (this.$v.$invalid) {
				this.setErrors()
				return false
			}
			return true
		},
		setErrors() {
			if (!this.$v.offerText.required) {
				this.errorMsg = 'Это поле обязательно для заполнения.'
			} else if (!this.$v.offerText.maxLength) {
				this.errorMsg = 'Текст предложения не должен превышать ' + this.$v.offerText.$params.maxLength.max + ' символов.'
			}
		},
	},
	validations: {
		offerText: {
			required,
			maxLength: maxLength(2000),
		},
	},
}
</script>
