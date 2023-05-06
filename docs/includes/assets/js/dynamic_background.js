
let chapter = document.getElementsByClassName('chapterList__chapter');
for (let i = 0; i < chapter.length; i++) {
	chapter[i].addEventListener('mouseenter', () => {
		document.getElementById(`${chapter[i].dataset.bgId}`).style.animation = '0.5s ease-in-out 0s 1 normal forwards running fadeIn'
	}
	);
	chapter[i].addEventListener('mouseleave', () => {
		document.getElementById(`${chapter[i].dataset.bgId}`).style.animation = '0.5s ease-in-out 0s 1 normal forwards running fadeOut'
	}
	);
};