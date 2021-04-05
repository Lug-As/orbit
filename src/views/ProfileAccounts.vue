<template>
	<div class="profile__questionnaire profile__contant tab-3">
		<div v-if="user && user.verifyed" class="profile__questionnaire-row">
			<div class="profile__questionnaire-create">
				<button
					@click="toggleCreateMode"
					class="profile__questionnaire-create-button button-grand-black"
				>
					<span
						class="big_char"
						:class="{ 'big_char-cross': createMode }"
					>+</span>
					<template v-if="createMode">
						Закрыть форму
					</template>
					<template v-else>
						Создать анкету
					</template>
				</button>
			</div>
			<transition name="slide-up-down">
				<account-form
					@submit="createAccount"
					v-if="createMode"
				/>
			</transition>
			<preloader v-if="requestsLoading"/>
			<div class="profile__questionnaire-accounts" v-else-if="requests && requests.length">
				<div class="profile__questionnaire-accounts-row">
					<div class="profile__questionnaire-accounts-row-title">
						<h2 class="profile__questionnaire-accounts-row-title-h2">
							Заявки на создание аккаунтов
						</h2>
					</div>
					<div class="profile-accounts-list">
						<div
							v-for="(request, idx) in requests"
							:key="idx"
							class="profile__questionnaire-accounts-body"
						>
							<template v-if="request.is_approved">
								<h2>Поздравляем!</h2>
								<p>Ваш аккаунт <strong>{{ request.name }}</strong> успешно подтвержден и помещен на сайт.</p>
								<button
									@click="deleteRequest(request.id, true)"
									class="profile__questionnaire-accounts-button button-grand-black"
								>
									Спасибо
								</button>
							</template>
							<template v-else>
								<div class="profile__questionnaire-accounts-item">
									<div class="profile__questionnaire-accounts-item-number" v-if="requests.length > 1">
										<span class="profile__questionnaire-accounts-item-number-span">{{ idx + 1 }}</span>
									</div>
									<div class="profile__questionnaire-accounts-item-avatar">
										<div class="profile__questionnaire-accounts-item-avatar-img">
											<img :src="request.image" :alt="request.title">
										</div>
										<button
											@click="deleteRequest(request.id)"
											class="profile__questionnaire-accounts-item-avatar-delete"
										>
											Удалить заявку
										</button>
									</div>
									<div class="profile__questionnaire-accounts-body-info">
										<div class="profile__questionnaire-accounts-item-info title">
											<h2
												class="profile__questionnaire-accounts-item-info-title-h2"
											>
												{{ request.name }}
											</h2>
											<a
												:href="request.reference"
												target="_blank"
												rel="noopener"
												class="profile__questionnaire-accounts-item-info-title-link"
											>
												Перейти в Тик-Ток аккаунт
											</a>
										</div>
										<div class="profile__questionnaire-accounts-item-info theme">
											<div class="profile__questionnaire-accounts-item-info-h2">
												Тема канала:
											</div>
											<div class="profile__questionnaire-accounts-item-info-p">
												{{ request.topics | slashedList }}
											</div>
										</div>
										<div class="profile__questionnaire-accounts-item-info advertising">
											<h2 class="profile__questionnaire-accounts-item-info-h2">Вид / Цена рекламы:</h2>
											<ul class="profile__questionnaire-accounts-item-info-ul">
												<li
													v-for="type in request.ad_types"
													:key="type.id"
													class="profile__questionnaire-accounts-item-info-li"
												>
													{{ type.name }} - {{ type.price ? `${type.price} ₽` : 'Договорная' }}
												</li>
											</ul>
										</div>
										<div class="profile__questionnaire-accounts-item-info confirmation">
											<template v-if="!request.checked">
												<img src="../assets/img/clock.png" alt="">
												<p class="profile__questionnaire-accounts-item-info-p">
													Чтобы подтвердить, что Вы - владелец аккаунта, Вам необходимо написать в direct
													нашего аккаунта в TikTok
													(<a href="https://www.tiktok.com/@orbitaa.ru" target="_blank" rel="noopener">@orbitaa.ru</a>):
													«Привет, хочу сотрудничать с Орбитой».
												</p>
											</template>
											<template v-else-if="request.is_canceled">
												<picture>
													<source srcset="../assets/img/notcomfirt.webp" type="image/webp">
													<img src="../assets/img/notcomfirt.png" alt=""></picture>
												<p class="profile__questionnaire-accounts-item-info-p accounts-item-info-p-red">
													Ваша заявка отклонена.
													<template v-if="request.fail_msg">
														Причина: <br>
														<span>{{ request.fail_msg }}</span>
													</template>
												</p>
											</template>
										</div>
									</div>
								</div>
								<div class="profile__questionnaire-accounts-buttons">
									<a
										:href="request.reference"
										target="_blank"
										rel="noopener"
										class="profile__questionnaire-accounts-button button-grand-black"
									>
										Перейти в Тик-Ток аккаунт
									</a>
									<button
										@click="deleteRequest(request.id)"
										class="profile__questionnaire-accounts-button button-grand-transparent"
									>
										Удалить заявку
									</button>
								</div>
							</template>
						</div>
					</div>
					<div class="objects-pagination">
						<pagination
							:data="requestsPagination"
							:limit="2"
							@pagination-change-page="changePage"
						/>
					</div>
				</div>
			</div>
			<div class="profile__questionnaire-accounts" v-if="userAccounts && userAccounts.length">
				<div class="profile__questionnaire-accounts-row">
					<div class="profile__questionnaire-accounts-row-title">
						<h2 class="profile__questionnaire-accounts-row-title-h2">
							Ваши аккаунты
						</h2>
					</div>
					<div class="profile-accounts-list">
						<div
							v-for="(account, idx) in userAccounts"
							:key="idx"
							class="profile__questionnaire-accounts-body"
						>
							<div class="profile__questionnaire-accounts-item">
								<div class="profile__questionnaire-accounts-item-number" v-if="userAccounts.length > 1">
									<span class="profile__questionnaire-accounts-item-number-span">{{ idx + 1 }}</span>
								</div>
								<div class="profile__questionnaire-accounts-item-avatar">
									<div class="profile__questionnaire-accounts-item-avatar-img">
										<router-link
											:to="{name: 'Account', params: {id: account.id}}"
										>
											<img :src="account.image" :alt="account.title">
										</router-link>
									</div>
									<button
										class="profile__questionnaire-accounts-item-avatar-delete"
										@click="deleteAccount(account.id)"
									>
										Удалить аккаунт
									</button>
								</div>
								<div class="profile__questionnaire-accounts-body-info">
									<div class="profile__questionnaire-accounts-item-info title">
										<router-link
											:to="{name: 'Account', params: {id: account.id}}"
											custom
											v-slot="{navigate}"
										>
											<h2
												@click="navigate"
												class="profile__questionnaire-accounts-item-info-title-h2 cursor"
											>
												{{ account.title }}
											</h2>
										</router-link>
										<a
											:href="account.reference"
											target="_blank"
											rel="noopener"
											class="profile__questionnaire-accounts-item-info-title-link"
										>
											Перейти в Тик-Ток аккаунт
										</a>
									</div>
									<div class="profile__questionnaire-accounts-item-info subscribe">
										<p class="profile__questionnaire-accounts-item-info-p">
											{{ account.followers | round }} подписчиков / {{ account.likes | round }} лайков.
										</p>
									</div>
									<div class="profile__questionnaire-accounts-item-info theme">
										<div class="profile__questionnaire-accounts-item-info-h2">
											Тема канала:
										</div>
										<div class="profile__questionnaire-accounts-item-info-p">
											{{ account.topics | slashedList }}
										</div>
									</div>
									<div class="profile__questionnaire-accounts-item-info advertising">
										<h2 class="profile__questionnaire-accounts-item-info-h2">Вид / Цена рекламы:</h2>
										<ul class="profile__questionnaire-accounts-item-info-ul">
											<li
												v-for="type in account.ad_types"
												:key="type.id"
												class="profile__questionnaire-accounts-item-info-li"
											>
												{{ type.name }} - {{ type.price ? `${type.price} ₽` : 'Договорная' }}
											</li>
										</ul>
									</div>
									<div class="profile__questionnaire-accounts-item-info confirmation">
										<picture>
											<source srcset="../assets/img/comfirt.webp" type="image/webp">
											<img src="../assets/img/comfirt.png" alt="">
										</picture>
										<p class="profile__questionnaire-accounts-item-info-p">Ваш аккаунт успешно
											подтвержден!</p>
									</div>
								</div>
							</div>
							<div class="profile__questionnaire-accounts-buttons">
								<a
									:href="account.reference"
									target="_blank"
									rel="noopener"
									class="profile__questionnaire-accounts-button button-grand-black"
								>
									Перейти в Тик-Ток аккаунт
								</a>
								<button
									class="profile__questionnaire-accounts-button button-grand-transparent"
									@click="deleteAccount(account.id)"
								>
									Удалить аккаунт
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<template v-else>
				<p class="empty-result-text">У вас пока нет подтвержденных аккаунтов</p>
			</template>
		</div>
	</div>
