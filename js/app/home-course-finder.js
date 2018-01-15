define(["jquery"],function($){

	$(document).ready(function(){
		var containerHeight = $('.course__finder').height();
		var courseAbbrv = {
			'ug': 'ug',
			'pgt': 'pgt',
			'short': 'short'
		}
		var qualAbbrv = {
			'taught': 'taught',
			'research': 'research',
			'training': 'training'
		}

		function slidePanel(e) {
			e ? e.preventDefault() : false;

			globalSiteSpecificVars.course = globalSiteSpecificVars.course ? globalSiteSpecificVars.course : 'ug';

			if (globalSiteSpecificVars.course === courseAbbrv.pgt && globalSiteSpecificVars.qual === qualAbbrv.training) {
				goToPage();
				return
			}
			
			if ($('.course__finder').hasClass('show-second')) {
				$('.course__finder').removeClass('show-second');
				resetPanels();
			} else {
				var containerHeight = $('.course__finder').height();
				var panelTwoHeight = $('.search__panel--two').height();
				var overallHeight = containerHeight + panelTwoHeight + 'px';

				$('.course__finder').addClass('show-second');
				$('.course__finder').addClass('show-quals-'+ globalSiteSpecificVars.course);

				if ($(window).width() > 767) {
					$('.course__finder').animate({
						'height': overallHeight
					}, 500);
				}
			}
		}

		function checkDegOption(e) {
			globalSiteSpecificVars.course = $(e.currentTarget).val();

			if (globalSiteSpecificVars.course === courseAbbrv.pgt) {
				$('.course__finder').addClass('show-quals');
				globalSiteSpecificVars.qual = globalSiteSpecificVars.qual ? globalSiteSpecificVars.qual : $('.qual__type select').val();
				$('.course__finder').addClass('qual--' + globalSiteSpecificVars.qual);
			} else {
				resetPanels();
				globalSiteSpecificVars.qual = '';
			}
		}

		function checkQualOption(e) {
			globalSiteSpecificVars.qual = $(e.currentTarget).val();

			if (globalSiteSpecificVars.qual === qualAbbrv.taught) {
				$('.course__finder').removeClass('qual--' + qualAbbrv.research)
				$('.course__finder').addClass('qual--' + qualAbbrv.taught);
			} else if (globalSiteSpecificVars.qual ===  qualAbbrv.research) {
				$('.course__finder').removeClass('qual--' + qualAbbrv.taught)
				$('.course__finder').addClass('qual--' + qualAbbrv.research)
			}
		}

		function goToPage () {
			var pageURL = $('.course__finder').attr('data-training-url');

			window.location = pageURL;
		}

		function resetPanels(e) {
			e ? e.preventDefault() : false;

			if ($(window).width() > 767) {
				$('.course__finder').animate({
					height: containerHeight + 'px'
				}, 500);
			}

			if (globalSiteSpecificVars.course === courseAbbrv.pgt) {
				$('.course__finder').attr('class', 'course__finder show-quals qual--' + globalSiteSpecificVars.qual);
			} else {
				$('.course__finder').attr('class', 'course__finder');
			}
		}

		$('.degree__type select').on('change', checkDegOption);
		$('.qual__type select').on('change', checkQualOption);
		$('.course__finder .button-next, .course__finder .arrow-next, .course__finder .dot-two').on('click', slidePanel);
		$('.course__finder .arrow-prev, .course__finder .dot-one').on('click', resetPanels);
	});
});


