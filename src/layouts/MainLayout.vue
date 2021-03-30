<template>
	<div @click="onBodyClick">
		<header class="header header__lending normal-header" :class="{'header__lending_ov-hidden': main}">
			<div class="container">
				<div class="header__row normal-row">
					<button
						@click="displayMenu = !displayMenu"
						id="menu-burger"
						class="header__menu-mobile"
					>
						<span class="header__menu-burger"></span>
					</button>
					<div class="header__img" :class="{'header__img_main': main}">
						<router-link :to="{name: 'Main'}">
							<picture>
								<source srcset="../assets/img/Логотип.webp" type="image/webp">
								<img src="../assets/img/Логотип.png" alt="">
							</picture>
						</router-link>
					</div>
					<div class="header__menu" id="header__menu">
						<transition name="upper">
							<ul
								v-if="menuOpened"
								class="header__menu-ul"
							>
								<li class="header__menu-li ">
									<router-link
										:to="{name: 'Main'}"
										@click.native="displayMenu = false"
										class="header__menu-link add-li"
									>
										Главная
									</router-link>
									<ul class="header__menu-drop">
										<li class="header__menu-li">
											<router-link
												:to="{name: 'Main', hash: '#instruction__bloger'}"
												class="header__menu-link"
											>
												Блогеру
											</router-link>
										</li>
										<li class="header__menu-li">
											<router-link
												:to="{name: 'Main', hash: '#instruction'}"
												class="header__menu-link"
											>
												Рекламодателю
											</router-link>
										</li>
									</ul>
								</li>
								<li class="header__menu-li">
									<router-link
										@click.native="displayMenu = false"
										:to="{name: 'AccountsList'}"
										class="header__menu-link"
									>
										Блогеры
									</router-link>
								</li>
								<li class="header__menu-li">
									<router-link
										@click.native="displayMenu = false"
										:to="{name: 'ProjectsList'}"
										class="header__menu-link"
									>
										Рекламные предложения
									</router-link>
								</li>
							</ul>
						</transition>
					</div>
					<div class="header__sign">
						<div class="header__log-row" v-if="authCheck">
							<ul class="header__log-ul">
								<li class="header__menu-li-left">
									<router-link :to="{name: 'Profile'}" class="header__menu-left-link"
													 title="Перейти в личный кабинет">
										<img v-if="!userImageLoading && user && user.image" :src="user.image" alt="">
										<picture v-else>
											<source srcset="../assets/img/noneimg.webp" type="image/webp">
											<img src="../assets/img/noneimg.png" alt="">
										</picture>
									</router-link>
									<ul class="header__li-left-drop">
										<li class="header__li-nickname">
											<h2 class="header__nickname-text" v-if="user">
												<a>{{ user.name }}</a>
											</h2>
											<ul class="header__menu-drop width-all">
												<li class="header__drop-li">
													<router-link :to="{name: 'Profile'}" class="header__li-link">
														Личный кабинет
													</router-link>
												</li>
												<li class="header__drop-li">
													<span
														@click="logout"
														class="header__li-link cursor"
													>Выход</span>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="header__sign-row" v-else>
							<button
								@click="showLogin = true"
								class="header__menu-sign button-grand"
							>
								Вход
							</button>
							<button
								@click="showSign = true"
								class="header__menu-sign button-grand"
							>
								Регистрация
							</button>
						</div>
					</div>
				</div>
				<div class="header__row-info header__row-info-lending" v-if="main">
					<div class="header__text-info header__text-info-lending">
						<div class="header__text header__text-lending">
							<h2 class="header__text-title header__text-title-lending">Зарабатывай <br> в Тик-Ток с нами!</h2>
							<p class="header__text-subtitle header__text-subtitle-lending">
								Платформа для сотрудничества рекламодателя и блогера с целью продвижения бизнеса в интернете
							</p>
						</div>
						<div class="header__button-info header__button-info-lending">
							<router-link :to="{name: 'ProjectsList'}" class="header__button-info-lending-btn">
								<button class="button-grand big">
									Рекламные предложения
								</button>
							</router-link>
							<router-link :to="{name: 'AccountsList'}" class="header__button-info-lending-btn">
								<button class="button-grand-first big">
									Наши блогеры
								</button>
							</router-link>
						</div>
					</div>
					<div class="header__img-info">
					</div>
				</div>
			</div>
		</header>
		<template>
			<router-view
				@show-sign="showSign = true"
				@show-login="showLogin = true"
			></router-view>
		</template>
		<transition name="side-slide">
			<div class="profile__notifications" v-if="showNotice" @click="closeNotice">
				<div class="profile__notifications-row">
					<div class="profile__notifications-img">
						<picture>
							<source srcset="../assets/img/notific.webp" type="image/webp">
							<img src="../assets/img/notific.png" alt="">
						</picture>
					</div>
					<div class="profile__notifications-text">
						<p class="profile__notifications-text-p" v-html="noticeText"></p>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<sign
				v-if="showSign"
				@closed="showSign = false"
				@login="showSign = false; showLogin = true"
				@submit="register"
			/>
		</transition>
		<transition name="fade">
			<login
				v-if="showLogin"
				@closed="showLogin = false"
				@forget="showLogin = false; showForget = true"
				@submit="login"
			/>
		</transition>
		<transition name="fade">
			<forget
				v-if="showForget"
				@closed="showForget = false"
				@submit="forget"
			/>
		</transition>
		<transition name="fade">
			<change
				v-if="showChange"
				@closed="showChange = false"
				@submit="change"
			/>
		</transition>
		<preloader v-if="loading" class="auth-loader" height="100vh"/>
		<footer class="footer normal-footer">
			<div class="container">
				<div class="footer__row">
					<div class="footer__img">
						<picture>
							<source srcset="../assets/img/LogoFooter.webp" type="image/webp">
							<img src="../assets/img/LogoFooter.png" alt=""></picture>
					</div>
					<div class="footer__menu">
						<ul class="footer__menu-ul">
							<li class="footer__ul-li">
								<a href="/" class="footer__li-link">Главная</a>
							</li>
							<li class="footer__ul-li">
								<router-link :to="{name: 'AccountsList'}" class="footer__li-link">
									Блогеры
								</router-link>
							</li>
							<li class="footer__ul-li">
								<router-link :to="{name: 'ProjectsList'}" class="footer__li-link">
									Рекламные предложения
								</router-link>
							</li>
							<li class="footer__ul-li">
								<a href="/#instruction__bloger" class="footer__li-link">Информация Блогеру</a>
							</li>
							<li class="footer__ul-li">
								<a href="/#instruction" class="footer__li-link">Рекламодателю</a>
							</li>
						</ul>
					</div>
					<div class="footer__rights">
						<div class="footer__rights-contract">
							<a target="_blank" rel="noopener" href="/agreement.pdf" class="footer__li-link">
								Договор на обработку персональных данных
							</a>
						</div>
						<div class="footer__rights-right">
							<a class="footer__li-link">Орбита 2021 / ©Все права защищены.</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue'
