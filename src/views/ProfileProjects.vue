<template>
	<div class="profile__offer profile__questionnaire profile__contant tab-4">
		<div class="profile__offer-row profile__questionnaire-row">
			<div class="profile__questionnaire-create">
				<button class="profile__questionnaire-create-button button-grand-black">
					<picture>
						<source srcset="../assets/img/plus-create.webp" type="image/webp">
						<img src="../assets/img/plus-create.png" alt=""></picture>
					Добавить предложение
				</button>
			</div>
			<div class="profile__questionnaire-body">
				<div class="profile__offer-body-row profile__questionnaire-body-row">
					<div class="profile__offer-body-avatar">
						<picture>
							<source srcset="../assets/img/cosmonavt.webp" type="image/webp">
							<img src="../assets/img/cosmonavt.png" alt=""></picture>
					</div>
					<div class="profile__offer-item profile__questionnaire-item">
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Впишите заголовок предложения
							</h2>
							<input type="text" class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Впишите описание предложения
							</h2>
							<textarea
								class="profile__questionnaire-item-info-textarea">15 000 / Рекламный пост</textarea>
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Бюджет
							</h2>
							<input type="text" value="15 000 / Рекламный пост"
									 class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Вид рекламы
							</h2>
							<div class="profile__questionnaire-item-info-select">
								<p class="profile__questionnaire-item-info-option select">Тематика блога</p>
							</div>
							<div class="profile__questionnaire-item-info-list">
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
								<p class="profile__questionnaire-item-info-option">Тематика блога</p>
							</div>
						</div>

						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Регион
							</h2>
							<input type="text" value="Алтайский край, Россия"
									 class="profile__questionnaire-item-info-input">
							<span class="profile__offer-item-info-span">Заполните поле, если ваша реклама привязана к
                                региону.</span>
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Желаемая аудитория
							</h2>
							<div class="main__details-from-to">
								<div class="main__details-from">
									<p class="main__details-text">от</p>
									<div class="main__details-input">
										<input type="tel"
												 class="profile__details-input-small main__details-input-small">
									</div>
								</div>
								<div class="main__details-to">
									<p class="main__details-text">до</p>
									<div class="main__details-input">
										<input type="tel"
												 class="profile__details-input-small main__details-input-small">
									</div>
									<p class="profile__offer-deteilds-text main__details-text">Подписчиков</p>
								</div>
							</div>
							<span class="profile__offer-item-info-span">Заполните поле, если вы знаете сколько
                                должно быть подписчиков у блогера.</span>
						</div>
						<div class="profile__offer-item-button-create profile__questionnaire-item-button-create">
							<button
								class="profile__offer-item-button profile__questionnaire-item-button button-grand-black">
								Создать предложение
							</button>
							<span class="profile__offer-item-info-span">Внимание! Все предложения модерируются. Если
                                предложение не соответствует нашим
                                правилам, администраторы вправе удалить предложение.</span>
						</div>
					</div>
				</div>
			</div>
			<div class="profile__questionnaire-accounts">
				<div class=" profile__questionnaire-accounts-row">
					<div class="profile__questionnaire-accounts-row-title">
						<h2 class="profile__offer-accounts-row-title-h2 profile__questionnaire-accounts-row-title-h2">
							Актуальные предложения работы
						</h2>
					</div>
					<div class="offers__proposal-body">
						<div class="offers__proposal-body-title">
							<div class="offers__title-info">
								<h2 class="offers__info-text">Нужна реклама магазина верхней одежды</h2>
							</div>
							<div class="offers__title-price price-info">
								<p class="offers__price-text ">Желаемый бюджет:</p>
								<span class="offers__price-value">3000 ₽</span>
							</div>
						</div>
						<div class="offers__proposal-item details">
							<div class="offers__proposal-item-info">
								<p class="offers__details-text">Это текст-"рыба", часто используемый в печати и
									вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с
									начала XVI века... Это текст-"рыба", часто используемый в печати и вэб-дизайне.
									Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI
									века...Это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum
									является стандартной "рыбой" для текстов на латинице с начала XVI века...</p>

							</div>
						</div>

						<div class="offers__proposal-item region">
							<div class="offers__proposal-item-info justify-item">
								<div class="offers__proposal-info-text">
									<h2 class="offers__proposal-item-title">
										Вид рекламы:
									</h2>
									<p class="offers__proposal-item-text">
										Тематика блога
									</p>
								</div>
								<div class="offers__proposal-item-button">
									<div class="offers__proposal-item-button-row">

										<div class="offers__title-price price-button">
											<p class="offers__price-text">Желаемый бюджет:</p>
											<span class="offers__price-value">3000 ₽</span>
										</div>
									</div>
									<div class="offers__item-button">
										<button class="button-grand-black big">Удалить предложение</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileProjects',
}
</script>

<style scoped>

</style>
