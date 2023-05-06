class ChapterList {
	data() {
		return {
			layout: 'home.njk',
			permalink: function (data) { return `/` }// { return `/collection/` }
		};
	}

	render(data) {
		let chapters = '';
		for (let i = 0; i < data.collections.artworksCollections.length; i++) {
			chapters += `
	<section class="chapter" ${i == 0 ? 'id="chapters"' : ''}>
		<img class="chapter__background" src="${data.website.url}${data.collections.artworksCollections[i].background}">
		<a class="chapter__title" href="${data.website.url}/collection/${this.slug(data.collections.artworksCollections[i].title)}/"> 
			<h2 class="chapter__title__text --underline">${data.collections.artworksCollections[i].title}</h2>
			<!-- div class="chapter__title__underline"></div -->
		</a>
	</section>`;
		}
		return `
<main class="chapterList">

	<section class="chapter">
		<img class="chapter__background" src="${data.website.url}/includes/assets/images/lichta-full.jpg">
		<a class="chapter__title" href="${data.website.url}/bio/"> 
			<h2 class="chapter__title__text --underline">ARTISTE PEINTRE CONTEMPORAIN</h2>
			<!-- div class="chapter__title__underline"></div -->
		</a>
	</section>
	${chapters}
</main>`
	}
}


module.exports = ChapterList;