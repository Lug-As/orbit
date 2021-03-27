<template>
	<div class="profile__information-item">
		<div class="profile__information-item-title">
			<h2 class="profile__information-item-title-text">{{ title }}</h2>
		</div>
		<div class="profile__information-item-data">
			<div class="profile__information-item-data-value" v-if="edit">
				<input
					ref="input"
					v-model.trim="localVal"
					v-click-outside="offEditMode"
					@keypress.enter="offEditMode"
					@keydown.esc="forceOffEditMode"
					type="text"
					class="profile__information-item-data-input"
					v-mask="mask"
				>
				<span @click="offEditMode" class="input-btn input-btn-save cursor" title="Сохранить изменения">
					✓
				</span>
				<span @click="forceOffEditMode" class="input-btn input-btn-close cursor"
						title="Закрыть окно редактирования">
					&times;
				</span>
			</div>
			<div class="profile__information-item-data-info" v-else>
				<p
					@click="onEditMode"
					class="profile__information-item-data-text cursor"
					title="Нажмите для редактирования"
				>
					<template v-if="this.phone">
						{{ value | phone }}
					</template>
					<template v-else-if="value">
						{{ value }}
					</template>
					<template v-else>
						Пусто
					</template>
				</p>
				<picture @click="onEditMode">
					<source srcset="../../assets/img/change.webp" type="image/webp">
					<img class="profile__information-item-data-text-change" src="../../assets/img/change.png"
						  alt="">
				</picture>
			</div>
			<div class="errors-box" v-if="errorMsg">
				<span class="red">{{ errorMsg }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import {directive} from 'v-click-outside'
import {maxLength, required, email, minLength} from 'vuelidate/lib/validators'

export default {
	name: 'InfoItem',
	props: {
		title: {
			type: String,
			required: true,
		},
		value: {
			required: true,
		},
		max: {
			type: Number,
		},
		phone: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		email: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		edit: false,
		localVal: null,
		errorMsg: null,
	}),
	computed: {
		rules() {
			const rules = {}
			if (this.required) {
				rules.required = required
			}
			if (this.max) {
				rules.maxLength = maxLength(this.max)
			}
			if (this.phone) {
				rules.maxLength = maxLength(10)
				rules.minLength = minLength(10)
			}
			if (this.email) {
				rules.email = email
			}
			return rules
		},
		mask() {
			if (this.phone) {
				return {
					mask: '8 (999) 999-99-99',
				}
			}
			return null
		},
	},
	methods: {
		onEditMode() {
			this.edit = true
			this.$nextTick(() => this.focusInput())
		},
		offEditMode() {
			if (this.validate()) {
				if (this.value !== this.localVal) {
					this.emitChange()
				}
				this.setBaseState()
			}
		},
		forceOffEditMode() {
			this.setBaseState()
			this.freshData()
		},
		setBaseState() {
			this.errorMsg = null
			this.$v.$reset()
			this.edit = false
		},
		freshData() {
			this.localVal = this.value
		},
		focusInput() {
			this.$refs.input.focus()
		},
		emitChange() {
			this.$emit('change', this.localVal)
		},
		validate() {
			this.$v.$touch()
			if (this.$v.$invalid) {
				this.setErrors()
				return false
			}
			return true
		},
		setErrors() {
			if (!this.$v.localVal.required) {
				this.errorMsg = 'Это поле обязательно для заполнения.'
			} else if (this.$v.localVal.maxLength !== undefined && !this.$v.localVal.maxLength) {
				this.errorMsg = 'Количество символов не должно превышать ' + this.$v.localVal.$params.maxLength.max
			} else if (this.$v.localVal.minLength !== undefined && !this.$v.localVal.minLength) {
				this.errorMsg = 'Количество символов не должно быть меньше, чем ' + this.$v.localVal.$params.minLength.min
			} else if (this.$v.localVal.email !== undefined && !this.$v.localVal.email) {
				this.errorMsg = 'Адрес должен быть в формате Email'
			}
		},
	},
	validations() {
		return {
			localVal: {
				...this.rules,
			},
		}
	},
	directives: {
		clickOutside: directive,
	},
	mounted() {
		this.freshData()
	},
}
</script>

<style lang="scss" scoped>
.profile__information-item-data {
	@media (max-width: 767px) {
		flex-direction: column;
	}
}

.errors-box {
	margin-left: 10px;
	font-size: 14px;
}

.input-btn {
	margin-left: 4px;
	line-height: 1.2;
	vertical-align: middle;
	transition: color .2s;

	&:hover {
		color: #BEBEBE;
	}

	&-close {
		font-size: 36px;
	}

	&-save {
		font-size: 24px;
	}
}
</style>
