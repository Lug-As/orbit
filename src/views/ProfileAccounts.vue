<template>
	<div class="profile__questionnaire profile__contant tab-3">
		<div class=" profile__questionnaire-row">
			<div class="profile__questionnaire-create">
				<button
					@click="toggleCreateMode"
					class="profile__questionnaire-create-button button-grand-black"
				>
					<picture>
						<source srcset="../assets/img/plus-create.webp" type="image/webp">
						<img src="../assets/img/plus-create.png" alt="">
					</picture>
					Создать анкету
				</button>
			</div>
			<transition name="slide-up-down">
				<div class="profile__questionnaire-body" v-if="createMode">
					<div class="profile__questionnaire-body-row">
						<div class="profile__questionnaire-avatar">
							<div class="profile__questionnaire-img">
								<picture>
									<source srcset="../assets/img/noneimg.webp" type="image/webp">
									<img src="../assets/img/noneimg.png" alt=""></picture>
							</div>
							<div class="profile__questionnaire-load">
								<label class="profile__questionnaire-load-button">
									<input type="file" style="display:none">
									Загрузить фото
								</label>
							</div>
						</div>
						<div class="profile__questionnaire-item">
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									Впишите название аккаунта
								</h2>
								<input type="text" class="profile__questionnaire-item-info-input">
							</div>
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									Тематика блога
								</h2>
								<div class="profile__questionnaire-item-info-select">
									<p class="profile__questionnaire-item-info-option select">Тематика блога</p>
								</div>
								<div class="profile__questionnaire-item-info-list">
									<p class="profile__questionnaire-item-info-option">Тематика блога</p>
									<p class="profile__questionnaire-item-info-option">Тематика блога</p>
									<p class="profile__questionnaire-item-info-option">Тематика блога</p>
									<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								</div>
							</div>
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									Виды рекламы
								</h2>
								<div class="profile__questionnaire-item-info-select">
									<p class="profile__questionnaire-item-info-option select">Реклама услуги/товары</p>
								</div>
								<div class="profile__questionnaire-item-info-list">
									<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
									<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
									<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
									<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
								</div>
							</div>
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									Цена на виды рекламы
								</h2>
								<input type="text" value="15 000 / Рекламный пост"
										 class="profile__questionnaire-item-info-input">
							</div>
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									О себе
								</h2>
								<textarea
									class="profile__questionnaire-item-info-textarea">15 000 / Рекламный пост</textarea>
							</div>
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									Возрастные категории аудитории
								</h2>
								<input type="text" value="16 - 50 / 18 - 40 / 99 - 100"
										 class="profile__questionnaire-item-info-input">
							</div>
							<div class="profile__questionnaire-item-info">
								<h2 class="profile__questionnaire-item-info-h2">
									Субъект РФ
								</h2>
								<input type="text" value="Алтайский край, Россия"
										 class="profile__questionnaire-item-info-input">
							</div>
							<div class="profile__questionnaire-item-button-create">
								<button class="profile__questionnaire-item-button button-grand-black">Отправить
									анкету
								</button>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<div class="profile__questionnaire-accounts" v-if="requests && requests.length">
				<div class=" profile__questionnaire-accounts-row">
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
								<h2>Поздравляю</h2>
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
											<a :href="request.reference"
												class="profile__questionnaire-accounts-item-info-title-link">
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
													Для того, чтобы подтвердить аккаунт, вам необходимо написать в директ Тик-Ток
													аккаунта (<a href="https://www.tiktok.com/@danya_milokhin"
																	 target="_blank">@orbita</a>)
													такой текст: "Привет, подтверди меня на сайте orbitaa.ru"
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
									<button class="profile__questionnaire-accounts-button button-grand-black">Перейти в
										тик-ток аккаунт
									</button>
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
										<a :href="account.reference"
											class="profile__questionnaire-accounts-item-info-title-link">
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
								<button class="profile__questionnaire-accounts-button button-grand-black">Перейти в
									тик-ток аккаунт
								</button>
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
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileAccounts',
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
	},
	mounted() {
		this.$onUserLoad.func = () => {
			this.$store.dispatch('loadRequests')
		}
	},
}
</script>
