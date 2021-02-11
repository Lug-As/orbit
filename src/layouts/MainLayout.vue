<template>
	<div>
		<header class="header header__blogers normal-header ">
			<div class="container">
				<div class="header__row normal-row">
					<div class="header__menu-mobile">
						<span class="header__menu-burger"></span>
					</div>
					<div class="header__img">
						<a href="index.html">
							<picture>
								<source srcset="../assets/img/Логотип.webp" type="image/webp">
								<img src="../assets/img/Логотип.png" alt=""></picture>
						</a>
					</div>
					<!-- header__img -->

					<div class="header__menu">
						<ul class="header__menu-ul">
							<li class="header__menu-li ">
								<a href="" class="header__menu-link add-li">Главная</a>
								<ul class="header__menu-drop">
									<li class="header__menu-li ">
										<a href="" class="header__menu-link">Блогеру</a>
									</li>
									<li class="header__menu-li">
										<a href="" class="header__menu-link">Рекламодателю</a>
									</li>
								</ul>
							</li>
							<!-- /.header__menu-li -->
							<li class="header__menu-li">
								<a href="blogers.html" class="header__menu-link">Блогеры</a>
							</li>
							<!-- /.header__menu-li -->
							<li class="header__menu-li">
								<a href="" class="header__menu-link">Рекламные предложения</a>
							</li>
							<!-- /.header__menu-li -->
						</ul>
						<!-- header__menu-ul -->
					</div>
					<!-- header__menu -->
					<div class="header__sign">
						<div class="header__sign-row" style="display: none;">
							<button class="header__menu-sign button-grand">Вход</button>
							<button class="header__menu-sign button-grand">Регистрация</button>
						</div>
						<!-- /.header__sign-row -->
						<div class="header__log-row">
							<ul class="header__log-ul">
								<li class="header__menu-li-left">
									<a href="" class="header__menu-left-link">
										<picture>
											<source srcset="../assets/img/АИ.webp" type="image/webp">
											<img src="../assets/img/АИ.png" alt=""></picture>
									</a>
									<ul class="header__li-left-drop">
										<li class="header__li-nickname">
											<h2 class="header__nickname-text">
												<a href="">_agentgirl_</a>
											</h2>
											<ul class="header__menu-drop width-all">
												<li class="header__drop-li">
													<a href="" class="header__li-link">Личный кабинет</a>
												</li>
												<li class="header__drop-li">
													<a href="" class="header__li-link">Выход</a>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
							<!-- /.header__log-ul -->
						</div>
						<!-- /.header__sign-row -->
					</div>
					<!-- /.header__sign -->
				</div>
				<!-- header__row -->
			</div>
			<!-- container -->
		</header>
		<!-- header -->
		<template>
			<router-view></router-view>
		</template>
		<footer class="footer normal-footer">
			<div class="container">
				<div class="footer__row">
					<div class="footer__img">
						<picture>
							<source srcset="../assets/img/LogoFooter.webp" type="image/webp">
							<img src="../assets/img/LogoFooter.png" alt=""></picture>
					</div>
					<!-- /.footer__img -->
					<div class="footer__menu">
						<ul class="footer__menu-ul">
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Главная</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Блогеры</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Рекламные предложения</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Информация Блогеру</a>
							</li>
							<li class="footer__ul-li">
								<a href="" class="footer__li-link">Рекламодателю</a>
							</li>
						</ul>
						<!-- /.footer__text -->
					</div>
					<!-- /.footer__menu -->
					<div class="footer__rights">
						<div class="footer__rights-contract">
							<a href="" class="footer__li-link">Договор на обработку персональных данных</a>
						</div>
						<!-- /.footer__rights-contract -->
						<div class="footer__rights-right">
							<a href="" class="footer__li-link">Орбита 2021 /©Все права защищены!</a>
						</div>
						<!-- /.footer__rights-right -->
					</div>
					<!-- /.footer__rights -->
				</div>
				<!-- container -->
			</div>
		</footer>
		<!-- footer -->
	</div>
</template>

<script>
export default {
	name: 'MainLayout',
}
</script>

<style scoped>

</style>
