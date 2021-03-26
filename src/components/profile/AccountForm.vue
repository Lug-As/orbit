<template>
	<div class="profile__questionnaire-body">
		<div class="profile__questionnaire-body-row">
			<div class="profile__questionnaire-avatar">
				<div class="profile__questionnaire-img cursor" @click="$refs['imageinput'].click()">
					<img v-if="src" :src="src" alt="">
					<picture v-else>
						<source srcset="../../assets/img/noneimg.webp" type="image/webp">
						<img src="../../assets/img/noneimg.png" alt="">
					</picture>
				</div>
				<div class="profile__questionnaire-load">
					<label class="profile__questionnaire-load-button">
						<input
							ref="imageinput"
							@change="uploadImage"
							type="file"
							style="display:none"
						>
						<span class="red">*</span>
						Загрузить фото
					</label>
				</div>
			</div>
			<div class="profile__questionnaire-item">
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						<span class="red">*</span>
						Впишите название аккаунта Тик-Ток
						<span class="secondary">(без @)</span>
					</h2>
					<input
						v-model.trim="title"
						@blur="$v.title.$touch"
						type="text"
						class="profile__questionnaire-item-info-input"
					>
					<p class="red account_form__error" v-if="$v.title.$error">
						<template v-if="!$v.title.required">
							Поле обязательно для заполнения
						</template>
						<template v-if="!$v.title.maxLength">
							Длина названия не должна превышать {{ $v.title.$params.maxLength.max }} символов
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						<span class="red">*</span>
						Тематика блога
						<span class="secondary">(можно выбрать несколько)</span>
					</h2>
					<v-select
						label="name"
						v-model="topics"
						@search:blur="$v.topics.$touch"
						:options="allTopics"
						:reduce="opt => opt.id"
						multiple
						class="main__vue-select ac-proj-form__select"
					>
						<span slot="no-options">Ничего не найдено</span>
					</v-select>
					<p class="red account_form__error" v-if="$v.topics.$error">
						<template v-if="!$v.topics.required">
							Поле обязательно для заполнения
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						<span class="red">*</span>
						Виды рекламы
						<span class="secondary">(можно выбрать несколько)</span>
					</h2>
					<v-select
						label="name"
						v-model="ad_types_id"
						@search:blur="$v.ad_types.$touch"
						:options="allTypes"
						:reduce="opt => opt.id"
						multiple
						class="main__vue-select ac-proj-form__select"
					>
						<span slot="no-options">Ничего не найдено</span>
					</v-select>
					<p class="red account_form__error" v-if="$v.ad_types.$error && !$v.ad_types.required">
						<template v-if="!$v.ad_types.required">
							Поле обязательно для заполнения
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info" v-if="ad_types.length">
					<h2 class="profile__questionnaire-item-info-h2">
						Стоимость на виды рекламы
						<span class="secondary">(в руб.)</span>
					</h2>
					<type-price
						v-for="(type, idx) in ad_types"
						:type="type"
						:types_list="allTypes"
						:selected_types="ad_types"
						:idx="idx"
						:$v="$v"
					/>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						О себе
					</h2>
					<textarea
						v-model.trim="about"
						@blur="$v.about.$touch"
						class="profile__questionnaire-item-info-textarea"
					></textarea>
					<p class="red account_form__error" v-if="$v.about.$error">
						<template v-if="!$v.about.maxLength">
							Длина описания не должна превышать {{ $v.about.$params.maxLength.max }} символов
						</template>
					</p>
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
						class="main__vue-select ac-proj-form__select"
					>
						<span slot="no-options">Ничего не найдено</span>
					</v-select>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">Субъект РФ</h2>
					<v-select
						label="name"
						v-model="region"
						:options="allRegions"
						:reduce="opt => opt.id"
						:selectable="option => !option.hasOwnProperty('group')"
						class="main__vue-select main__vue-select--region ac-proj-form__select"
					>
						<template #option="{ group, name }">
							<div v-if="group" class="group">
								{{ group }}
							</div>
							<template v-else>
								{{ name }}
							</template>
						</template>
						<span slot="no-options">Ничего не найдено</span>
					</v-select>
				</div>
				<div class="profile__questionnaire-item-button-create">
					<p><span class="red">*</span> Обязательные поля</p>
					<button
						@click="submit"
						:disabled="!this.valid"
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
import TypePrice from '@/components/profile/TypePrice'

const MAX_FILE_SIZE = 5000000
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export default {
	name: 'AccountForm',
	components: {TypePrice},
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
		reader: null,
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
			if (file) {
				this.reader.readAsDataURL(file)
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
		valid() {
			return !this.$v.$invalid && this.image
		},
	},
	methods: {
		submit() {
			if (this.validate()) {
				const request = {
					'name': this.title,
					'about': this.about,
					'image': this.image,
					'ad_types': this.ad_types,
					'topics': this.topics,
					'ages': this.ages,
					'region_id': this.region,
				}
				this.$emit('submit', request)
			}
		},
		validate() {
			this.$v.$touch()
			return this.valid
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
		uploadImage(ev) {
			const file = ev.target.files[0]
			if (file) {
				if (!ALLOWED_MIME_TYPES.includes(file.type)) {
					return alert('Картинка должна быть в этих форматах ' + ALLOWED_MIME_TYPES.join(', '))
				}
				if (file.size > MAX_FILE_SIZE) {
					return alert('Размер файла не должен превышать ' + Math.floor(MAX_FILE_SIZE / 1000 / 1000) + ' МБ')
				}
				this.image = file
			}
		},
	},
	mounted() {
		this.$store.dispatch('loadTopics')
		this.$store.dispatch('loadTypes')
		this.$store.dispatch('loadAges')
		this.$store.dispatch('loadRegions')
		this.reader = new FileReader()
		this.reader.onloadend = () => {
			this.src = this.reader.result
		}
	},
}
</script>

<style lang="scss">
.account_form {
	&__error {
		margin: 10px 0 0;
	}

	&__price {
		&_input {
			margin: 5px 12px;
			padding-left: 10px;
			padding-right: 10px;
		}

		&_label {
			font-size: 17px;
			margin-left: 10px;
		}
	}
}
</style>
