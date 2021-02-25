<template>
	<section class="offer">
		<div class="container">
			<preloader v-if="loading"/>
			<template v-else-if="(project && Object.keys(project).length !== 0)">
				<div class="offer__title-advertiser">
					<h2 class="offer__title-advertiser-text">
						{{ project.username }} <span class="offer__advertiser-span">Рекламодатель</span>
					</h2>
				</div>
				<div class="offer__body">
					<div class="offer__body-row">
						<div class="offer__body-title">
							<h2 class="offer__body-title-text">
								{{ project.name }}
							</h2>
						</div>
						<div class="offer__body-item">
							<div class="offer__body-item-title offer__body-item-title-block">
								<h2 class="offer__body-item-title-text">
									Описание:
								</h2>
								<p class="offer__body-item-text">
									{{ project.text }}
								</p>
							</div>
						</div>
						<div class="offer__body-item" v-if="project.followers_from || project.followers_to">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">
									Желаемая аудитория:
								</h2>
								<p class="offer__body-item-text">
									<template v-if="project.followers_from">
										от {{ project.followers_from }}
									</template>
									<template v-if="project.followers_to">
										до {{ project.followers_to }}
									</template>
									подписчиков
								</p>
							</div>
						</div>
						<div class="offer__body-item" v-if="project.region">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">
									Регион:
								</h2>
								<p class="offer__body-item-text">
									{{ project.region }}, {{ project.country }}.
								</p>
							</div>
						</div>
						<div class="offer__body-item">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">
									Тип рекламы:
								</h2>
								<p class="offer__body-item-text">
									{{ project.ad_types | slashedList }}
								</p>
							</div>
						</div>
					</div>
					<div class="offer__body-price">
						<div class="offer__body-price-row">
							<div class="offer__body-price-title">
								<h2 class="offer__body-price-title-text">
									Бюджет:
								</h2>
								<span class="offer__body-price-title-span">{{ project.budget }}₽</span>
							</div>
							<div class="offer__body-price-button">
								<button
									class="button-grand-black big button__open-massage"
									:disabled="!verifyed"
									@click="callModal"
								>
									Предложить выполнение работы
								</button>
							</div>
							<div
								v-if="!verifyed"
								class="offer__body-price-confirmation bloger__button-confirmation"
							>
								<picture>
									<source srcset="../assets/img/Иллюстрация.webp" type="image/webp">
									<img src="../assets/img/Иллюстрация.png" alt="">
								</picture>
								<p class="bloger__button-text">
									<template
										v-if="!user"
									>
										Чтобы оставлять отклики, войди или зарегистрируйся.
									</template>
									<template
										v-else-if="!verifyed"
									>
										Чтобы оставлять отклики, подтверди свой почтовый ящик.
									</template>
								</p>
							</div>
						</div>
					</div>
				</div>
				<message-modal
					:open="showModal"
					:notify="showNotify"
					@close-modal="showModal = false"
					@close-notify="showNotify = false"
					@submit="sendResponse"
					:notify-text="'Благодарим за отклик!<br> Рекламодатель уже оповещен вашим <br>предложением о работе!'"
				/>
			</template>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'
import MessageModal from '@/components/MessageModal'
import responseService from '@/api/responseService'

export default {
	name: 'Project',
	components: {MessageModal, Preloader},
	data: () => ({
		showModal: false,
		showNotify: false,
		offerText: '',
		errorMsg: '',
		account_id: null,
	}),
	computed: {
		project() {
			return this.$store.getters.currentProject
		},
		userAccounts() {
			return this.$store.getters.userAccounts
		},
		loading() {
			return this.$store.getters.projectLoading
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
		sendResponse(text) {
			const response = {
				project_id: this.id,
				account_id: this.account_id,
				text,
			}
			responseService.sendResponse(response)
				.then(() => {
					this.showNotify = true
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
		this.$store.dispatch('loadProject', this.id)
			.catch(e => {
				if (e.response && e.response.status && e.response.status === 404) {
					let route = this.$router.match({name: '404'})
					this.$router.history.updateRoute(route)
				}
			})
	},
	beforeDestroy() {
		this.$store.commit('destroyCurrentProject')
	},
}
</script>

<style scoped>

</style>
