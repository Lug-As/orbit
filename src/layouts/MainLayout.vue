<template>
	<div>
		<header class="header header__blogers normal-header">
			<div class="container">
				<div class="header__row normal-row">
					<div class="header__menu-mobile">
						<span class="header__menu-burger"></span>
					</div>
					<div class="header__img">
						<a href="/">
							<picture>
								<source srcset="../assets/img/Логотип.webp" type="image/webp">
								<img src="../assets/img/Логотип.png" alt="">
							</picture>
						</a>
					</div>

					<div class="header__menu">
						<ul class="header__menu-ul">
							<li class="header__menu-li ">
								<a href="" class="header__menu-link add-li">Главная</a>
								<ul class="header__menu-drop">
									<li class="header__menu-li ">
										<a href="" class="header__menu-link">Блогеру</a>
									</li>
									<li class="header__menu-li">
										<a href="" class="header__menu-link">Рекламодателю</a>
									</li>
								</ul>
							</li>
							<li class="header__menu-li">
								<router-link :to="{name: 'AccountsList'}" class="header__menu-link">Блогеры</router-link>
							</li>
							<li class="header__menu-li">
								<router-link :to="{name: 'ProjectsList'}" class="header__menu-link">Рекламные предложения
								</router-link>
							</li>
						</ul>
					</div>
					<div class="header__sign">
						<div class="header__log-row" v-if="authCheck">
							<ul class="header__log-ul">
								<li class="header__menu-li-left">
									<router-link :to="{name: 'Profile'}" class="header__menu-left-link"
													 title="Перейти в личный кабинет">
										<picture>
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
			</div>
		</header>
		<template>
			<router-view></router-view>
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
				@submit="login"
			/>
		</transition>
		<transition name="fade">
			<section class="forget" v-if="false">
				<div class="container">
					<div class="login__row">
						<div class="login__row-title">
							<h2 class="login__row-title-h2">
								Забыли пароль?
							</h2>
							<p class="login__row-title-p">
								Вскоре к вам на почту прийдёт ссылка по которой будет необходимо перейти и создать новый пароль!
							</p>
						</div>
						<form action="post" class="login__row-form">
							<div class="login__row-form-body">
								<div class="login__row-form-item">
									<div class="login__row-form-item-label">
										<label for="forgetmail">
											Почта
										</label>
									</div>
									<div class="login__row-form-item-input">
										<input type="text" id="forgetmail" required>
									</div>
								</div>
								<div class="login__row-img"></div>
							</div>
							<div class="login__row-form-button">
								<div class="login__row-form-button-reg">
									<button class="login__row-form-button-log button-grand-transparent big">ОТПРАВИТЬ</button>
								</div>

							</div>
						</form>
					</div>
				</div>
			</section>
		</transition>
		<transition name="fade">
			<section class="change" v-if="false">
				<div class="container">
					<div class="login__row">
						<div class="login__row-title">
							<h2 class="login__row-title-h2">
								Впишите новый пароль дважды
							</h2>
						</div>
						<form action="post" class="login__row-form">
							<div class="login__row-form-body">
								<div class="login__row-form-item">
									<div class="login__row-form-item-label">
										<label for="changepass">
											Впишите пароль
										</label>
									</div>
									<div class="login__row-form-item-input">
										<input type="text" id="changepass" required>
									</div>
								</div>
								<div class="login__row-form-item">
									<div class="login__row-form-item-label">
										<label for="secondchangepass">
											Впишите пароль повторно
										</label>
									</div>
									<div class="login__row-form-item-input">
										<input type="password" id="secondchangepass" required>
									</div>
								</div>
								<div class="login__row-img"></div>
							</div>
							<div class="login__row-form-button">
								<div class="login__row-form-button-reg">
									<button class="login__row-form-button-log button-grand-transparent big">СОЗДАТЬ</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
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
								<a href="" class="footer__li-link">Главная</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Блогеры</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Рекламные предложения</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Информация Блогеру</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Рекламодателю</a>
							</li>
						</ul>
					</div>
					<div class="footer__rights">
						<div class="footer__rights-contract">
							<a href="" class="footer__li-link">Договор на обработку персональных данных</a>
						</div>
						<div class="footer__rights-right">
							<a href="" class="footer__li-link">Орбита 2021 /©Все права защищены!</a>
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

export default {
	name: 'MainLayout',
	components: {Login, Preloader, Sign},
	data: () => ({
		showNotice: false,
		noticeText: null,
		showLogin: false,
		showSign: false,
		loading: false,
	}),
	watch: {
		showNotice(val) {
			if (val === true) {
				setTimeout(this.closeNotice, 2500)
			}
		},
	},
	computed: {
		authCheck() {
			return this.$store.getters.authCheck
		},
		user() {
			return this.$store.getters.user
		},
	},
	methods: {
		closeNotice() {
			this.showNotice = false
			this.noticeText = null
		},
		logout() {
			if (confirm('Вы точно хотите выйти из учетной записи?')) {
				tokenService.clearToken()
				location.reload()
			}
		},
		login(userData) {
			this.loading = true
			authService.login(userData)
				.then(response => {
					if (response.data.token) {
						const token = String(response.data.token).trim()
						tokenService.setToken(token)
						location.reload()
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
						this.showSign = false
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
					if (response.data.token) {
						const token = String(response.data.token).trim()
						tokenService.setToken(token)
						location.reload()
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
		Vue.prototype.$notify = (text) => {
			this.noticeText = text
			this.showNotice = true
		}
	},
}
</script>
