define(["jquery","owl2"],function($){

	var mobileOnlyCarousel = [];

	$(document).ready(function() {
		function mobileCarousel() {
			var resizeTimeout;
			var win = $(window);

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			resizeTimeout = setTimeout(function() {
				var windowWidth = win.width();
				if (windowWidth < 767) {
					mobileOnlyCarousel.forEach(function (el, i) {
						$(el.carouselClass).removeClass('owl-off');
						$(el.carouselClass).owlCarousel(el.carouselSettings);
					});
				} else {
					mobileOnlyCarousel.forEach(function (el, i) {
						$(el.carouselClass).addClass('owl-off');
						$(el.carouselClass).trigger('destroy.owl.carousel');
					});
				}
			}, 100);
		}

		function desktopCarousel() {
			if (carouselConfig.length) {
				carouselConfig.forEach(function (el, i) {
					
					if(el.mobileOnly) {
						mobileOnlyCarousel.push(el);
						$(el.carouselClass).addClass('owl-off');
					} else {
						$(el.carouselClass).owlCarousel(el.carouselSettings);
					}
				});
			}
		}

		if(typeof(globalSiteSpecificVars.carouselConfig)==="undefined"){
			carouselConfig = {
				stagePadding: 50,
                loop:false,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:2
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:2
                    }
                }
			};

			$('.owl-carousel2').owlCarousel(carouselConfig);
		} else {
			carouselConfig = (globalSiteSpecificVars.carouselConfig);
			
			desktopCarousel();

			mobileCarousel();
			
			$(window).on('resize', function () {
				desktopCarousel();
				mobileCarousel();
			})
		}
	});
});


