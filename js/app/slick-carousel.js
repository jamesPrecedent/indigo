define(["jquery","slick"],function($){
	$(document).ready(function(){
		if(typeof(globalSiteSpecificVars.slickCarouselConfig)==="undefined"){
			slickCarouselConfig = {
				
			};
		}else{
			carouselConfig = (globalSiteSpecificVars.slickCarouselConfig);
			
		}
		$('.slick-carousel').slick(carouselConfig);
	});
});


