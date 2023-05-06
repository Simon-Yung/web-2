class Test {
	data() {
		return {
			layout: 'blank.njk',
			pagination: {
				data: "collections.artworks",
				size: 1
			},
			permalink: function (data) { return `/artwork/${this.slug(data.pagination.items[0].title)}-${data.pagination.items[0].hash}/` }
		};
	}

	render(data) {

		const item = data.pagination.items[0];

		let buy = '';
		if (!item.link) {
			buy += `
				<div class="buyButton">
					<span class="buyButton__price">
						${Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price)}
					</span>
				</div>`;
		} else {
			buy += `
				<div class="buyButton">
				<a class="buyButton__inner --underline" href="${item.link}" target="${'_blank'}">
					<span class="buyButton__price buy__button__price--icon">
						${Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price)}
					</span>
					<span class="buyButton__link"> - ${item.link.replace(/https?:\/\/(www.)?/i, 'www.').replace(/\/.*$/, '')}</span>
				</a>
				<!-- div class="buyButton__underline"></div -->
				</div>`
		}

		return `
			<div class="introBox">
				<span class="breadCrumbs"><a class="--underline" href="${data.website.url}/#">Lichta</a> > <a class="--underline" href="${data.website.url}/#chapters">Collections</a> > <a class="--underline" href="#">${item.title}</a></span>
				<h2>${item.title}</h2>
				<!-- <hr/> -->
				${item.description}
				${buy}
			</div>
			<img class="main__image" src="${data.website.url}${item.image.full}">`;
	}
}

module.exports = Test;