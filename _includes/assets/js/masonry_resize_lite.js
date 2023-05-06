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

//experimentalvvvv
// function resizeLastLine(scale) {

// 	//this function actually resize everything not just the last line, it just prevent the last one from growing

// 	let lastItem = items[items.length - 1].getBoundingClientRect().top;
// 	let lastRowOfItems = [];

// 	for (i = items.length - 1; i > -1; i--) {
// 		let currItem = items[i].getBoundingClientRect().top;
// 		if ( lastItem == currItem) {
// 			lastRowOfItems.push( items[i] );
// 		} else {
// 			//trying to make sure the last line is the same height as the rest
// 			let width = items[i].offsetWidth;

// 			for (i = 0; i < lastRowOfItems.length; i++) {
// 				lastRowOfItems[i].style.width = width;
// 				lastRowOfItems[i].style.flexBasis = width;
// 			}
// 			break;
// 		}
// 	};
// }
//experimental^^^^

var items;
const scalingRatio = Number( document.getElementById('gallery').dataset.scalingRatio );
window.onload = function(event){
	resize('preview', scalingRatio);
};

