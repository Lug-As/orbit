export default class Account {
	id
	title
	about
	image
	followers
	likes
	ad_types
	ages
	gallery
	topics
	username
	user_id
	region
	country
	reference

	constructor(
		id, title, image, followers, likes, ad_types, topics, user,
		about = null, ages = null, gallery = null, region = null, country = null,
	) {
		this.id = id
		this.title = title
		this.about = about
		this.image = image
		this.followers = followers
		this.likes = likes
		this.ad_types = ad_types
		this.ages = ages
		this.gallery = gallery
		this.topics = topics
		this.region = region
		this.country = country
		this.username = user.name
		this.user_id = user.id

		this.reference = 'https://www.tiktok.com/' + this.title
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.title, apiData.image, apiData.followers, apiData.likes, apiData.ad_types, apiData.topics,
			apiData.user, apiData.about, apiData.ages, apiData.gallery, apiData.region?.name,
			apiData.region?.country.name,
		)
	}

	static createFromShortApiData(apiData) {
		return new this(
			apiData.id, apiData.title, apiData.image, apiData.followers, apiData.likes, apiData.ad_types,
			apiData.topics, apiData.user,
		)
	}
}
