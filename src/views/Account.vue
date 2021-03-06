<template>
	<section class="bloger">
		<div class="container">
			<preloader v-if="loading"/>
			<template v-else-if="(account && Object.keys(account).length !== 0)">
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
									<a class="bloger__title-link" :href="account.reference">
										Перейти в ток-ток аккаунт
									</a>
								</div>
							</div>
							<div class="bloger__body-statistics border-body">
								<p class="bloger__statistics-text">
									{{ account.followers | round }} подписчиков / {{ account.likes | round }} лайков.
								</p>
							</div>
							<div class="bloger__body-theme border-body">
								<h3 class="bloger__body-title">Тема канала: </h3>
								<p class="bloger__body-text">{{ account.topics | slashedList }}</p>
							</div>
							<div class="bloger__body-view border-body">
								<h3 class="bloger__body-title">Вид / Цена рекламы:</h3>
								<ul class="bloger__view-ul">
									<li
										v-for="type in account.ad_types"
										:key="type.id"
										class="bloger__ul-li bloger__body-text"
									>
										{{ type.name }} - {{ type.price ? `${type.price} ₽` : 'Договорная' }}
									</li>
								</ul>
							</div>
							<div class="bloger__body-about border-body" v-if="account.about">
								<h3 class="bloger__body-title">О себе: </h3>
								<p class="bloger__body-text text-padding">{{ account.about }}</p>
							</div>
							<div class="bloger__body-age border-body" v-if="account.ages">
								<h3 class="bloger__body-title">Возрастные категории аудитории:</h3>
								<p class="bloger__body-text">
									{{ account.ages | slashedList('range') }}
								</p>
							</div>
							<div class="bloger__body-place border-body" v-if="account.region">
								<h3 class="bloger__body-title">Субъект РФ: </h3>
								<p class="bloger__body-text">{{ account.region }}, {{ account.country }}.</p>
							</div>
							<div class="bloger__body-button" v-if="notMyAccount">
								<button
									class="bloger__button button-grand-black big"
									:disabled="!verifyed"
									@click="callModal"
								>
									Предложить работу
								</button>
								<a :href="account.reference" class="bloger__button-black button-grand-transparent">
									Перейти в ток-ток аккаунт
								</a>
								<div
									v-if="!verifyed"
									class="bloger__button-confirmation"
								>
									<picture>
										<source srcset="../assets/img/Иллюстрация.webp" type="image/webp">
										<img src="../assets/img/Иллюстрация.png" alt="">
									</picture>
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
				<message-modal
					:open="showModal"
					@close-modal="showModal = false"
					@submit="sendOffer"
				/>
			</template>
			<h3 v-else>Пусто</h3>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'
import {LightGallery} from 'vue-light-gallery'
import offerService from '@/api/offerService'
import MessageModal from '@/components/MessageModal'

export default {
	name: 'Account',
	components: {MessageModal, Preloader, LightGallery},
	data: () => ({
		showModal: false,
		index: null,
	}),
	computed: {
		account() {
			return this.$store.getters.currentAccount
		},
		formatGallery() {
			const out = []
			if (this.account) {
				const image_count = this.account.gallery.length + 1
				const first_title = image_count > 1 ? '1/' + image_count : null
				out.push({
					title: first_title,
					url: this.account.image,
				})
				Object.keys(this.account.gallery)
					.forEach(key => {
						let item = this.account.gallery[key]
						let current_count = Number(key) + 2
						out.push({
							title: current_count + '/' + image_count,
							url: item.src,
						})
					})
			}
			return out
		},
		loading() {
			return this.$store.getters.loading
		},
		id() {
			return this.$route.params.id
		},
		notMyAccount() {
			return !this.user || this.account.user_id !== this.user.id
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
		sendOffer(text) {
			const offer = {
				account_id: this.id,
				text,
			}
			offerService.sendOffer(offer)
				.then(() => {
					this.$notify('Благодарим за предложение! Блогер уже оповещен вашим личным предложением!')
				})
				.catch(() => {
					alert('Произошла ошибка отправки формы. Повторите позже.')
				})
		},
		callModal() {
			this.showModal = true
		},
	},
	mounted() {
		this.$store.dispatch('loadAccount', this.id)
			.then(account => {
				this.$setPageTitle(account.title + ', ' + account.username)
			})
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
</style>
