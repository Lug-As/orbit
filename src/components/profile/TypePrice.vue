<template>
	<div class="account_form__type_price">
		<label class="account_form__price_label">
			{{ types_list.find(t => t.id === type.id).name }}
		</label>
		<label
			class="type-price-type-label"
			title="Выбрано, если цена заполнена."
		>
			<input
				:checked="isConcrete"
				:name="'type-price-type-' + idx"
				@click="isConcrete = true"
				type="radio"
			>
			Конкретная
		</label>
		<label
			class="type-price-type-label"
			title="Выбрано, если цена не заполнена."
		>
			<input
				:checked="!isConcrete"
				:name="'type-price-type-' + idx"
				@click="isConcrete = false"
				type="radio"
			>
			Договорная
		</label>
		<div v-if="isConcrete">
			<input
				v-model.number="selected_types[idx].price"
				@keydown="resolveInputKeys"
				@blur="$v.ad_types.$each[idx].price.$touch"
				placeholder="Цена"
				class="profile__details-input-small main__details-input-small account_form__price_input"
			>
		</div>
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
</template>

<script>
export default {
	name: 'TypePrice',
	props: {
		type: Object,
		idx: Number,
		$v: Object,
		selected_types: Array,
		types_list: Array,
	},
	data: () => ({
		isConcrete: true,
	}),
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
}
</script>

<style lang="scss">
.type-price-type-label {
	margin-left: 12px;
	cursor: pointer;
}
</style>
