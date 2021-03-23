export const I = {
	// Проверка на поддержку webp браузером
	init() {
		function testWebP(callback) {
			const webP = new Image()
			webP.onload = webP.onerror = function () {
				callback(webP.height == 2)
			}
			webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
		}

		const body = document.querySelector('body')

		testWebP(support => {
			if (support) {
				body.classList.add('webp')
			} else {
				body.classList.add('no-webp')
			}
		})
	},
}
