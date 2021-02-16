<template>
	<vue-slider
		v-model="localValue"
		@change="$emit('input', localValue)"
		tooltip="none"
		:dotStyle="dotStyle"
		:processStyle="processStyle"
		:railStyle="railStyle"
	/>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
	name: 'DoubleRange',
	props: {
		value: {
			required: true,
			type: Array,
		},
	},
	data: () => ({
		dotStyle: {
			backgroundColor: '#061a62',
			height: '18px',
			width: '18px',
			transform: 'translateY(-10%)',
		},
		processStyle: {
			backgroundColor: '#061a62',
		},
		railStyle: {
			height: '2px',
			margin: '10px 0',
		},
		localValue: null,
	}),
	components: {
		VueSlider,
	},
	created() {
		this.localValue = this.value
	}
}
</script>

<style scoped>

</style>
