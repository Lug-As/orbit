<template>
	<section class="bloger">
		<div class="container">
			<div class="bloger__row">
				<div class="bloger__row-img">
					<div class="bloger__img">
						<img src="../assets/img/АИ.webp" :alt="mainImgAlt">
						<!--           ^^ image ^^           -->
					</div>
					<!-- /.bloger__img -->
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
				<!-- /.bloger__img -->
				<div class="bloger__body">
					<div class="bloger__body-row">
						<div class="bloger__row-title">
							<h2 class="bloger__title-h2">
								{{ username }}
							</h2>
							<!-- /.bloger__title-h2 -->
							<div class="bloger__title-text border-body">
								<h3 class="bloger__title-nickname">{{ title }}</h3>
								<a class="bloger__title-link" :href="reference">Перейти в ток-ток
									аккаунт</a>
							</div>
							<!-- /.bloger__title-nickname -->
						</div>
						<!-- /.bloger__body-title -->
						<div class="bloger__body-statistics border-body">
							<p class="bloger__statistics-text">
								{{ followers | round }} подписчиков / {{ likes | round }} лайков.
							</p>
						</div>
						<!-- /.bloger__body-statistics -->
						<div class="bloger__body-theme border-body">
							<h3 class="bloger__body-title">Тема канала: </h3>
							<p class="bloger__body-text"> {{ slashedList(topics) }}</p>
						</div>
						<!-- /.bloger__body-theme -->
						<div class="bloger__body-view border-body">
							<h3 class="bloger__body-title">Вид / Цена рекламы:</h3>
							<ul class="bloger__view-ul">
								<li class="bloger__ul-li bloger__body-text"
									 v-for="type in ad_types"
									 :key="type.id"
								>
									{{ type.name }} - от {{ Math.floor(type.price / 100) * 100 }} ₽;
								</li>
							</ul>
						</div>
						<!-- /.bloger__body-theme -->
						<div class="bloger__body-about border-body">
							<h3 class="bloger__body-title">О себе: </h3>
							<p class="bloger__body-text text-padding">{{ about }}</p>
						</div>
						<!-- /.bloger__body-theme -->
						<div class="bloger__body-age border-body">
							<h3 class="bloger__body-title">Возрастные категории аудитории:</h3>
							<p class="bloger__body-text">
								{{ slashedList(ages, 'range') }}
							</p>
						</div>
						<!-- /.bloger__body-theme -->
						<div class="bloger__body-place border-body">
							<h3 class="bloger__body-title">Субъект РФ: </h3>
							<p class="bloger__body-text">{{ region }}, {{ country }}.</p>
						</div>
						<!-- /.bloger__body-theme -->
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
							<!-- /.bloger__button-confirmation -->
						</div>
						<!-- /.bloger__body-theme -->
					</div>
					<!-- /.bloger__row -->
				</div>
				<!-- /.bloger__body -->
			</div>
			<!-- /.bloger__row -->
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
					<!-- /.bloger__massage-alert -->
					<form class="bloger__massage-comment">
						<div class="bloger__massage-title">
							<h2 class="bloger__title-text">Оставь комментарий по поводу задачи</h2>
						</div>
						<!-- /.bloger__massage-title -->
						<div class="bloger__comment-text">
							<textarea required class="bloger__text-area" name="" id="" cols="30" rows="10"></textarea>
						</div>
						<!-- /.bloger__comment-text -->
						<div class="bloger__comment-button">
							<button class="bloger__button-border">Предложить выполнение задачи</button>
						</div>
						<!-- /.bloger__comment-button -->
					</form>
					<!-- /.bloger__massage-comment -->
				</div>
				<!-- /.bloger__massage-row -->
			</div>
			<!-- /.bloger__massage -->
		</div>
	</section>
	<!-- /.bloger -->
</template>

<script>
import {get} from 'axios'

export default {
	name: 'Bloger',
	data: () => ({
		title: '',
		about: '',
		image: '',
		username: '',
		followers: '',
		likes: '',
		region: '',
		country: '',
		ad_types: [],
		ages: [],
		topics: [],
		gallery: [],
	}),
	computed: {
		reference() {
			return 'https://www.tiktok.com/' + this.title
		},
		mainImgAlt() {
			return this.title + ' - ' + this.username
		},
	},
	methods: {
		slashedList(rawList, key = 'name') {
			const divider = ' / ',
				list = []
			rawList.forEach(function (item) {
				list.push(item[key])
			})
			return list.join(divider)
		},
	},
	mounted() {
		get('http://tiktok-orbit.me/api/v1/accounts/57')
			.then(res => {
				const apiData = res.data.data
				this.title = apiData.title
				this.about = apiData.about
				this.image = apiData.image
				this.followers = apiData.followers
				this.likes = apiData.likes
				this.ad_types = apiData.ad_types
				this.ages = apiData.ages
				this.gallery = apiData.gallery
				this.topics = apiData.topics
				this.username = apiData.user.name
				this.region = apiData.region.name
				this.country = apiData.region.country.name
			})
	},
	filters: {
		round(num) {
			num = parseInt(num)
			const bitness = num.toString().length
			if (bitness > 6) {
				num = (num / 1000000).toFixed(1) + 'M'
			} else if (bitness > 3) {
				num = (num / 1000).toFixed(1) + 'K'
			}
			return num
		},
	},
}
</script>

<style scoped>

</style>
