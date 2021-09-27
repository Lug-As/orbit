<template>
	<main class="lending">
		<section class="benefits">
			<div class="container">
				<div class="benefits__title">
					<h2 class="benefits__title-h2">
						ПРЕИМУЩЕСТВА РАБОТЫ С НАМИ:
					</h2>
				</div>
				<div class="benefits__row">
					<div class="benefits__row-body">
						<div class="benefits__row-body-item">
							<div class="benefits__row-body-item-info">
								<h2 class="benefits__row-body-item-info-title-h2">
									Бесплатно
								</h2>
								<p class="benefits__row-body-item-info-title-p">
									Орбита не берет комиссию со сделки.
								</p>
							</div>
							<div class="benefits__row-body-item-info">
								<h2 class="benefits__row-body-item-info-title-h2">
									Конфиденциально
								</h2>
								<p class="benefits__row-body-item-info-title-p">
									Ваши контакты получают только те пользователи, чьи предложения Вам стали интересны.
								</p>
							</div>
						</div>
						<div class="benefits__row-body-item">
							<div class="benefits__row-body-item-info">
								<h2 class="benefits__row-body-item-info-title-h2">
									Выгодно
								</h2>
								<p class="benefits__row-body-item-info-title-p">
									Цены услуг блогеров прозрачны, а бюджет заявки рекламодателя заранее известен.
								</p>
							</div>
							<div class="benefits__row-body-item-info">
								<h2 class="benefits__row-body-item-info-title-h2">
									Удобно
								</h2>
								<p class="benefits__row-body-item-info-title-p">
									Фильтры помогут Вам самостоятельно выбрать блогера или предложение рекламодателя по его
									местоположению, интересам, возрасту его аудитории и т. д.
								</p>
							</div>
						</div>
						<div class="benefits__row-body-item">
							<div class="benefits__row-body-item-info">
								<h2 class="benefits__row-body-item-info-title-h2">
									Просто
								</h2>
								<p class="benefits__row-body-item-info-title-p">
									Рекламодателю достаточно разместить свое предложение, а блогеру — анкету. Вы найдете
									подходящего контрагента очень быстро.
								</p>
							</div>
							<div class="benefits__row-body-item-info">
								<h2 class="benefits__row-body-item-info-title-h2">
									Взаимно
								</h2>
								<p class="benefits__row-body-item-info-title-p">
									Предлагайте другим блогерам взаимопиар и увеличивайте свои аудитории.
								</p>
							</div>
						</div>
					</div>
					<div class="benefits__img">
						<picture>
							<source srcset="../assets/img/planet.webp" type="image/webp">
							<img src="../assets/img/planet.png" alt=""></picture>
					</div>
				</div>
				<div class="benefits__button-reg">
					<button @click="$emit('show-sign')" class="button-grand-black big">Зарегистрироваться</button>
				</div>
			</div>
			<span class="benefits__circle">
        </span>
		</section>
		<section class="target">
			<div class="container">
				<div class="target__text">
					<h2 class="target__text-title">НАША ЦЕЛЬ</h2>
				</div>
				<div class="target__circles">
					<div class="target__circles-row">
						<div class="target__circle-item">
							<div class="target__circle blog">
								<div class="target__circle-row blog-row">
									<h2 class="target__circle-title">БЛОГЕР</h2>
									<p class="target__circle-text">
										Начните зарабатывать прямо сейчас, разместив свою анкету блогера или выбрав уже
										имеющиеся задачи в рекламных предложениях.
									</p>
								</div>
							</div>
						</div>
						<div class="target__circle-item">
							<div class="target__circle profit ">
								<div class="target__circle-row profit-row">
									<h2 class="target__circle-title">ПРИБЫЛЬ</h2>
									<p class="target__circle-text">
										Каждый получает свою выгоду: <br>блогер — доход, <br>бизнес — узнаваемость и покупателей.
									</p>
								</div>
							</div>
						</div>
						<div class="target__circle-item">
							<div class="target__circle business">
								<div class="target__circle-row business-row">
									<h2 class="target__circle-title">БИЗНЕС</h2>
									<p class="target__circle-text">
										Получайте просмотры и покупателей уже сегодня, разместив лишь рекламные предложения
										или выбрав блогеров для сотрудничества, которые самостоятельно придумают креативную
										сторону задачи.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="target__planet-row">
				<div class="target__planet">
					<picture>
						<source srcset="../assets/img/Планета.webp" type="image/webp">
						<img class="target__planet-img" src="../assets/img/Планета.png" alt=""></picture>
				</div>
				<div class="target__planet">
					<picture>
						<source srcset="../assets/img/Юпитер.webp" type="image/webp">
						<img class="target__planet-img" src="../assets/img/Юпитер.png" alt=""></picture>
				</div>
			</div>
		</section>
		<section id="instruction" class="instruction">
			<div class="container">
				<div class="instruction__title">
					<h2 class="instruction__title-h2">ИНСТРУКЦИЯ РЕКЛАМОДАТЕЛЮ</h2>
				</div>
				<div class="instruction__row">
					<div class="instruction__row-img">
						<picture>
							<source srcset="../assets/img/КосмонавтРекломадатель.webp" type="image/webp">
							<img src="../assets/img/КосмонавтРекломадатель.png" alt=""></picture>
					</div>
					<div class="instruction__row-body">
						<div class="instruction__row-body-text">
							<div class=" instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">1</span>
							</div>
							<p class=" instruction__row-body-text-p">Пройдите регистрацию на платформе и подтвердите свою
								электронную почту.</p>
						</div>
						<div class="instruction__row-body-text">
							<div class=" instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">2</span>
							</div>
							<p class=" instruction__row-body-text-p">В личном кабинете откройте раздел «Разместить рекламное
								предложение» и опишите задачу, которую Вам необходимо выполнить.</p>
						</div>
						<div class="instruction__row-body-text">
							<div class=" instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">3</span>
							</div>
							<p class=" instruction__row-body-text-p">Когда кто-то из блогеров отзовётся, Вы получите письмо
								на почту и уведомление в личном кабинете. Если блогер Вам подходит, нажимайте на кнопку
								«Смотреть контакты» и связывайтесь с ним.</p>
						</div>
						<div class="instruction__row-body-text">
							<div class=" instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">4</span>
							</div>
							<p class=" instruction__row-body-text-p">В разделе «Блогеры» Вы также можете выбрать подходящих
								блогеров и отправить им предложения для сотрудничества. Если блогеру станет интересно Ваше
								предложение, он обязательно свяжется с Вами по контактам, которые Вы указывали при
								регистрации.</p>
						</div>

						<div class="instruction__row-body-text">
							<div class="instruction__row-body-text-number">
								<span class="instruction__row-body-text-span"></span>
							</div>
							<button @click="$emit('show-sign')" class="button-grand-black big">Зарегистрироваться</button>
						</div>
					</div>
				</div>
			</div>
			<span class="benefits__circle right-circle pink-circle big-circle">
        </span>
			<span class="benefits__circle top-right-circle ">
        </span>
			<span class="benefits__circle bottom-right-circle small">
        </span>
		</section>
		<section id="instruction__bloger" class="instruction instruction__bloger">
			<div class="container">
				<div class="instruction__title">
					<h2 class="instruction__title-h2">ИНСТРУКЦИЯ БЛОГЕРУ</h2>
				</div>
				<div class="instruction__row-left instruction__row">
					<div class="instruction__row-img-left instruction__row-img">
						<picture>
							<source srcset="../assets/img/КосмонавтБлогер.webp" type="image/webp">
							<img src="../assets/img/КосмонавтБлогер.png" alt=""></picture>
					</div>
					<div class="instruction__row-body-left instruction__row-body">
						<div class="instruction__row-body-text-left instruction__row-body-text">
							<div class="instruction__row-body-text-number-left instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">1</span>
							</div>
							<p class="instruction__row-body-text-p-left instruction__row-body-text-p">Пройдите регистрацию
								на платформе и подтвердите свою электронную почту.</p>
						</div>
						<div class="instruction__row-body-text-left instruction__row-body-text">
							<div class="instruction__row-body-text-number-left instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">2</span>
							</div>
							<p class="instruction__row-body-text-p-left instruction__row-body-text-p">В личном кабинете
								откройте раздел «Разместить анкету блогера» и создайте свою персональную анкету, чтобы все
								рекламодатели видели Вас на нашем сайте и могли отправить Вам свое предложение.</p>
						</div>
						<div class="instruction__row-body-text-left instruction__row-body-text">
							<div class="instruction__row-body-text-number-left instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">3</span>
							</div>
							<p class="instruction__row-body-text-p-left instruction__row-body-text-p">Когда кто-то из
								рекламодателей отреагирует на Вашу анкету, Вы получите письмо на почту и уведомление в
								личном кабинете. Если предложение Вам интересно, нажимайте на кнопку «Смотреть контакты» и
								связывайтесь с рекламодателем.</p>
						</div>
						<div class="instruction__row-body-text-left instruction__row-body-text">
							<div class="instruction__row-body-text-number-left instruction__row-body-text-number">
								<span class="instruction__row-body-text-span">4</span>
							</div>
							<p class="instruction__row-body-text-p-left instruction__row-body-text-p">В разделе «Рекламные
								предложения» Вы также можете выбрать подходящую задачу рекламодателя и отправить свои
								данные. Если Ваш профиль соответствует рекламной кампании, с Вами свяжутся по указанным при
								регистрации контактам.</p>
						</div>

						<div class="instruction__row-body-text-left instruction__row-body-text">
							<div class="instruction__row-body-text-number-left instruction__row-body-text-number">
								<span class="instruction__row-body-text-span"></span>
							</div>
							<a @click.prevent="$emit('show-sign')" href="/" class="instruction__button-reg-link-left">
								<button class="button-grand-first big">Зарегистрироваться</button>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="target__planet-row">
				<div class="target__planet planet-right-top">
					<picture>
						<source srcset="../assets/img/Планета.webp" type="image/webp">
						<img class="target__planet-img" src="../assets/img/Планета.png" alt=""></picture>
				</div>
				<div class="target__planet planet-left-center">
					<picture>
						<source srcset="../assets/img/Юпитер.webp" type="image/webp">
						<img class="target__planet-img" src="../assets/img/Юпитер.png" alt=""></picture>
				</div>
			</div>
		</section>
		<section class="team">
			<div class="container">
				<div class="team__title">
					<h2 class="team__title-h2">
						КОМАНДА
					</h2>
				</div>
				<div class="team__row">
					<div class="team__row-item">
						<a target="_blank" rel="noopener" href="https://www.instagram.com/markberozkin/">
							<div class="team__row-item-img">
								<picture>
									<source srcset="../assets/img/Марк.webp" type="image/webp">
									<img src="../assets/img/Марк.png" alt="">
								</picture>
							</div>
						</a>
						<div class="team__row-item-text">
							<div class="team__row-item-text-title">
								<h2 class="team__row-item-text-title-h2">Марк Берёзкин</h2>
							</div>
							<div class="team__row-item-text-info">
								<p class="team__row-item-text-info-p">
									Instagram: <a target="_blank" rel="noopener"
													  href="https://www.instagram.com/markberozkin/">@markberozkin</a><br>
									CEO и основатель проекта
								</p>
							</div>
						</div>
					</div>
					<div class="team__row-item">
						<a target="_blank" rel="noopener" href="https://www.instagram.com/mr_guitarix/">
							<div class="team__row-item-img">
								<picture>
									<source srcset="../assets/img/Богдан.webp" type="image/webp">
									<img src="../assets/img/Богдан.png" alt="">
								</picture>
							</div>
						</a>
						<div class="team__row-item-text">
							<div class="team__row-item-text-title">
								<h2 class="team__row-item-text-title-h2">Скалиуш Богдан</h2>
							</div>
							<div class="team__row-item-text-info">
								<p class="team__row-item-text-info-p">
									Instagram: <a target="_blank" rel="noopener"
													  href="https://www.instagram.com/mr_guitarix/">@mr_guitarix</a><br>
									Project-Manager
								</p>
							</div>
						</div>
					</div>
					<div class="team__row-item">
						<a target="_blank" rel="noopener" href="https://www.instagram.com/web.witcher/">
							<div class="team__row-item-img">
								<picture>
									<source srcset="../assets/img/Артем.webp" type="image/webp">
									<img src="../assets/img/Артем.png" alt=""></picture>
							</div>
						</a>
						<div class="team__row-item-text">
							<div class="team__row-item-text-title">
								<h2 class="team__row-item-text-title-h2">Скалиуш Артём</h2>
							</div>
							<div class="team__row-item-text-info">
								<p class="team__row-item-text-info-p">
									Instagram: <a target="_blank" rel="noopener"
													  href="https://www.instagram.com/web.witcher/">@web.witcher</a><br>
									разработчик проекта
								</p>
							</div>
						</div>
					</div>
					<div class="team__row-item">
						<a target="_blank" rel="noopener" href="https://www.instagram.com/kolimedovkin_/">
							<div class="team__row-item-img">
								<picture>
									<source srcset="../assets/img/Коля.webp" type="image/webp">
									<img src="../assets/img/Коля.png" alt="">
								</picture>
							</div>
						</a>
						<div class="team__row-item-text">
							<div class="team__row-item-text-title">
								<h2 class="team__row-item-text-title-h2">Николай Медовкин</h2>
							</div>
							<div class="team__row-item-text-info">
								<p class="team__row-item-text-info-p">
									Instagram: <a target="_blank" rel="noopener"
													  href="https://www.instagram.com/kolimedovkin_/">@kolimedovkin_</a><br>
									дизайнер проекта
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Main',
	title: 'Главная',
}
</script>
