<template>
	<div class="profile__questionnaire profile__contant tab-3">
		<div class=" profile__questionnaire-row">
			<div class="profile__questionnaire-create">
				<button class="profile__questionnaire-create-button button-grand-black">
					<picture>
						<source srcset="../assets/img/plus-create.webp" type="image/webp">
						<img src="../assets/img/plus-create.png" alt=""></picture>
					Создать анкету
				</button>
			</div>
			<div class="profile__questionnaire-body">
				<div class="profile__questionnaire-body-row">
					<div class="profile__questionnaire-avatar">
						<div class="profile__questionnaire-img">
							<picture>
								<source srcset="../assets/img/noneimg.webp" type="image/webp">
								<img src="../assets/img/noneimg.png" alt=""></picture>
						</div>
						<div class="profile__questionnaire-load">
							<label class="profile__questionnaire-load-button">
								<input type="file" style="display:none">
								Загрзить фото
							</label>
						</div>
					</div>
					<div class="profile__questionnaire-item">
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Впишите название аккаунта
							</h2>
							<input type="text" class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Тематика блога
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
								Виды рекламы
							</h2>
							<div class="profile__questionnaire-item-info-select">
								<p class="profile__questionnaire-item-info-option select">Реклама услуги/товары</p>
							</div>
							<div class="profile__questionnaire-item-info-list">
								<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
								<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
								<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
								<p class="profile__questionnaire-item-info-option">Реклама услуги/товары</p>
							</div>
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Цена на виды рекламы
							</h2>
							<input type="text" value="15 000 / Рекламный пост"
									 class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								О себе
							</h2>
							<textarea
								class="profile__questionnaire-item-info-textarea">15 000 / Рекламный пост</textarea>
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Возрастные категории аудитории
							</h2>
							<input type="text" value="16 - 50 / 18 - 40 / 99 - 100"
									 class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-info">
							<h2 class="profile__questionnaire-item-info-h2">
								Субъект РФ
							</h2>
							<input type="text" value="Алтайский край, Россия"
									 class="profile__questionnaire-item-info-input">
						</div>
						<div class="profile__questionnaire-item-button-create">
							<button class="profile__questionnaire-item-button button-grand-black">Отправить
								анкету
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="profile__questionnaire-accounts">
				<div class=" profile__questionnaire-accounts-row">
					<div class="profile__questionnaire-accounts-row-title">
						<h2 class="profile__questionnaire-accounts-row-title-h2">
							Существующие аккаунты
						</h2>
					</div>
					<div class="profile__questionnaire-accounts-body">
						<div class="profile__questionnaire-accounts-item">
							<div class="profile__questionnaire-accounts-item-number">
                                <span class="profile__questionnaire-accounts-item-number-span">
                                    1
                                </span>
							</div>
							<div class="profile__questionnaire-accounts-item-avatar">
								<div class="profile__questionnaire-accounts-item-avatar-img">
									<picture>
										<source srcset="../assets/img/АИ.webp" type="image/webp">
										<img src="../assets/img/АИ.png" alt=""></picture>
								</div>
								<button class="profile__questionnaire-accounts-item-avatar-delete">Удалить
									аккаунт
								</button>
							</div>
							<div class="profile__questionnaire-accounts-body-info">
								<div class="profile__questionnaire-accounts-item-info title">
									<h2 class="profile__questionnaire-accounts-item-info-title-h2">
										@_agentgirl_
									</h2>
									<a href="" class="profile__questionnaire-accounts-item-info-title-link">
										Перейти в ток-ток аккаунт
									</a>
								</div>
								<div class="profile__questionnaire-accounts-item-info subscribe">
									<p class="profile__questionnaire-accounts-item-info-p">5.6M подписчиков / 10М
										лайков.
									</p>
								</div>
								<div class="profile__questionnaire-accounts-item-info theme">
									<div class="profile__questionnaire-accounts-item-info-h2">
										Тема канала:
									</div>
									<div class="profile__questionnaire-accounts-item-info-p">
										Путешествия / Развлечения / Видео.
									</div>
								</div>
								<div class="profile__questionnaire-accounts-item-info advertising">
									<h2 class="profile__questionnaire-accounts-item-info-h2">Вид / Цена рекламы:
									</h2>
									<ul class="profile__questionnaire-accounts-item-info-ul">
										<li class="profile__questionnaire-accounts-item-info-li">
											Реклама услуги/товары - от 10 000 руб.;
										</li>
										<li class="profile__questionnaire-accounts-item-info-li">
											Реклама профиля - договорная;
										</li>
										<li class="profile__questionnaire-accounts-item-info-li">
											Особые рекламные условия - 50 000 руб.
										</li>
									</ul>
								</div>
								<div class="profile__questionnaire-accounts-item-info confirmation">
									<picture>
										<source srcset="../assets/img/comfirt.webp" type="image/webp">
										<img src="../assets/img/comfirt.png" alt=""></picture>
									<p class="profile__questionnaire-accounts-item-info-p">Ваш аккаунт успешно
										подтвержден!</p>
								</div>
							</div>
						</div>
						<div class="profile__questionnaire-accounts-buttons">
							<button class="profile__questionnaire-accounts-button button-grand-black">Перейти в
								тик-ток аккаунт
							</button>
							<button class="profile__questionnaire-accounts-button button-grand-transparent">Удалить
								аккаунт
							</button>
						</div>
					</div>
					<div class="profile__questionnaire-accounts-body">
						<div class="profile__questionnaire-accounts-item">
							<div class="profile__questionnaire-accounts-item-number">
                                <span class="profile__questionnaire-accounts-item-number-span">
                                    1
                                </span>
							</div>
							<div class="profile__questionnaire-accounts-item-avatar">
								<div class="profile__questionnaire-accounts-item-avatar-img">
									<picture>
										<source srcset="../assets/img/АИ.webp" type="image/webp">
										<img src="../assets/img/АИ.png" alt=""></picture>
								</div>
								<button class="profile__questionnaire-accounts-item-avatar-delete">Удалить
									аккаунт
								</button>
							</div>
							<div class="profile__questionnaire-accounts-body-info">
								<div class="profile__questionnaire-accounts-item-info title">
									<h2 class="profile__questionnaire-accounts-item-info-title-h2">
										@_agentgirl_
									</h2>
									<a href="" class="profile__questionnaire-accounts-item-info-title-link">
										Перейти в ток-ток аккаунт
									</a>
								</div>
								<div class="profile__questionnaire-accounts-item-info subscribe">
									<p class="profile__questionnaire-accounts-item-info-p">5.6M подписчиков / 10М
										лайков.
									</p>
								</div>
								<div class="profile__questionnaire-accounts-item-info theme">
									<div class="profile__questionnaire-accounts-item-info-h2">
										Тема канала:
									</div>
									<div class="profile__questionnaire-accounts-item-info-p">
										Путешествия / Развлечения / Видео.
									</div>
								</div>
								<div class="profile__questionnaire-accounts-item-info advertising">
									<h2 class="profile__questionnaire-accounts-item-info-h2">Вид / Цена рекламы:
									</h2>
									<ul class="profile__questionnaire-accounts-item-info-ul">
										<li class="profile__questionnaire-accounts-item-info-li">
											Реклама услуги/товары - от 10 000 руб.;
										</li>
										<li class="profile__questionnaire-accounts-item-info-li">
											Реклама профиля - договорная;
										</li>
										<li class="profile__questionnaire-accounts-item-info-li">
											Особые рекламные условия - 50 000 руб.
										</li>
									</ul>
								</div>
								<div class="profile__questionnaire-accounts-item-info confirmation">
									<picture>
										<source srcset="../assets/img/comfirt.webp" type="image/webp">
										<img src="../assets/img/comfirt.png" alt=""></picture>
									<p class="profile__questionnaire-accounts-item-info-p">Ваш аккаунт успешно
										подтвержден!</p>
								</div>
							</div>
						</div>
						<div class="profile__questionnaire-accounts-buttons">
							<button class="profile__questionnaire-accounts-button button-grand-black">Перейти в
								тик-ток аккаунт
							</button>
							<button class="profile__questionnaire-accounts-button button-grand-transparent">Удалить
								аккаунт
							</button>
						</div>
					</div>
					<div class="profile__questionnaire-accounts-body">
						<div class="profile__questionnaire-accounts-item">
							<div class="profile__questionnaire-accounts-item-number">
                                <span class="profile__questionnaire-accounts-item-number-span">
                                    1
                                </span>
							</div>
							<div class="profile__questionnaire-accounts-item-avatar">
								<div class="profile__questionnaire-accounts-item-avatar-img">
									<picture>
										<source srcset="../assets/img/noneimg.webp" type="image/webp">
										<img src="../assets/img/noneimg.png" alt=""></picture>
								</div>
								<button class="profile__questionnaire-accounts-item-avatar-delete">Удалить
									аккаунт
								</button>
							</div>
							<div class="profile__questionnaire-accounts-body-info">
								<div class="profile__questionnaire-accounts-item-info title">
									<h2 class="profile__questionnaire-accounts-item-info-title-h2">
										@_agentgirl_
									</h2>
									<a href="" class="profile__questionnaire-accounts-item-info-title-link">
										Перейти в ток-ток аккаунт
									</a>
								</div>
								<div class="profile__questionnaire-accounts-item-info subscribe">
									<p class="profile__questionnaire-accounts-item-info-p">5.6M подписчиков / 10М
										лайков.
									</p>
								</div>
								<div class="profile__questionnaire-accounts-item-info theme">
									<div class="profile__questionnaire-accounts-item-info-h2">
										Тема канала:
									</div>
									<div class="profile__questionnaire-accounts-item-info-p">
										Путешествия / Развлечения / Видео.
									</div>
								</div>
								<div class="profile__questionnaire-accounts-item-info advertising">
									<h2 class="profile__questionnaire-accounts-item-info-h2">Вид / Цена рекламы:
									</h2>
									<ul class="profile__questionnaire-accounts-item-info-ul">
										<li class="profile__questionnaire-accounts-item-info-li">
											Реклама услуги/товары - от 10 000 руб.;
										</li>
										<li class="profile__questionnaire-accounts-item-info-li">
											Реклама профиля - договорная;
										</li>
										<li class="profile__questionnaire-accounts-item-info-li">
											Особые рекламные условия - 50 000 руб.
										</li>
									</ul>
								</div>
								<div class="profile__questionnaire-accounts-item-info confirmation">
									<picture>
										<source srcset="../assets/img/notcomfirt.webp" type="image/webp">
										<img src="../assets/img/notcomfirt.png" alt=""></picture>
									<p class="profile__questionnaire-accounts-item-info-p accounts-item-info-p-red ">Для
										того, чтобы подтвердить
										аккаунт, вам необходимо
										написать в директ аккаунта тик-ток (ссылка на тик-ток
										аккаунт) текст "Привет, подтверди меня на сайте <a href="">tiktokOrbita.ru</a>"
									</p>
								</div>
							</div>
						</div>
						<div class="profile__questionnaire-accounts-buttons">
							<button class="profile__questionnaire-accounts-button button-grand-black">Перейти в
								тик-ток аккаунт
							</button>
							<button class="profile__questionnaire-accounts-button button-grand-transparent">Удалить
								аккаунт
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileAccounts',
}
</script>

<style scoped>

</style>
