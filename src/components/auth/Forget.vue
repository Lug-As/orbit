<template>
	<section class="forget" @click.self="$emit('closed')">
		<div class="container" @click.self="$emit('closed')">
			<div class="login__row">
				<span
					@click="$emit('closed')"
					class="form-close-cross"
				>&times;</span>
				<div class="login__row-title">
					<h2 class="login__row-title-h2">
						Забыли пароль?
					</h2>
					<p class="login__row-title-p">
						Вскоре к вам на почту прийдёт ссылка по которой будет необходимо перейти и создать новый пароль!
					</p>
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
						<div class="login__row-img"></div>
					</div>
					<div class="login__row-form-button">
						<div class="login__row-form-button-reg">
							<button
								@click.prevent="submit"
								class="login__row-form-button-log button-grand-transparent big"
							>
								ОТПРАВИТЬ
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import {email, maxLength, required} from 'vuelidate/lib/validators'

export default {
	name: 'Forget',
	data: () => ({
		email: null,
	}),
	methods: {
		submit() {
			if (this.validate()) {
				const data = {
					email: this.email,
				}
				this.$emit('submit', data)
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
	},
}
</script>
