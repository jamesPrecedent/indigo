define(["jquery","googleAnalyticsLib","jqueryUi"],function($,ga){

	var ugCollectionYear = 'ug-degrees-current';
	if(typeof globalSiteSpecificVars.ugCollectionYear !== 'undefined'){
		ugCollectionYear = globalSiteSpecificVars.ugCollectionYear;
	}
	var collection = ugCollectionYear;
	var box = "//search2";
    //var box = "//funnelback-dev";

	function triggerAutoSearch(){
		// Build our URL
		var url = box + ".ucl.ac.uk/s/search.html?" + $('form.form').serialize() + "&" + $('.fb-facets-value').serialize();
		triggerSearch(url);
	}
	function triggerSearch(url){
		$("article.site-content__main").load(url.replace(' ', '%20'),
			function(){
				autoCompleteSetup();
			}
		);
	}
	function autoCompleteSetup(){
		// AUTOCOMPLETE SETUP
		$(function() {
			$("input.search-box__search").fbcompletion({
				'enabled'    : 'enabled',
				'collection' : collection,
				'program'    : box + '.ucl.ac.uk/s/suggest.json',
				'format'     : 'extended',
				'alpha'      : '.5',
				'show'       : '10',
				'sort'       : '0',
				'length'     : '3',
				'delay'      : '0',
				'profile'    : ''
			});
		});
	}
	$.fn.fbcompletion = function(settings) {
		var config = {
			'collection'  : collection,
			'show'        : 10,
			'sort'        : 0,
			'delay'       : 0,
			'length'      : 3,
			'program'     : 'padre-qs.cgi',
			'format'      : 'simple',
			'enabled'     : 'disabled',
			'tmplId'      : 'fb-completion-tmpl',
			'profile'     : '_default',
			'zindex'      : 1000
		};
   
		if (settings) $.extend(config, settings);
	
		if (config.enabled != 'enabled' ) {
			return;
		}
	
		this.each(function() {
			var targetElement = this;

			// Compile jQuery template
			var compiledTmpl;
			if ($().template) { 
				if ($('#'+config.tmplId).length > 0) {
					compiledTmpl = $('#'+config.tmplId).template();
				} else {
					compiledTmpl = $('<script>[Error: Template <tt>'+config.tmplId+'</tt> not found]</script>').template();
				}
			}

			// PRECEDENT - THIS IS WHERE EASY AUTO COMPLETE SAMPLE STARTS
			$(targetElement).easyAutocomplete({
				url: function(phrase) {
					return config.program
						+ '?collection=' + config.collection
						+ '&partial_query=' + phrase.replace(/ /g, '+')
						+ '&show=' + config.show
						+ '&sort=' + config.sort
						+ '&alpha=' + config.alpha
						+ '&fmt=' + ((config.format == 'simple') ? 'json' : 'json++') 
						+ ((config.profile !== '') ? '&profile=' + config.profile : '' )
				},

				ajaxSettings: {
					dataType: 'json',
					method: 'GET'
				},
				getValue: function(element) {
					return element.disp
				}
			})

			// $(targetElement).autocomplete( {
				
			// 	appendTo: ($("#fb-queryform").length > 0) ? "#fb-queryform" : "body",
			// 	source: function (request, response) {
			// 		jQuery.ajax({
			// 			type:     'GET',
			// 			url:      config.program
			// 						+ '?collection=' + config.collection
			// 						+ '&partial_query=' + request.term.replace(/ /g, '+')
			// 						+ '&show=' + config.show
			// 						+ '&sort=' + config.sort
			// 						+ '&alpha=' + config.alpha
			// 						+ '&fmt=' + ((config.format == 'simple') ? 'json' : 'json++') 
			// 						+ ((config.profile !== '') ? '&profile=' + config.profile : '' )
			// 			,
			// 			dataType: 'jsonp',
			// 			error: function(xhr, textStatus, errorThrown) {
			// 			   if (window.console) { 
			// 					console.log('Autocomplete error: ' + textStatus + ', ' + errorThrown);
			// 				}
			// 			},
			// 			success:  function(data) {
			// 				var responses = new Array();
			// 				var categorized = new Array();
			// 				var categoryLabels = new Array();
	
			// 				for (var i=0; i<data.length; i++) {
			// 					var out;
			// 					var suggestion = data[i];
	
			// 					if (suggestion == null) {
			// 						continue;
			// 					}

			// 					if (typeof(suggestion) == 'string') {
			// 						// Single string suggestion
			// 						responses.push({
			// 							label: suggestion,
			// 							matchOn: request.term
			// 						});
			// 					} else if (typeof(suggestion) == 'object') {
			// 						if (suggestion.cat) {
			// 							if ( ! categorized[suggestion.cat]) {
			// 								categorized[suggestion.cat] = new Array();
			// 								categoryLabels.push(suggestion.cat);
			// 							}
			// 							categorized[suggestion.cat].push({
			// 								label: (suggestion.disp) ? suggestion.disp : suggestion.key,
			// 								value: (suggestion.action_t == 'Q') ? suggestion.action: suggestion.key,
			// 								extra: suggestion,
			// 								matchOn: request.term
			// 							});
			// 						} else {
			// 							responses.push({
			// 								label: (suggestion.disp) ? suggestion.disp : suggestion.key,
			// 								value: (suggestion.action_t == 'Q') ? suggestion.action : suggestion.key,
			// 								extra: suggestion,
			// 								matchOn: request.term
			// 							});
			// 						}
			// 					}
			// 				}

			// 				// Add categorized suggestions, with category header
			// 				for(var i=0; i<categoryLabels.length; i++) {
			// 					var cLabel = categoryLabels[i];
			// 					responses.push({
			// 						label: cLabel,
			// 						category : true
			// 					});
			// 					for (var j=0; j<categorized[cLabel].length; j++) {
			// 						responses.push(categorized[cLabel][j]);
			// 					}
			// 				}
			// 				response (responses);
			// 			}
			// 		});
			// 	},

			// 	open: function() {
			// 		$(this).autocomplete('widget').css('z-index', config.zindex);
			// 		return false;
			// 	},

			// 	delay: config.delay,

			// 	minLength: config.length,

			// 	// focus: function(evt, ui) {}
			// 	focus: function(event, ui){
			// 		$('input.search-box__search').val(ui.item.value);
			// 		return false;
			// 	},
			// 	select: function(evt, ui) {
			// 		if (ui.item.extra) {
			// 			$(this).attr('value', ui.item.extra.disp);
			// 			triggerAutoSearch();
			// 		} else {
			// 			// Submit the form on select
			// 			$(this).attr('value', ui.item.value);
			// 			triggerAutoSearch();
			// 		}
			// 		return false;
			// 	}
			// }).data( "autocomplete" )._renderItem = function( ul, item ) {
			// 	var label = [];

			// 	if (item.extra) { // Complex suggestion
					
			// 		if(typeof item.extra.disp !== 'undefined'){
			// 			label = item.label.replace(new RegExp('('+item.matchOn+')', 'i'), '<strong>$1</strong>');
			// 			//label = item.extra.disp.value;
			// 		}
			// 	}
			// 	if(label.length){
			// 			//console.log(label);
			// 		return $('<li></li>')
			// 			.data( 'item.autocomplete', item)
			// 			.append( '<a>' + label + '</a>' )
			// 			.appendTo(ul);;
			// 	}
			// };
		});
		return this;
	};

	$(document).ready(function() {
		autoCompleteSetup();
		// --------- START OF XHR CODE ---------
		$('body#index').on('change', '.search-box__dropdown.dropdown__inner', function (){
			//console.log('got here for on change');
			triggerAutoSearch();
		});
		$('body').on('submit', '.search-box form.form', function(e){
		   //console.log('got here for submit');
		   e.preventDefault();
		   e.returnValue = false;
		   triggerAutoSearch();
		});
		$('body').on('click', '.search-box__reset', function() {
			   var url = box + ".ucl.ac.uk/s/search.html?collection=" + collection + "&query=";
		   triggerSearch(url);
		});
		$('body').on('click', '.search-box__label input.checkbox', function() {
		 	triggerAutoSearch();
		});
		// --------- END OF XHR CODE ---------
		
	});

	/* Autocomplete tracking
	-------------------------------------------------------*/
	if(typeof ga !=='undefined'){
		var searchFormCount = $('input.search-box__search').val().length;
		$(document).on('click','li.ui-menu-item', function(){
			var searchLabel = $(this).find('a').text();
			ga('create', 'UA-47604398-1', 'auto');
			ga('send', 'event', 'UG Autocomplete', 'click', searchLabel, searchFormCount, {
				// for testing only
					'hitCallback': function() {
					//console.log(searchLabel);
				}
			});
		});
	}
});
