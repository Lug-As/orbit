<template>
	<div class="profile__questionnaire-body">
		<div class="profile__offer-body-row profile__questionnaire-body-row">
			<div class="profile__offer-body-avatar">
				<picture>
					<source srcset="../../assets/img/cosmonavt.webp" type="image/webp">
					<img src="../../assets/img/cosmonavt.png" alt=""></picture>
			</div>
			<div class="profile__offer-item profile__questionnaire-item">
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Заголовок предложения
						<span class="red">*</span>
					</h2>
					<input
						v-model.trim="name"
						@blur="$v.name.$touch"
						type="text"
						class="profile__questionnaire-item-info-input"
					>
					<p class="red account_form__error" v-if="$v.name.$error">
						<template v-if="!$v.name.required">
							Поле обязательно для заполнения
						</template>
						<template v-if="!$v.name.maxLength">
							Длина названия не должна превышать {{ $v.name.$params.maxLength.max }} символов
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Описание предложения
						<span class="red">*</span>
					</h2>
					<textarea
						v-model.trim="text"
						@blur="$v.text.$touch"
						class="profile__questionnaire-item-info-textarea"
					></textarea>
					<p class="red account_form__error" v-if="$v.text.$error">
						<template v-if="!$v.text.required">
							Поле обязательно для заполнения
						</template>
						<template v-if="!$v.text.maxLength">
							Длина описания не должна превышать {{ $v.text.$params.maxLength.max }} символов
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Бюджет
						<span class="secondary">(в руб.)</span>
						<span class="red">*</span>
					</h2>
					<input
						v-model.number="budget"
						@keydown="resolveInputKeys"
						@blur="$v.budget.$touch"
						type="text"
						class="profile__questionnaire-item-info-input"
					>
					<p class="red account_form__error" v-if="$v.budget.$error">
						<template v-if="!$v.budget.required">
							Поле обязательно для заполнения
						</template>
						<template v-if="!$v.budget.minValue">
							Бюджет должен быть больше 0
						</template>
						<template v-if="!$v.budget.maxValue">
							Бюджет должен быть меньше
							{{ ($v.budget.$params.maxValue.max + 1).toLocaleString() }}
						</template>
					</p>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">Вид рекламы</h2>
					<v-select
						label="name"
						v-model="ad_types"
						:options="allTypes"
						:reduce="opt => opt.id"
						multiple
						class="main__vue-select ac-proj-form__select"
					/>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Регион
					</h2>
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
					</v-select>
					<span class="profile__offer-item-info-span">Заполните поле, если ваша реклама привязана к
                                региону.</span>
				</div>
				<div class="profile__questionnaire-item-info">
					<h2 class="profile__questionnaire-item-info-h2">
						Желаемая аудитория
					</h2>
					<div class="main__details-from-to">
						<div class="main__details-from">
							<p class="main__details-text">от</p>
							<div class="main__details-input">
								<input
									v-model.number="followers_from"
									@keydown="resolveInputKeys"
									class="profile__details-input-small main__details-input-small"
								>
							</div>
						</div>
						<div class="main__details-to">
							<p class="main__details-text">до</p>
							<div class="main__details-input">
								<input
									v-model.number="followers_to"
									@keydown="resolveInputKeys"
									class="profile__details-input-small main__details-input-small"
								>
							</div>
							<p class="profile__offer-deteilds-text main__details-text">Подписчиков</p>
						</div>
					</div>
					<span class="profile__offer-item-info-span">Заполните поле, если вы знаете сколько
                                должно быть подписчиков у блогера.</span>
				</div>
				<div class="profile__offer-item-button-create profile__questionnaire-item-button-create">
					<p><span class="red">*</span> Обязательные поля</p>
					<button
						class="profile__offer-item-button profile__questionnaire-item-button button-grand-black">
						Создать предложение
					</button>
					<span class="profile__offer-item-info-span">
						Внимание! Все предложения модерируются.
						Если предложение не соответствует нашим правилам, администраторы вправе удалить предложение.
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {integer, maxLength, maxValue, minValue, required} from 'vuelidate/lib/validators'

export default {
	name: 'ProjectForm',
	data: () => ({
		name: null,
		text: null,
		budget: null,
		followers_from: null,
		followers_to: null,
		ad_types: [],
		region: null,
	}),
	validations: {
		name: {
			required,
			maxLength: maxLength(250),
		},
		text: {
			required,
			maxLength: maxLength(3000),
		},
		budget: {
			required,
			integer,
			maxValue: maxValue(999999),
			minValue: minValue(1),
		},
	},
	computed: {
		allTypes() {
			return this.$store.getters.types
		},
		allRegions() {
			return this.$store.getters.regions
		},
	},
	methods: {
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
	},
	mounted() {
		this.$store.dispatch('loadTypes')
		this.$store.dispatch('loadRegions')
	},
}
</script>

<style lang="scss" scoped>

</style>
