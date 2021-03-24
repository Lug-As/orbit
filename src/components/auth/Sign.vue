<template>
	<section class="sign" @click.self="$emit('closed')">
		<div class="container" @click.self="$emit('closed')">
			<div class="login__row">
				<span
					@click="$emit('closed')"
					class="form-close-cross"
				>&times;</span>
				<div class="login__row-title">
					<h2 class="login__row-title-h2">
						Данные для регистрации пригодятся, когда вам будет
						необходимо связаться с реламодателем или рекламщиком
					</h2>
				</div>
				<form class="login__row-form">
					<div class="login__row-form-body">
						<div class="login__row-form-item">
							<div class="login__row-form-item-label">
								<label for="nickname">
									Имя
								</label>
							</div>
							<div class="login__row-form-item-input">
								<input
									v-model.trim="name"
									@blur="$v.name.$touch"
									type="text"
									id="nickname"
									required
								>
							</div>
							<div class="errors-box" v-if="$v.name.$error">
								<p class="red">
									<template v-if="!$v.name.required">Это поле обязательно для заполнения</template>
								</p>
							</div>
						</div>
						<div class="login__row-form-item">
							<div class="login__row-form-item-label">
								<label for="tel">
									Номер телефона
								</label>
							</div>
							<div class="login__row-form-item-input">
								<input
									v-model.trim="phone"
									v-mask="{mask: '8 (999) 999-99-99'}"
									@blur="$v.phone.$touch"
									type="tel"
									id="tel"
									required
								>
							</div>
							<div class="errors-box" v-if="$v.phone.$error">
								<p class="red">
									<template v-if="!$v.phone.required">Это поле обязательно для заполнения</template>
									<template v-if="!$v.phone.maxLength || !$v.phone.minLength">
										Заполните телефон до конца
									</template>
								</p>
							</div>
						</div>
						<div class="login__row-form-item">
							<div class="login__row-form-item-label">
								<label for="regmail">
									Почта
								</label>
							</div>
							<div class="login__row-form-item-input">
								<input
									v-model.trim="email"
									@blur="$v.email.$touch"
									type="text"
									id="regmail"
									required
								>
							</div>
							<div class="errors-box" v-if="$v.email.$error">
								<p class="red">
									<template v-if="!$v.email.required">Это поле обязательно для заполнения</template>
									<template v-if="!$v.email.email">
										Поле должно быть в формате email
									</template>
									<template v-if="!$v.email.maxLength">
										Email должен быть не больше {{ $v.email.$params.maxLength.max }} символов
									</template>
								</p>
							</div>
						</div>
						<div class="login__row-form-item">
							<div class="login__row-form-item-label">
								<label for="psswrd">
									Пароль
								</label>
							</div>
							<div class="login__row-form-item-input">
								<input
									v-model="password"
									@blur="$v.password.$touch"
									:type="showPass ? 'text' : 'password'"
									id="psswrd"
									required
								>
								<img
									@click="showPass = false"
									v-if="showPass"
									class="cursor pass-visible-img"
									src="../../assets/img/pass-hide.png"
									title="Скрыть пароль"
									alt=""
								>
								<img
									@click="showPass = true"
									v-else
									class="cursor pass-visible-img"
									src="../../assets/img/pass-eye.png"
									title="Показать пароль"
									alt=""
								>
							</div>
							<div class="errors-box" v-if="$v.password.$error">
								<p class="red">
									<template v-if="!$v.password.required">Это поле обязательно для заполнения</template>
									<template v-if="!$v.password.minLength">
										Пароль должен быть не меньше {{ $v.password.$params.minLength.min }} символов
									</template>
									<template v-if="!$v.password.maxLength">
										Пароль должен быть не больше {{ $v.password.$params.maxLength.max }} символов
									</template>
								</p>
							</div>
						</div>
						<div class="login__row-img"></div>
					</div>
					<div class="login__row-form-conform">
						<input id="check" type="checkbox" v-model="agree">
						<label for="check" class="login__row-form-conform-label">
							Я согласен на обработку персональных данных и прочёл пользовательское соглашение
						</label>
						<div class="errors-box" v-if="$v.agree.$error">
							<p class="red">
								<template v-if="!$v.agree.required">Мы не можем продолжать без вашего согласия</template>
							</p>
						</div>
					</div>
					<div class="login__row-form-button">
						<div class="login__row-form-button-reg">
							<button
								@click.prevent="submit"
								class="login__row-form-button-log button-grand-transparent big"
							>
								ЗАРЕГИСТРИРОВАТЬСЯ
							</button>
						</div>
						<div class="login__row-form-button-reg">
							<a @click.prevent="$emit('login')" href class="login__row-form-span-log">Уже есть аккаунт?</a>
							<a target="_blank" rel="noopener" href="/agreement.pdf" class="login__row-form-span-log">Пользовательское
								соглашение</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import {email, maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators'

export default {
	name: 'Sign',
	data: () => ({
		name: null,
		phone: null,
		email: null,
		password: null,
		agree: false,
		showPass: false,
	}),
	methods: {
		submit() {
			if (this.validate()) {
				const user = {
					name: this.name,
					phone: this.phone,
					email: this.email,
					password: this.password,
				}
				this.$emit('submit', user)
			}
		},
		validate() {
			this.$v.$touch()
			return !this.$v.$invalid
		},
	},
	validations: {
		name: {
			required,
			maxLength: maxLength(150),
		},
		phone: {
			required,
			maxLength: maxLength(10),
			minLength: minLength(10),
		},
		email: {
			required,
			email,
			maxLength: maxLength(250),
		},
		password: {
			required,
			maxLength: maxLength(100),
			minLength: minLength(8),
		},
		agree: {
			sameAs: sameAs(() => true),
		},
	},
}
</script>
