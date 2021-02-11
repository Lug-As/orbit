<template>
	<div id="app">
		<main-layout></main-layout>
	</div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import {I} from '@/assets/js/script'

export default {
	data: () => ({}),
	components: {
		MainLayout,
	},
	mounted() {
		I.init()
	},
}
</script>
