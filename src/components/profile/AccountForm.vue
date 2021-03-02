<template>
	<div class="profile__questionnaire-body">
		<div class="profile__questionnaire-body-row">
			<div class="profile__questionnaire-avatar">
				<div class="profile__questionnaire-img">
					<img v-if="src" :src="src" alt="">
					<picture v-else>
						<source srcset="../../assets/img/noneimg.webp" type="image/webp">
						<img src="../../assets/img/noneimg.png" alt="">
					</picture>
				</div>
				<div class="profile__questionnaire-load">
					<label class="profile__questionnaire-load-button">
						<input
							@change="uploadImage"
							type="file"
							style="display:none"
						>
						Загрузить фото
					</label>
				</div>
			</div>
			<div class="profile__questionnaire-item">
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Впишите название аккаунта
						<span class="red">*</span>
					</h2>
					<input
						v-model="title"
						@blur="$v.title.$touch"
						type="text"
						class="profile__questionnaire-item-info-input"
					>
					<p class="red account_form__error" v-if="$v.title.$error">
						<template v-if="!$v.title.required">
							Поле обязательно для заполнения
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Тематика блога
						<span class="red">*</span>
					</h2>
					<v-select
						label="name"
						v-model="topics"
						@search:blur="$v.topics.$touch"
						:options="allTopics"
						:reduce="opt => opt.id"
						multiple
						class="main__vue-select form__select"
					/>
					<p class="red account_form__error" v-if="$v.topics.$error">
						<template v-if="!$v.topics.required">
							Поле обязательно для заполнения
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Виды рекламы
						<span class="red">*</span>
					</h2>
					<v-select
						label="name"
						v-model="ad_types_id"
						@search:blur="$v.ad_types.$touch"
						:options="allTypes"
						:reduce="opt => opt.id"
						multiple
						class="main__vue-select form__select"
					/>
					<p class="red account_form__error" v-if="$v.ad_types.$error && !$v.ad_types.required">
						<template v-if="!$v.ad_types.required">
							Поле обязательно для заполнения
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info" v-if="ad_types.length">
					<h2 class="profile__questionnaire-item-info-h2">
						Цена на виды рекламы <span class="secondary">(в руб.)</span>
					</h2>
					<div
						v-for="(type, idx) in ad_types"
						class="account_form__type_price"
					>
						<label
							:for="'type-price-' + idx"
							class="account_form__price_label"
						>
							{{ allTypes.find(t => t.id === type.id).name }}
						</label>
						<input
							:id="'type-price-' + idx"
							v-model.number="ad_types[idx].price"
							@keydown="resolveInputKeys"
							@blur="$v.ad_types.$each[idx].price.$touch"
							placeholder="Цена"
							class="profile__questionnaire-item-info-input account_form__price_input"
						>
						<span class="account_form__price_rub">₽</span>
						<label>
							<input
								:checked="!ad_types[idx].price"
								@click.prevent
								type="checkbox"
							>
							Договорная
						</label>
						<p class="red account_form__error" v-if="$v.ad_types.$each[idx].price.$error">
							<template v-if="!$v.ad_types.$each[idx].price.minValue">
								Цена должна быть больше 0
							</template>
							<template v-if="!$v.ad_types.$each[idx].price.maxValue">
								Цена должна быть меньше
								{{ ($v.ad_types.$each[idx].price.$params.maxValue.max + 1).toLocaleString() }}
							</template>
						</p>
					</div>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						О себе
					</h2>
					<textarea
						v-model="about"
						class="profile__questionnaire-item-info-textarea"
					></textarea>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Возрастные категории аудитории
					</h2>
					<v-select
						label="name"
						v-model="ages"
						:options="allAges"
						:reduce="opt => opt.id"
						multiple
						class="main__vue-select form__select"
					/>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">Субъект РФ</h2>
					<v-select
						label="name"
						v-model="region"
						:options="allRegions"
						:reduce="opt => opt.id"
						:selectable="option => !option.hasOwnProperty('group')"
						class="main__vue-select main__vue-select--region form__select"
					>
						<template #option="{ group, name }">
							<div v-if="group" class="group">
								{{ group }}
							</div>
							<template v-else>
								{{ name }}
							</template>
						</template>
					</v-select>
				</div>
				<div class="profile__questionnaire-item-button-create">
					<button
						@click="submit"
						:disabled="$v.$invalid"
						class="profile__questionnaire-item-button button-grand-black"
					>
						Отправить анкету
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {integer, maxLength, maxValue, minValue, required} from 'vuelidate/lib/validators'

export default {
	name: 'AccountForm',
	data: () => ({
		title: null,
		about: null,
		image: null,
		ad_types: [],
		ad_types_id: [],
		ages: [],
		topics: [],
		region: null,
		src: null,
	}),
	watch: {
		ad_types_id(ids) {
			this.ad_types = ids.map(id => {
				const oldType = this.ad_types.find(type => type.id === id)
				if (oldType) {
					return oldType
				}
				return {
					id,
					price: null,
				}
			})
		},
		image(file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				this.src = reader.result
			}
			if (file) {
				reader.readAsDataURL(file)
			} else {
				this.src = ''
			}
		},
	},
	validations: {
		title: {
			required,
			maxLength: maxLength(24),
		},
		about: {
			maxLength: maxLength(1000),
		},
		topics: {
			required,
		},
		ad_types: {
			required,
			$each: {
				price: {
					integer,
					maxValue: maxValue(9999999),
					minValue: minValue(1),
				},
			},
		},
	},
	computed: {
		allTopics() {
			return this.$store.getters.topics
		},
		allTypes() {
			return this.$store.getters.types
		},
		allRegions() {
			return this.$store.getters.regions
		},
		allAges() {
			return this.$store.getters.ages
		},
		user() {
			return this.$store.getters.user
		},
	},
	methods: {
		submit() {
			if (this.validate()) {
				const account = {
					title: this.title,
					about: this.about,
					image: this.image,
					ad_types: this.ad_types,
					topics: this.topics,
					ages: this.ages,
					region: this.region,
				}
				console.log(account)
			}
		},
		resolveInputKeys(ev) {
			const allowedKeyCodes = [8, 46, 37, 38, 39, 40, 116, 13]
			if (!allowedKeyCodes.includes(ev.keyCode)) {
				const key = ev.key
				if (!Number.isInteger(parseInt(key))) {
					ev.returnValue = false
					if (ev.preventDefault) ev.preventDefault()
				}
			}
		},
		validate() {
			this.$v.$touch()
			return !this.$v.$invalid
		},
		uploadImage(ev) {
			this.image = ev.target.files[0]
		},
	},
	mounted() {
		this.$store.dispatch('loadTopics')
		this.$store.dispatch('loadTypes')
		this.$store.dispatch('loadAges')
		this.$store.dispatch('loadRegions')
	},
}
</script>

<style lang="scss" scoped>
.account_form {
	&__error {
		margin: 10px 0 0;
	}

	&__price {
		&_input {
			width: 105px;
			margin: 5px 12px;
			padding-left: 10px;
			padding-right: 10px;
		}

		&_label {
			font-size: 17px;
			margin-left: 10px;
		}

		&_rub {
			display: none;
			font-size: 20px;
			margin: 0 8px;
		}
	}
}
</style>

<style lang="scss">
.form__select {
	& .vs__search::placeholder,
	& .vs__dropdown-toggle,
	& .vs__dropdown-menu {
		font-size: 18px;
	}

	& .vs__search::placeholder,
	& .vs__dropdown-toggle {
		padding: 10px;
	}
}
</style>
