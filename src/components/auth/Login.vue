<template>
	<section class="login" @click.self="$emit('closed')">
		<div class="container" @click.self="$emit('closed')">
			<div class="login__row">
				<span
					@click="$emit('closed')"
					class="form-close-cross"
				>&times;</span>
				<div class="login__row-title">
					<h2 class="login__row-title-h2">
						Впишите логин и пароль, чтобы войти в сервис
					</h2>
				</div>
				<form class="login__row-form">
					<div class="login__row-form-body">
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
									type="password"
									id="psswrd"
									required
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
					<div class="login__row-form-button">
						<div class="login__row-form-button-reg">
							<button
								@click.prevent="submit"
								class="login__row-form-button-log button-grand-transparent big"
							>ВОЙТИ</button>
						</div>
						<div class="login__row-form-button-reg">
							<a href="" class="login__row-form-span-log">Забыли пароль?</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import {email, maxLength, minLength, required} from 'vuelidate/lib/validators'

export default {
	name: 'Login',
	data: () => ({
		email: null,
		password: null,
	}),
	methods: {
		submit() {
			if (this.validate()) {
				const user = {
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
	},
}
</script>

<style lang="scss" scoped>

</style>
