import axios from 'axios'

const resendRequest = () => axios.post('email/resend')

export default {
	async resendEmailVerification() {
		return await resendRequest()
	}
}