import tokenService from '@/auth/tokenService'
import Sign from '@/components/auth/Sign'
import authService from '@/api/authService'
import Preloader from '@/components/Preloader'
import Login from '@/components/auth/Login'
import Forget from '@/components/auth/Forget'
import Change from '@/components/auth/Change'

export default {
	name: 'MainLayout',
	components: {Change, Forget, Login, Preloader, Sign},
	data: () => ({
		showNotice: false,
		noticeText: null,
		showLogin: false,
		showSign: false,
		showForget: false,
		showChange: false,
		loading: false,
		displayMenu: false,
	}),
	watch: {
		showNotice(val) {
			if (val === true) {
				setTimeout(this.closeNotice, 2500)
			}
		},
		'$route'(val) {
			if (val['name'] === 'ChangePassword') {
				this.showChange = true
			} else if (val.query['showLogin']) {
				this.showLogin = true
				this.clearQueryParam('showLogin')
			} else if (val.query['showRegister']) {
				this.showSign = true
				this.clearQueryParam('showRegister')
			} else if (val.query['signed']) {
				if (this.user) {
					this.onSigned()
				} else {
					this.$onUserLoad.hook(this.onSigned)
				}
				this.clearQueryParam('signed')
			} else if (val.query['logged_in']) {
				if (this.user) {
					this.onLoggedIn()
				} else {
					this.$onUserLoad.hook(this.onLoggedIn)
				}
				this.clearQueryParam('logged_in')
			} else if (val.query['image_loaded']) {
				setTimeout(() => {
					this.$notify('Новая картинка успешно загружена!')
					this.clearQueryParam('image_loaded')
				}, 700)
			}
		},
	},
	computed: {
		authCheck() {
			return this.$store.getters.authCheck
		},
		menuOpened() {
			return document.body.clientWidth >= 1366 || this.displayMenu
		},
		user() {
			return this.$store.getters.user
		},
		userImageLoading() {
			return this.$store.getters.userImageLoading
		},
		expires() {
			return this.$route.query['expires']
		},
		signature() {
			return this.$route.query['signature']
		},
		email() {
			return this.$route.query['email']
		},
		token() {
			return this.$route.query['token']
		},
		showLoginParam() {
			return this.$route.query['showLogin']
		},
		showRegisterParam() {
			return this.$route.query['showRegister']
		},
		main() {
			return this.$route.name === 'Main'
		},
	},
	methods: {
		clearQueryParam(key) {
			if (this.$route.query[key] !== undefined) {
				let query = Object.assign({}, this.$route.query)
				delete query[key]
				this.$router.replace({query})
			}
		},
		closeNotice() {
			this.showNotice = false
			this.noticeText = null
		},
		onBodyClick(ev) {
			if (this.displayMenu && !ev.target.closest('#header__menu') && !ev.target.closest('#menu-burger')) {
				this.displayMenu = false
			}
		},
		logout() {
			if (confirm('Вы точно хотите выйти из учетной записи?')) {
				tokenService.clearToken()
				if (this.$route.name !== 'Main') {
					this.$router.push({
						name: 'Main',
					})
				}
				setTimeout(() => {
					this.$router.go(0)
				}, 25)
			}
		},
		onSigned() {
			this.$router.push({
				name: 'Profile',
			})
			this.$notify('Вы успешно зарегистрированы! Пожалуйста подтвердите свою почту!')
		},
		onLoggedIn() {
			if (this.$route.name === 'Main') {
				this.$router.push({
					name: 'Profile',
				})
			}
		},
		change(data) {
			this.loading = true
			authService.change({
				'email': this.email,
				'expires': this.expires,
				'signature': this.signature,
				'token': this.token,
			}, data)
				.then(() => {
					this.showChange = false
					this.$notify('Пароль успешно изменен! Зайдите в аккаунт заново.')
					this.$router.push({
						name: 'AccountsList',
					})
				})
				.catch(() => {
					alert('Что-то пошло не так! :( Возможно срок действия ссылки истёк либо она была повреждена.')
				})
				.finally(() => {
					this.loading = false
				})
		},
		forget(data) {
			this.loading = true
			authService.forget(data)
				.then(() => {
					this.showForget = false
					this.$notify('Ссылка для сброса пароля отправлена вам на почту!')
				})
				.catch(e => {
					let display = true
					if (
						e.response && e.response.data && e.response.data.errors && e.response.data.errors.email
						&& Array.isArray(e.response.data.errors.email)
					) {
						const email_error = e.response.data.errors.email[0]
						if (email_error === 'We can\'t find a user with that email address.') {
							alert('Пользователь с такой почтой не зарегистрирован.')
							display = false
						} else if (email_error === 'Please wait before retrying.') {
							alert('Вы запрашиваете ссылку на сброс пароля слишком часто. Подождите перед повторной отправкой.')
							display = false
							this.showForget = false
						}
					}
					if (display) {
						alert('Произошла ошибка отправки формы. Повторите позже.')
						this.showForget = false
					}
				})
				.finally(() => {
					this.loading = false
				})
		},
		login(userData) {
			this.loading = true
			authService.login(userData)
				.then(response => {
					if (response.data.token) {
						const token = String(response.data.token).trim()
						tokenService.setToken(token)
						this.$router.replace({
							name: this.$route.name,
							query: {
								...this.$route.query,
								'logged_in': 'true',
							},
						})
						this.$router.go(0)
					} else {
						throw new Error
					}
				})
				.catch(e => {
					let display = true
					if (
						e.response && e.response.data && e.response.data.errors && e.response.data.errors.email
						&& Array.isArray(e.response.data.errors.email)
					) {
						const email_error = e.response.data.errors.email[0]
						if (email_error === 'These credentials do not match our records.') {
							alert('Данные введены неверно.')
							display = false
						}
					}
					if (display) {
						alert('Произошла ошибка отправки формы. Повторите позже.')
						this.showLogin = false
					}
				})
				.finally(() => {
					this.loading = false
				})
		},
		register(userData) {
			this.loading = true
			authService.register(userData)
				.then(response => {
					if (!response.data.token) {
						throw new Error
					}
					const token = String(response.data.token).trim()
					tokenService.setToken(token)
					this.$router.replace({
						name: this.$route.name,
						query: {
							...this.$route.query,
							'signed': 'true',
						},
					})
					this.$router.go(0)
				})
				.catch(e => {
					let display = true
					if (
						e.response && e.response.data && e.response.data.errors && e.response.data.errors.email
						&& Array.isArray(e.response.data.errors.email)
					) {
						const email_error = e.response.data.errors.email[0]
						if (email_error === 'The email has already been taken.') {
							alert('Пользователь с таким email уже существует.')
							display = false
						}
					}
					if (display) {
						alert('Произошла ошибка отправки формы. Повторите позже.')
						this.showSign = false
					}
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
	mounted() {
		if (this.$route.name === 'ChangePassword') {
			this.showChange = true
		} else if (this.showLoginParam) {
			this.showLogin = true
		} else if (this.showRegisterParam) {
			this.showSign = true
		}
		Vue.prototype.$notify = (text) => {
			this.noticeText = text
			this.showNotice = true
		}
	},
}
</script>
