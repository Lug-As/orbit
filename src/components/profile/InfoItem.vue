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
					type="text"
					class="profile__information-item-data-input"
				>
			</div>
			<div class="profile__information-item-data-info" v-else>
				<p class="profile__information-item-data-text">{{ value }}</p>
				<picture @click="onEditMode">
					<source srcset="../../assets/img/change.webp" type="image/webp">
					<img class="profile__information-item-data-text-change" src="../../assets/img/change.png"
						  alt="">
				</picture>
			</div>
		</div>
	</div>
</template>

<script>
import {directive} from 'v-click-outside'

export default {
	name: 'InfoItem',
	props: ['title', 'value'],
	data: () => ({
		edit: false,
		localVal: null,
	}),
	methods: {
		onEditMode() {
			this.edit = true
			this.$nextTick(() => this.focusInput())
		},
		offEditMode() {
			if (this.value !== this.localVal) {
				this.emitChange()
			}
			this.edit = false
		},
		focusInput() {
			this.$refs.input.focus()
		},
		emitChange() {
			this.$emit('change', this.localVal)
		},
	},
	directives: {
		clickOutside: directive,
	},
	mounted() {
		this.localVal = this.value
	},
}
</script>
