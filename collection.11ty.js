class Test {
	data() {
		return {
			layout: 'modal.njk',
			pagination: {
				data: "collections.artworksCollections",
				size: 1
			},
			permalink: function (data) { return `/collection/${this.slug(data.pagination.items[0].title)}/` }
		};
	}

	render(data) {
		const item = data.pagination.items[0];
		let gallery = `
			<div id="gallery" class="gallery"><!-- data-scaling-ratio="${0}" data-buy-text="${0}" data-request-text="${0}" -->
				<div class="gallery__line">`;
		let newLine = 0;
		const newLineLimit = 290;
		const iteration = item.artworks ? item.artworks.length : -1;
		for (let i = 0; i < iteration; i++) {
			if (newLine > newLineLimit) {
				newLine = 0;
				gallery += `
					</div>
					<div class="gallery__line" > `;
			}
			gallery += `
				<figure
					class="gallery__fig ${i == iteration - 1 && i != 0 && newLine == 0 ? 'gallery__line__item--last' : ''}"
					style="
						aspect-ratio:${item.artworks[i].image.ratio / 100};
						width:${item.artworks[i].image.ratio}px;
						flex:${item.artworks[i].image.ratio};
						flex-basis:${item.artworks[i].image.ratio}px;
						flex-grow:${item.artworks[i].image.ratio};
						flex-shrink:${item.artworks[i].image.ratio};">
					<a href="${data.website.url}/artwork/${this.slug(item.artworks[i].title)}-${item.artworks[i].hash}">
						<img
							onclick="openModalGallery(${i});// fix this later"
							data-title="${item.artworks[i].title}"
							data-href="${data.website.url}/artwork/${this.slug(item.artworks[i].title)}-${item.artworks[i].hash}"
							data-src="${data.website.url}${item.artworks[i].image.large}"
							id="${i}"
							class="gallery__fig__image"
							src="${data.website.url}${item.artworks[i].image.small}">
					</a>
					<a href="${data.website.url}/artwork/${this.slug(item.artworks[i].title)}-${item.artworks[i].hash}">
						<figcaption class="gallery__fig__caption"><p>${item.artworks[i].title}<p></figcaption>
					</a>
				</figure>`
			newLine += item.artworks[i].image.ratio;
		}

		return `
			<div class="introBox">
					${item.description}

				<a class="gallery_button" href="#gallery">
					<div class="arrow_container">
						<div class="arrow"></div>
					</div>
				</a>
			</div>
			
					${gallery}
				</div>
			</div>`;
	}
}

module.exports = Test;