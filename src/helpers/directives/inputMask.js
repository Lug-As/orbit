import Inputmask from 'inputmask'

export default {
	inserted(el, binding) {
		const val = binding.value
		if (val !== null) {
			const maskOpts = {
				showMaskOnHover: true,
				showMaskOnFocus: true,
				autoUnmask: true,
				clearIncomplete: false,
				...val,
			}
			Inputmask(maskOpts).mask(el)
		}
	},
	unbind(el) {
		Inputmask.remove(el)
	},
}
