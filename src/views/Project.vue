<template>
	<section class="offer">
		<div class="container">
			<preloader v-if="loading"/>
			<template v-else-if="(project && Object.keys(project).length !== 0)">
				<div class="offer__title-advertiser">
					<h2 class="offer__title-advertiser-text">
						{{ project.username }} <span class="offer__advertiser-span">Рекламодатель</span>
					</h2>
				</div>
				<div class="offer__body">
					<div class="offer__body-row">
						<div class="offer__body-title">
							<h2 class="offer__body-title-text">
								{{ project.name }}
							</h2>
						</div>
						<div class="offer__body-item">
							<div class="offer__body-item-title offer__body-item-title-block">
								<h2 class="offer__body-item-title-text">
									Описание:
								</h2>
								<p class="offer__body-item-text">
									{{ project.text }}
								</p>
							</div>
						</div>
						<div class="offer__body-item" v-if="project.followers_from || project.followers_to">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">
									Желаемая аудитория:
								</h2>
								<p class="offer__body-item-text">
									<template v-if="project.followers_from">
										от {{ project.followers_from }}
									</template>
									<template v-if="project.followers_to">
										до {{ project.followers_to }}
									</template>
									подписчиков
								</p>
							</div>
						</div>
						<div class="offer__body-item" v-if="project.region">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">
									Регион:
								</h2>
								<p class="offer__body-item-text">
									{{ project.region }}, {{ project.country }}.
								</p>
							</div>
						</div>
						<div class="offer__body-item">
							<div class="offer__body-item-title">
								<h2 class="offer__body-item-title-text">
									Тип рекламы:
								</h2>
								<p class="offer__body-item-text">
									{{ project.ad_types | slashedList }}
								</p>
							</div>
						</div>
					</div>
					<div class="offer__body-price">
						<div class="offer__body-price-row">
							<div class="offer__body-price-title">
								<h2 class="offer__body-price-title-text">
									Бюджет:
								</h2>
								<span class="offer__body-price-title-span">{{ project.budget }}₽</span>
							</div>
							<div class="offer__body-price-button">
								<button class="button-grand-black big button__open-massage" disabled>
									Предложить выполнение работы
								</button>
							</div>
							<div class="offer__body-price-confirmation bloger__button-confirmation">
								<picture>
									<source srcset="../assets/img/Иллюстрация.webp" type="image/webp">
									<img src="../assets/img/Иллюстрация.png" alt=""></picture>
								<p class="bloger__button-text">Чтобы делать предложения, подтверди
									свой почтовый ящик.</p>
							</div>
						</div>
					</div>
				</div>
			</template>
			<transition name="fade">
				<div class="bloger__massage" v-if="showModal">
					<div class="bloger__massage-row">
						<span class="bloger__massage-close">&times;</span>
						<div class="bloger__massage-alert">
							<h2 class="bloger__alert-h2">
								Все сообщения модерируются. За распространение
								некорректных предложений, или предложений
								неподходящих для нашего сервиса мы вправе отключать
								пользователей. <span class="bloger__alert-span">Будьте корректны!</span>
							</h2>
						</div>
						<form class="bloger__massage-comment">
							<div class="bloger__massage-title">
								<h2 class="bloger__title-text">Оставь комментарий по поводу задачи</h2>
							</div>
							<div class="bloger__comment-text">
								<textarea required class="bloger__text-area"></textarea>
							</div>
							<div class="bloger__comment-button">
								<button class="bloger__button-border">Предложить выполнение задачи</button>
							</div>
						</form>
					</div>
				</div>
			</transition>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'

export default {
	name: 'Project',
	components: {Preloader},
	data: () => ({
		showModal: false,
		showThanks: false,
		offerText: '',
		errorMsg: '',
	}),
	computed: {
		/**
		 * @returns {Project}
		 */
		project() {
			return this.$store.getters.currentProject
		},
		loading() {
			return this.$store.getters.projectLoading
		},
		id() {
			return this.$route.params.id
		},
		verifyed() {
			if (this.user) {
				return this.user.verifyed
			}
			return null
		},
		user() {
			return this.$store.getters.user
		},
	},
	mounted() {
		this.$store.dispatch('loadProject', this.id)
			.catch(e => {
				if (e.response && e.response.status && e.response.status === 404) {
					let route = this.$router.match({name: '404'})
					this.$router.history.updateRoute(route)
				}
			})
	},
	beforeDestroy() {
		this.$store.commit('destroyCurrentProject')
	},
}
</script>

<style scoped>

</style>
