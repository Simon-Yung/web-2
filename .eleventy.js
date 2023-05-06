// const fg = require('fast-glob');
const Image = require("@11ty/eleventy-img");
const yaml = require("js-yaml");
const fs = require('fs');
const md = require('markdown-it')();
const outputDir = 'docs';

// function searchByGlob(glob) {
// 	//this function DOES NOT return the initial / slash 
// 	// YOU NEED to add it in the layout file
// 	return fg.sync(glob);
// }

module.exports = function (eleventyConfig) {

	// const galleries = fg.sync('gallery/*', { onlyDirectories: true, deep: 0, dot: false });

	// create a collection from the images in each /gallery/**/_img/ folder
	// for (let i = 0; i < galleries.length; i++) {
	// 	eleventyConfig.addCollection(
	// 		galleries[i].slice(8),
	// 		() => {
	// 			const imagesInGallery = fg.sync(`${galleries[i]}/_img/*.???`);
	// 			for (let j = 0; j < imagesInGallery.length; j++) {
	// 				imagesInGallery[j] = `/${imagesInGallery[j]}`;
	// 			}
	// 			return imagesInGallery;
	// 		}
	// 	);
	// }


	const yamlData = yaml.load(fs.readFileSync('./_data/collectionData.yml', 'utf8'));
	const ArtworkMap = new Map();
	let artworks = [];
	let artworksCollections = [];

	const iterations = yamlData ? yamlData.length : -1;
	for (let i = 0; i < iterations; i++) {
		try {
			Image(
				`./_img/${yamlData[i]['collection arrière plan']}`,
				{ widths: [1200], formats: ['jpeg'], outputDir: `./${outputDir}/img/` }
			);
			let backgroundUrl = Image.statsSync(
				`./_img/${yamlData[i]['collection arrière plan']}`,
				{ widths: [1200], formats: ['jpeg'], outputDir: `./${outputDir}/img/` }
			).jpeg[0].url;
			artworksCollections.push(
				{
					title: yamlData[i]['collection title'],
					description: md.render(yamlData[i]['collection description']),
					background: backgroundUrl,
					artworks: [],
				}
			);
		} catch (e) {
			console.log(e)
			artworksCollections.push(
				{
					title: yamlData[i]['collection title'],
					description: md.render(yamlData[i]['collection description']),
					// background: backgroundUrl,
					artworks: [],
				});
		}
		const iterations = yamlData[i]['collection artworks'] ? yamlData[i]['collection artworks'].length : -1;
		for (let j = 0; j < iterations; j++) {
			try {
				// (async () => {
				// 	let imgData =
				// 		await Image(
				// 			`./_img/${yamlData[i]['collection artworks'][j]['artworks file name']}`,
				// 			{ widths: [400, 1000, 'auto'], formats: ['jpeg'], outputDir: `./${outputDir}/img/` }
				// 		);
				// 	imgData.jpeg.sort((a, b) => a.width - b.width);
				// 	const entry = {
				// 		...yamlData[i]['collection artworks'][j],
				// 		url: {
				// 			'small': imgData.jpeg[0].url,
				// 			'large': imgData.jpeg[1].url,
				// 			'full': imgData.jpeg[2].url,
				// 		}
				// 	}
				// 	artworks.push(entry);
				// 	artworksCollections[i].artworks.push(entry);
				// })();

				Image(
					`./_img/${yamlData[i]['collection artworks'][j]['artworks file name']}`,
					{ widths: [600, 1000, 'auto'], formats: ['jpeg'], outputDir: `./${outputDir}/img/` }
				);
				let metaData = Image.statsSync(
					`./_img/${yamlData[i]['collection artworks'][j]['artworks file name']}`,
					{ widths: [600, 1000, 'auto'], formats: ['jpeg'], hashLength: 10, outputDir: `./${outputDir}/img/` }
				);
				metaData.jpeg.sort((a, b) => a.width - b.width);
				const hash = metaData.jpeg[1].filename.slice(0, 10);
				// if (metaData.jpeg[2] === undefined) { console.log(`./_img/${yamlData[i]['collection artworks'][j]['artworks file name']}`, metaData) }
				const entry = {
					hash: hash,
					//url: `/artwork/${this.slug(yamlData[i]['collection artworks'][j]['artworks title'])}-${hash}`,
					title: yamlData[i]['collection artworks'][j]['artworks title'],
					description: md.render(yamlData[i]['collection artworks'][j]['artworks description']),
					price: yamlData[i]['collection artworks'][j]['artworks price'],
					link: yamlData[i]['collection artworks'][j]['artworks link'],
					image: {
						'ratio': (metaData.jpeg[0].width) / (metaData.jpeg[0].height) * 100,
						'small': metaData.jpeg[0].url,
						'large': metaData.jpeg[1] ? metaData.jpeg[1].url : metaData.jpeg[0].url,
						'full': metaData.jpeg[2] ? metaData.jpeg[2].url : metaData.jpeg[1] ? metaData.jpeg[1].url : metaData.jpeg[0].url,
					}
				};
				artworksCollections[i].artworks.push(entry);
				if (!ArtworkMap.has(hash)) {
					ArtworkMap.set(hash, 0);
					artworks.push(entry);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
	ArtworkMap.clear();

	eleventyConfig.addCollection('artworks', () => artworks); // console.log(artworks);
	eleventyConfig.addCollection('artworksCollections', () => artworksCollections); // console.log(artworksCollections);

	// for (let i = 0; i < artworksCollections.length; i++) {
	// 	eleventyConfig.addCollection(artworksCollections[i].title.toLowerCase().replaceAll(' ', ''), () => artworksCollections[i].artworks);
	// }

	eleventyConfig.addDataExtension("yaml,yml", contents => yaml.load(contents));

	//pass through copy for css javascript and internal images
	eleventyConfig.addPassthroughCopy({ "_includes/assets": "includes/assets" });
	// eleventyConfig.addPassthroughCopy({ "gallery": "gallery" });
	// eleventyConfig.addPassthroughCopy({ "movies": "movies" });
	eleventyConfig.addPassthroughCopy({ "favicon.ico": "favicon.ico" });
	eleventyConfig.addPassthroughCopy({ "favicon.png": "favicon.png" });

	return {
		dir: {
			output: outputDir
		}
	}
};