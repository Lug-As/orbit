<template>
	<div class="profile__questionnaire-accounts-body">
		<template v-if="notice.is_approved">
			<h2>Поздравляем!</h2>
			<p>Ваш аккаунт <strong>{{ notice.name }}</strong> успешно подтвержден и помещен на сайт.</p>
			<button
				@click="deleteRequest(notice.id)"
				class="profile__questionnaire-accounts-button button-grand-black"
			>
				Спасибо
			</button>
		</template>
		<template v-else>
			<div class="profile__questionnaire-accounts-item">
				<div class="profile__questionnaire-accounts-item-avatar">
					<div class="profile__questionnaire-accounts-item-avatar-img">
						<img :src="notice.image" :alt="notice.title">
					</div>
					<button
						@click="deleteRequest(notice.id)"
						class="profile__questionnaire-accounts-item-avatar-delete"
					>
						Удалить заявку
					</button>
				</div>
				<div class="profile__questionnaire-accounts-body-info">
					<div class="profile__questionnaire-accounts-item-info title">
						<h2
							class="profile__questionnaire-accounts-item-info-title-h2"
						>
							{{ notice.name }}
						</h2>
						<a
							:href="'https://www.tiktok.com/' + notice.name"
							target="_blank"
							rel="noopener"
							class="profile__questionnaire-accounts-item-info-title-link"
						>
							Перейти в Тик-Ток аккаунт
						</a>
					</div>
					<div class="profile__questionnaire-accounts-item-info theme">
						<div class="profile__questionnaire-accounts-item-info-h2">
							Тема канала:
						</div>
						<div class="profile__questionnaire-accounts-item-info-p">
							{{ notice.topics | slashedList }}
						</div>
					</div>
					<div class="profile__questionnaire-accounts-item-info advertising">
						<h2 class="profile__questionnaire-accounts-item-info-h2">Вид / Цена рекламы:</h2>
						<ul class="profile__questionnaire-accounts-item-info-ul">
							<li
								v-for="type in notice.ad_types"
								:key="type.id"
								class="profile__questionnaire-accounts-item-info-li"
							>
								{{ type.name }} - {{ type.price ? `${type.price} ₽` : 'Договорная' }}
							</li>
						</ul>
					</div>
					<div class="profile__questionnaire-accounts-item-info confirmation">
						<picture>
							<source srcset="../../assets/img/notcomfirt.webp" type="image/webp">
							<img src="../../assets/img/notcomfirt.png" alt=""></picture>
						<p class="profile__questionnaire-accounts-item-info-p accounts-item-info-p-red">
							Ваша заявка отклонена.
							<template v-if="notice.fail_msg">
								Причина: <br>
								<span>{{ notice.fail_msg }}</span>
							</template>
						</p>
					</div>
				</div>
			</div>
			<div class="profile__questionnaire-accounts-buttons">
				<a
					:href="'https://www.tiktok.com/' + notice.name"
					target="_blank"
					rel="noopener"
					class="profile__questionnaire-accounts-button button-grand-black"
				>
					Перейти в Тик-Ток аккаунт
				</a>
				<button
					@click="deleteRequest(notice.id)"
					class="profile__questionnaire-accounts-button button-grand-transparent"
				>
					Удалить заявку
				</button>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'ProfileRequestNotice',
	props: ['notice'],
	methods: {
		deleteRequest(id) {
			this.$store.dispatch('removeRequest', {id})
		},
	},
}
</script>
