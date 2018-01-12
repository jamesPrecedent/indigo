getassetLocation = function(){
	var assetUrl = document.URL;
	var domainParam = assetUrl.replace(/^([^\?]*)\?(.*)(\&*)domain=([^&]+)(.*)$/ig,'$4');
	var assetDomain = "//cdn.ucl.ac.uk/";
	var libLocation = 'indigo/js/lib';
	if(typeof domainParam!=='undefined'){

		switch(domainParam){
			case "static":
				assetDomain = "//static.ucl.ac.uk/";
			break;
			case "local":
				assetDomain = "//static-local/";
			break;
			case "uat":
				assetDomain = "//static-uat.ucl.ac.uk/";
			break;
		}
	}
	// return assetDomain + libLocation;

	return 'http://localhost:8888/UCL/js/lib/'

}

var fullAssetLocation = getassetLocation();
var urlArgs = "";

require.config({
	baseUrl: fullAssetLocation,
	paths: {
		app: '../app'
		,allsite: 'all-site.min'
		,templates: '../templates'
		//libaries
		,jquery: globalSiteSpecificVars.pathToJquery
		,jqueryUi: 'jquery-ui-1.8.18-custom.min'
		,jqueryTmpl: 'jquery.tmpl.min'
		,underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min'
		,backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min'
		,fastclick: 'fastclick'
		,googleAnalyticsLib: 'googleAnalytics.min'
		,owl: 'owl.carousel.min'
		,owl2: '//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min'
		,jwplayer: 'jwplayer'
		,handleBars: 'handlebars.min'
		,typeAheadBundle:  'typeahead.bundle.min'
	}
	,shim:{
		allsite: {
			deps: ['jquery']
			,exports: 'gen'
		}
		,underscore: {
			exports: '_'
		}
		,backbone: {
			deps: ['underscore','jquery']
			,exports: 'B'
		},
		modernizr: {
			exports: 'Modernizr'
		},
		googleAnalyticsLib: {
			exports: 'ga'
		},
		owl: {
			deps: ['jquery']
		},
		owl2: {
			deps: ['jquery']
		},
		jqueryUi: {
			deps: ['jquery']
		},
		jwplayer: {
			exports: 'jwplayer'
		},
		jqueryTmpl: {
			deps: ['jquery']
		},
		typeAheadBundle: {
			deps: ['jquery']
			,exports: 'Bloodhound'
		},
		handleBars : {
			exports: 'Handlebars'
		}
	}
});