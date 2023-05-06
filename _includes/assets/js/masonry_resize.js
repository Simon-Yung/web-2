function resize(className,scale) {

	//i could have remade this toonly set flex basis and a width 
	//and just call resize last line to resize flex growth

	items = document.getElementsByClassName(className);
	for (i = 0; i < items.length ; i++) {
		let ratio = (items[i].naturalWidth * scale / items[i].naturalHeight);
		let flexBasis = ratio + 'px';
		items[i].style.width = flexBasis; //because google won't behave
		items[i].style.flex = flexBasis;
		items[i].style.flexGrow = ratio;
		items[i].style.flexShrink = '1';
	};
  
}

function resizeLastLine(scale) {

	//this function actually resize everything not just the last line, it just prevent the last one from growing

	let lastItem = items[items.length - 1].getBoundingClientRect().top;

	for (i = items.length - 1; i > -1; i--) {
		let currItem = items[i].getBoundingClientRect().top;
		if ( lastItem == currItem) {
			items[i].style.flexGrow = '0';
		} else {

			let ratio = (items[i].naturalWidth * scale / items[i].naturalHeight);
			items[i].style.flexGrow = ratio;
		}
	};
}

var items;
const scalingRatio = Number( document.getElementById('gallery').dataset.scalingRatio );
window.onload = function(event){
	resize('preview', scalingRatio);
	resizeLastLine();
};


var myEfficientFn = debounce(function() {

	//actual work goes here vvv
		resizeLastLine(scalingRatio);
	//actual work goes here ^^^
	
	}, 250);
	
	//rebound function vvv
	
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
window.addEventListener('resize', myEfficientFn);