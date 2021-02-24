<template>
	<section class="bloger">
		<div class="container">
			<preloader v-if="loading"/>
			<template v-else-if="account">
				<div class="bloger__row">
					<div class="bloger__row-img">
						<div class="bloger__img">
							<img @click="index = 0" :src="account.image" :alt="account.title">
						</div>
						<div class="bloger__img-small" v-if="formatGallery.length">
							<div
								v-for="i in 3"
								:key="i"
								v-if="formatGallery[i]"
								@click="index = i"
								class="bloger__img-link"
							>
								<img
									:src="formatGallery[i].url"
									:alt="account.title"
								>
							</div>
						</div>
					</div>
					<div class="bloger__body">
						<div class="bloger__body-row">
							<div class="bloger__row-title">
								<h2 class="bloger__title-h2">
									{{ account.username }}
								</h2>
								<div class="bloger__title-text border-body">
									<h3 class="bloger__title-nickname">{{ account.title }}</h3>
									<a class="bloger__title-link" :href="reference">Перейти в ток-ток
										аккаунт</a>
								</div>
							</div>
							<div class="bloger__body-statistics border-body">
								<p class="bloger__statistics-text">
									{{ account.followers | round }} подписчиков / {{ account.likes | round }} лайков.
								</p>
							</div>
							<div class="bloger__body-theme border-body">
								<h3 class="bloger__body-title">Тема канала: </h3>
								<p class="bloger__body-text"> {{ account.topics | slashedList }}</p>
							</div>
							<div class="bloger__body-view border-body">
								<h3 class="bloger__body-title">Вид / Цена рекламы:</h3>
								<ul class="bloger__view-ul">
									<li v-for="type in account.ad_types"
										 :key="type.id"
										 class="bloger__ul-li bloger__body-text"
									>
										{{ type.name }} - от {{ type.price }} ₽;
									</li>
								</ul>
							</div>
							<div class="bloger__body-about border-body">
								<h3 class="bloger__body-title">О себе: </h3>
								<p class="bloger__body-text text-padding">{{ account.about }}</p>
							</div>
							<div class="bloger__body-age border-body">
								<h3 class="bloger__body-title">Возрастные категории аудитории:</h3>
								<p class="bloger__body-text">
									{{ account.ages | slashedList('range') }}
								</p>
							</div>
							<div class="bloger__body-place border-body">
								<h3 class="bloger__body-title">Субъект РФ: </h3>
								<p class="bloger__body-text">{{ account.region }}, {{ account.country }}.</p>
							</div>
							<div class="bloger__body-button">
								<button
									class="bloger__button button-grand-black big"
									:disabled="!verifyed"
									@click="toggleModal"
								>
									Предложить работу
								</button>
								<button class="bloger__button-black button-grand-transparent">Перейти в ток-ток аккаунт</button>
								<div
									v-if="!verifyed"
									class="bloger__button-confirmation"
								>
									<picture>
										<source srcset="../assets/img/Иллюстрация.webp" type="image/webp">
										<img src="../assets/img/Иллюстрация.png" alt=""></picture>
									<p class="bloger__button-text">
										<template
											v-if="!user"
										>
											Чтобы делать предложения, войди или зарегистрируйся.
										</template>
										<template
											v-else-if="!verifyed"
										>
											Чтобы делать предложения, подтверди свой почтовый ящик.
										</template>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<light-gallery
					:images="formatGallery"
					:index="index"
					:disable-scroll="true"
					@close="index = null"
				/>
				<transition name="fade">
					<div
						v-if="showModal"
						class="bloger__massage"
						@click.self="toggleModal(false)"
					>
						<div class="bloger__massage-row">
							<span
								class="bloger__massage-close"
								@click="toggleModal(false)"
							>&times;</span>
							<div class="bloger__massage-alert">
								<h2 class="bloger__alert-h2">
									Все сообщения модерируются. За распространение
									некорректных предложений, или предложений
									неподходящих для нашего сервиса мы вправе отключать
									пользователей. <span class="bloger__alert-span">Будьте корректны!</span>
								</h2>
							</div>
							<form class="bloger__massage-comment" @submit.prevent="sendOffer">
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
				<transition name="fade">
					<div class="profile__notifications" v-if="showThanks" @click="toggleThanks(false)">
						<div class="profile__notifications-row">
							<div class="profile__notifications-img">
								<picture>
									<source srcset="../assets/img/notific.webp" type="image/webp">
									<img src="../assets/img/notific.png" alt=""></picture>
							</div>
							<div class="profile__notifications-text">
								<p class="profile__notifications-text-p">
									Благодарим за предложение!<br> Блогер уже оповещен вашим <br>личным предложением!
								</p>
							</div>
						</div>
					</div>
				</transition>
			</template>
			<h3 v-else>Пусто</h3>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'
import {LightGallery} from 'vue-light-gallery'
import {required, maxLength} from 'vuelidate/lib/validators'
import offerService from '@/api/offerService'

export default {
	name: 'Account',
	components: {Preloader, LightGallery},
	data: () => ({
		showModal: false,
		showThanks: false,
		offerText: '',
		errorMsg: '',
		index: null,
	}),
	computed: {
		account() {
			return this.$store.getters.currentAccount
		},
		formatGallery() {
			const out = []
			if (this.account) {
				out.push({
					url: this.account.image,
				})
				Object.keys(this.account.gallery)
					.forEach(key => {
						let item = this.account.gallery[key]
						out.push({
							url: item.src,
						})
					})
			}
			return out
		},
		loading() {
			return this.$store.getters.loading
		},
		reference() {
			return 'https://www.tiktok.com/' + this.account.title
		},
		id() {
			return this.$route.params.id
		},
		verifyed() {
			if (this.user) {
				return this.user.verifyed
			}
			return null
		},
		user() {
			return this.$store.getters.user
		},
	},
	methods: {
		toggleModal(force = null) {
			if (typeof force === 'boolean') {
				return this.showModal = force
			}
			this.showModal = !this.showModal
		},
		toggleThanks(force = null) {
			if (typeof force === 'boolean') {
				return this.showThanks = force
			}
			this.showThanks = !this.showThanks
		},
		blinkThanks() {
			this.toggleThanks(true)
			setTimeout(() => {
				this.toggleThanks(false)
			}, 3000)
		},
		sendOffer() {
			if (this.validate()) {
				const offer = {
					text: this.offerText,
					account_id: this.id,
				}
				offerService.sendOffer(offer)
					.then(() => {
						this.offerText = ''
						this.$v.$reset()
						this.toggleModal(false)
						this.blinkThanks()
					})
					.catch(() => {
						alert('Произошла ошибка отправки формы. Повторите позже.')
					})
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
	mounted() {
		this.$store.dispatch('loadAccount', this.id)
			.catch(e => {
				if (e.response && e.response.status && e.response.status === 404) {
					let route = this.$router.match({name: '404'})
					this.$router.history.updateRoute(route)
				}
			})
	},
	beforeDestroy() {
		this.$store.commit('destroyCurrentAccount')
	},
}
</script>

<style scoped lang="scss">
.bloger__img img, .bloger__img-link img {
	object-fit: cover;
	object-position: 50% 25%;
}

.bloger__massage {
	&-row {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

.profile__notifications {
	cursor: pointer;
}
</style>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
	transition: opacity .4s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}

.red {
	color: #ff0000;
}
</style>