</template>

<script>
import Preloader from '@/components/Preloader'
import AccountForm from '@/components/profile/AccountForm'

export default {
	name: 'ProfileAccounts',
	title: 'Мои аккаунты',
	components: {AccountForm, Preloader},
	data: () => ({
		createMode: false,
	}),
	computed: {
		userAccounts() {
			return this.$store.getters.userAccounts
		},
		requests() {
			return this.$store.getters.requests
		},
		requestsLoading() {
			return this.$store.getters.requestsLoading
		},
		requestsPagination() {
			return this.$store.getters.requestsPagination
		},
		user() {
			return this.$store.getters.user
		},
		userLoading() {
			return this.$store.getters.userLoading
		},
	},
	methods: {
		toggleCreateMode() {
			this.createMode = !this.createMode
		},
		deleteAccount(id) {
			if (confirm('Вы точно хотите удалить аккаунт? Восстановить его будет невозможно.')) {
				this.$store.dispatch('removeAccount', {id})
			}
		},
		deleteRequest(id, force = false) {
			if (force || confirm('Вы точно хотите удалить заявку? Восстановить её будет невозможно.')) {
				this.$store.dispatch('removeRequest', {id})
			}
		},
		scrollToTop(top = 0) {
			window.scrollTo({
				top,
				behavior: 'smooth',
			})
		},
		changePage(page = 1) {
			if (page !== this.page) {
				this.scrollToTop(390)
				this.$router.push({
					name: this.$route.name,
					query: {
						page,
					},
				})
					.then(() => this.loadRequests())
				return true
			}
			return false
		},
		loadRequests() {
			this.$store.dispatch('loadRequests', {
				page: this.page,
			})
		},
		createAccount(ev) {
			this.$store.dispatch('createRequest', ev)
				.then(() => {
					this.toggleCreateMode()
					this.loadRequests()
					this.$notify('Благодарим за создание! Подтвердите аккаунт, чтобы он появился на сайте!')
				})
				.catch(e => {
					let displayError = true
					if (
						e.response && e.response.data && e.response.data['errors'] && e.response.data['errors']['user_error_code']
						&& Array.isArray(e.response.data['errors']['user_error_code'])
					) {
						const user_error_code = e.response.data['errors']['user_error_code'][0]
						if (user_error_code === 1) {
							alert('На сайте уже зарегистрирован подтвержденный Тик-Ток аккаунт с таким названием')
							displayError = false
						} else if (user_error_code === 2) {
							alert('Вы уже подали заявку на создание аккаунта с таким названием')
							displayError = false
						}
					}
					if (displayError) {
						alert('Произошла ошибка отправки формы. Повторите позже.')
					}
				})
		},
		starterFunction() {
			if (this.user.verifyed) {
				if (!this.requests.length || this.page !== this.requestsPagination.current_page) {
					this.loadRequests()
				}
				if (!this.userAccounts) {
					this.$store.dispatch('loadUserAccounts')
				}
			}
		},
	},
	mounted() {
		if (this.user) {
			this.starterFunction()
		} else {
			this.$onUserLoad.hook(() => this.starterFunction)
		}
	},
}
</script>
