<template>
	<section class="bloger">
		<div class="container">
			<div v-if="loading" class="preload-container">
				<preloader/>
			</div>
			<template v-else-if="account">
				<div class="bloger__row">
					<div class="bloger__row-img">
						<div class="bloger__img">
							<img :src="account.image" :alt="account.title">
						</div>
						<div class="bloger__img-small">
							<div class="bloger__img-link">
								<picture>
									<source srcset="../assets/img/АИ.webp" type="image/webp">
									<img src="../assets/img/АИ.png" alt=""></picture>
							</div>
							<div class="bloger__img-link">
								<picture>
									<source srcset="../assets/img/АИ.webp" type="image/webp">
									<img src="../assets/img/АИ.png" alt=""></picture>
							</div>
							<div class="bloger__img-link">
								<picture>
									<source srcset="../assets/img/АИ.webp" type="image/webp">
									<img src="../assets/img/АИ.png" alt=""></picture>
							</div>
						</div>
					</div>
					<div class="bloger__body">
						<div class="bloger__body-row">
							<div class="bloger__row-title">
								<h2 class="bloger__title-h2">
									{{ account.username }}
								</h2>
								<div class="bloger__title-text border-body">
									<h3 class="bloger__title-nickname">{{ account.title }}</h3>
									<a class="bloger__title-link" :href="reference">Перейти в ток-ток
										аккаунт</a>
								</div>
							</div>
							<div class="bloger__body-statistics border-body">
								<p class="bloger__statistics-text">
									{{ account.followers | round }} подписчиков / {{ account.likes | round }} лайков.
								</p>
							</div>
							<div class="bloger__body-theme border-body">
								<h3 class="bloger__body-title">Тема канала: </h3>
								<p class="bloger__body-text"> {{ account.topics | slashedList }}</p>
							</div>
							<div class="bloger__body-view border-body">
								<h3 class="bloger__body-title">Вид / Цена рекламы:</h3>
								<ul class="bloger__view-ul">
									<li v-for="type in account.ad_types"
										 :key="type.id"
										 class="bloger__ul-li bloger__body-text"
									>
										{{ type.name }} - от {{ type.price }} ₽;
									</li>
								</ul>
							</div>
							<div class="bloger__body-about border-body">
								<h3 class="bloger__body-title">О себе: </h3>
								<p class="bloger__body-text text-padding">{{ account.about }}</p>
							</div>
							<div class="bloger__body-age border-body">
								<h3 class="bloger__body-title">Возрастные категории аудитории:</h3>
								<p class="bloger__body-text">
									{{ account.ages | slashedList('range') }}
								</p>
							</div>
							<div class="bloger__body-place border-body">
								<h3 class="bloger__body-title">Субъект РФ: </h3>
								<p class="bloger__body-text">{{ account.region }}, {{ account.country }}.</p>
							</div>
							<div class="bloger__body-button">
								<button class="bloger__button button-grand-black big">Предложить работу</button>
								<button class="bloger__button-black button-grand-transparent">Перейти в ток-ток аккаунт</button>
								<div class="bloger__button-confirmation">
									<picture>
										<source srcset="../assets/img/Иллюстрация.webp" type="image/webp">
										<img src="../assets/img/Иллюстрация.png" alt=""></picture>
									<p class="bloger__button-text">Чтобы делать предложения, подтверди
										свой почтовый ящик.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bloger__massage">
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
								<textarea required class="bloger__text-area" name="" id="" cols="30" rows="10"></textarea>
							</div>
							<div class="bloger__comment-button">
								<button class="bloger__button-border">Предложить выполнение задачи</button>
							</div>
						</form>
					</div>
				</div>
			</template>
			<h3 v-else>Пусто</h3>
		</div>
	</section>
</template>

<script>
import Preloader from '@/components/Preloader'

export default {
	name: 'Account',
	components: {Preloader},
	computed: {
		account() {
			return this.$store.getters.currentAccount
		},
		loading() {
			return this.$store.getters.loading
		},
		reference() {
			return 'https://www.tiktok.com/' + this.account.title
		},
		id() {
			return this.$route.params.id
		},
	},
	mounted() {
		this.$store.dispatch('loadAccount', this.id)
			.catch(e => {
				if (e.response && e.response.status && e.response.status === 404) {
					let route = this.$router.match({name: '404'})
					this.$router.history.updateRoute(route)
				}
			})
	},
	beforeDestroy() {
		this.$store.commit('destroyCurrentAccount')
	},
}
</script>

<style scoped>
.preload-container {
	height: 400px;
	display: flex;
}

.bloger__img img {
	object-fit: cover;
	object-position: 50% 25%;
}
</style>
