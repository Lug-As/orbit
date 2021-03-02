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
	region
	country
	reference

	constructor(
		id, title, image, followers, likes, ad_types, topics, username,
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
		this.username = username
		this.region = region
		this.country = country

		this.reference = 'https://www.tiktok.com/' + this.title
	}

	static createFromApiData(apiData) {
		return new this(
			apiData.id, apiData.title, apiData.image, apiData.followers, apiData.likes, apiData.ad_types, apiData.topics,
			apiData.user.name, apiData.about, apiData.ages, apiData.gallery, apiData.region.name,
			apiData.region.country.name,
		)
	}

	static createFromShortApiData(apiData) {
		return new this(
			apiData.id, apiData.title, apiData.image, apiData.followers, apiData.likes, apiData.ad_types,
			apiData.topics, apiData.user.name,
		)
	}
}
