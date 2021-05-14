export default {
	methods: {
		addQueryParam(key, value = 'true') {
			if (!this.$route.query[key]) {
				this.$router.replace({
					query: {
						...this.$route.query,
						[key]: value,
					},
				})
			}
		},
	},
}
