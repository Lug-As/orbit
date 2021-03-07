<template>
	<section class="change" @click.self="$emit('closed')">
		<div class="container" @click.self="$emit('closed')">
			<div class="login__row">
				<span
					@click="$emit('closed')"
					class="form-close-cross"
				>&times;</span>
				<div class="login__row-title">
					<h2 class="login__row-title-h2">
						Впишите новый пароль дважды
					</h2>
				</div>
				<form class="login__row-form">
					<div class="login__row-form-body">
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
						<div class="login__row-form-item">
							<div class="login__row-form-item-label">
								<label for="psswrd_c">
									Впишите пароль повторно
								</label>
							</div>
							<div class="login__row-form-item-input">
								<input
									v-model="password_confirmation"
									@blur="$v.password_confirmation.$touch"
									type="password"
									id="psswrd_c"
									required
								>
							</div>
							<div class="errors-box" v-if="$v.password_confirmation.$error">
								<p class="red">
									<template v-if="!$v.password_confirmation.required">Это поле обязательно для заполнения
									</template>
									<template v-else-if="!$v.password_confirmation.minLength">
										Пароль должен быть не меньше {{ $v.password_confirmation.$params.minLength.min }} символов
									</template>
									<template v-else-if="!$v.password_confirmation.maxLength">
										Пароль должен быть не больше {{ $v.password_confirmation.$params.maxLength.max }} символов
									</template>
									<template v-else-if="!$v.password_confirmation.sameAs">
										Пароли должны совпадать
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
							>
								СОЗДАТЬ
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import {maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators'

export default {
	name: 'Change',
	data: () => ({
		password: null,
		password_confirmation: null,
	}),
	methods: {
		submit() {
			if (this.validate()) {
				const user = {
					password_confirmation: this.password_confirmation,
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
		password: {
			required,
			maxLength: maxLength(100),
			minLength: minLength(8),
		},
		password_confirmation: {
			required,
			maxLength: maxLength(100),
			minLength: minLength(8),
			sameAs: sameAs('password'),
		},
	},
}
</script>
