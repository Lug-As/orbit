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
								<h2 class="offer__body-item-title-text">Желаемая аудитория:</h2>
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
								<h2 class="offer__body-item-title-text">Регион:</h2>
								<p class="offer__body-item-text">
									{{ project.region }}, {{ project.country }}.
								</p>
							</div>
						</div>
						<div class="offer__body-item" v-if="project.ad_types && project.ad_types.length">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">Тип рекламы:</h2>
								<p class="offer__body-item-text">
									{{ project.ad_types | slashedList }}
								</p>
							</div>
						</div>
					</div>
					<div class="offer__body-price">
						<div class="offer__body-price-row">
							<div class="offer__body-price-title">
								<h2 class="offer__body-price-title-text">Бюджет:</h2>
								<span class="offer__body-price-title-span">
									{{ project.budget.toLocaleString() }}₽
								</span>
							</div>
							<preloader v-if="responsesLoading" height="90" style="margin-left: 60px; margin-right: 60px;"/>
							<template v-else-if="notMyProject">
								<div class="offer__body-price-button">
									<button
										class="button-grand-black big button__open-massage"
										:disabled="userAccounts === null || (responses.length === userAccounts.length) || responsesLoading"
										@click="callModal"
									>
										Предложить выполнение работы
									</button>
								</div>
								<div
									v-if="userAccounts === null"
									class="offer__body-price-confirmation bloger__button-confirmation"
								>
									<picture>
										<source srcset="../assets/img/Иллюстрация.webp" type="image/webp">
										<img src="../assets/img/Иллюстрация.png" alt="">
									</picture>
									<p class="bloger__button-text">
										Чтобы оставлять отклики,
										<template v-if="!user">
											войди или зарегистрируйся.
										</template>
										<template v-else-if="!verifyed">
											подтверди свой почтовый ящик.
										</template>
										<template v-else-if="userAccounts === null">
											необходимо завести Тик-Ток аккаунт.
										</template>
									</p>
								</div>
							</template>
						</div>
						<p v-if="responses.length" v-html="responseString"></p>
					</div>
				</div>
				<message-modal
					:open="showModal"
					@close-modal="showModal = false"
					@submit="sendResponse"
				>
					<p
						v-if="userAccounts !== null && responses.length !== userAccounts.length"
						class="response_one_account_text"
					>
						Вы делаете отклик на проект с Тик-Ток аккаунта
						<strong v-if="noResponseUserAccounts.length === 1">
							{{ noResponseUserAccounts[0].title }}
						</strong>
						<v-select
							v-else
							label="title"
							v-model="account_id"
							:options="noResponseUserAccounts"
							:reduce="opt => opt.id"
							:style="{
								display: 'inline-block',
								minWidth: '190px'
							}"
						>
							<template #search="{attributes, events}">
								<input
									class="vs__search"
									:required="account_id === null"
									v-bind="attributes"
									v-on="events"
								/>
							</template>
						</v-select>
					</p>
				</message-modal>
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
		account_id: null,
		responses: [],
		responsesLoading: true,
	}),
	computed: {
		project() {
			return this.$store.getters.currentProject
		},
		userAccounts() {
			const userAccounts = this.$store.getters.userAccounts
			if (userAccounts && userAccounts.length) {
				this.loadResponses(userAccounts)
				if (userAccounts.length === 1) {
					this.account_id = userAccounts[0].id
				}
				return userAccounts
			}
			return null
		},
		notMyProject() {
			return !this.user || this.project.user_id !== this.user.id
		},
		noResponseUserAccounts() {
			if (this.userAccounts) {
				const result = this.userAccounts.filter(ac => {
					return !this.responses.includes(ac.id)
				})
				if (result && result.length === 1) {
					this.account_id = result[0].id
				}
				return result
			}
			return []
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
		responseString() {
			if (this.responses && this.responses.length) {
				let str = 'Вы уже откликнулись на проект с '
				if (this.responses.length === 1) {
					str += 'аккаунта <strong>' + this.userAccounts.find(a => a.id === this.responses[0]).title + '</strong>'
				} else {
					str += 'аккаунтов: '
					const parts = this.responses.map(response => {
						return '<strong>' + this.userAccounts.find(a => a.id === response).title + '</strong>'
					})
					str += parts.join(', ')
				}
				return str
			}
			return null
		},
	},
	methods: {
		sendResponse(text) {
			const response = {
				project_id: this.id,
				account_id: this.account_id,
				text,
			}
			this.account_id = null
			responseService.sendResponse(response)
				.then(() => {
					this.responses.push(response.account_id)
					this.$notify('Благодарим за отклик! Рекламодатель уже оповещен вашим предложением о работе!')
				})
				.catch(() => {
					alert('Произошла ошибка отправки формы. Повторите позже.')
				})
		},
		callModal() {
			this.showModal = true
		},
		loadResponses(userAccounts) {
			this.responsesLoading = true
			let idx = 0
			userAccounts.forEach(account => {
				responseService.getProjectAccountResponse(this.id, account.id)
					.then(response => {
						if (typeof response.data.data === 'object' && Object.keys(response.data.data).length > 0) {
							this.responses.push(account.id)
						}
					})
					.finally(() => {
						idx++
						if (idx === userAccounts.length) {
							this.responsesLoading = false
						}
					})
			})
		},
	},
	mounted() {
		if (!this.userAccounts) {
			if (this.user) {
				if (this.user.verifyed) {
					this.$store.dispatch('loadUserAccounts')
				}
			} else {
				this.$onUserLoad.hook(() => {
					if (this.user.verifyed) {
						this.$store.dispatch('loadUserAccounts')
					}
				})
			}
		}
		this.$store.dispatch('loadProject', this.id)
			.then(project => {
				this.$setPageTitle(project.name.substring(0, 50))
			})
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
.response_one_account_text {
	color: #061a62;
}
</style>
