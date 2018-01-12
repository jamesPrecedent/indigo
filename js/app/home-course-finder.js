define(["jquery"],function($){

	$(document).ready(function(){
		console.log('loaded');
		var courseAbbrv = {
			'ug': 'ug',
			'pgt': 'pgt',
			'short': 'short'
		}

		var selected;

		function displayQuals () {
			$('.course__finder__form').addClass('show-quals');
		}

		function slidePanel(e) {
			e.preventDefault();

			selected = selected ? selected : 'ug';
			
			if ($('.course__finder__form').hasClass('show-second')) {
				$('.course__finder__form').removeClass('show-second');
				$('.course__finder__form').removeClass('show-quals-ug show-quals-pgt show-quals-short');
			} else {
				$('.course__finder__form').addClass('show-second');
				$('.course__finder__form').addClass('show-quals-'+ selected +'');
			}
		}

		function checkOption(e) {
			selected = $(e.currentTarget).val();

			if (selected === courseAbbrv.ug || selected === courseAbbrv.short) {
				slidePanel();
			} else if (selected === courseAbbrv.pgt) {
				displayQuals();
			}
		}

		$('.degree__type select').on('change', checkOption);
		$('.course__finder__form .button-next').on('click', slidePanel);
	});
});


