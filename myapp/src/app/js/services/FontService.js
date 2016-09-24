angular.module('myApp').service('FontService', function( 
 ApiService, $q, $interval, $http, localStorageService, apiUrl,_ ) {

	this.fonts = {};
	this.fontList = [];
	this.fontCategories = [];

	this.init = function(){
		
		var fonts = localStorageService.get('fonts');
		if(fonts) {
			this.fonts = fonts;
		}

	};

	this.loadFont = function(font){
		//console.log('loadFont', font.regular.fontface);
		if (!isFontAvailable(font.regular.fontface)) {
                    var stylUrl= apiUrl+"upload/data/"+font.regular.stylesheet;
			
			angular.element(document.querySelector('head')).append('<link rel="stylesheet" type="text/css" href="'+stylUrl+'">');
		}
		this.fonts[font.name] = font;
		      localStorageService.set("fonts",this.fonts);

			};

	this.preloadFonts = function(){

		var self = this;
    	var deferred = $q.defer();

    	_.each(self.fonts, function(font) {
			if (!isFontAvailable(font.regular.fontface)) {
                        
				var fontRow = _.find(self.fontList, {name: font.name});
				if(!angular.isUndefined(fontRow)) {
                    var stylUrl= apiUrl+"upload/data/"+font.regular.stylesheet;

					angular.element(document.querySelector('head')).append('<link rel="stylesheet" type="text/css" href="'+stylUrl+'">');
			        var stop = $interval(function() {
			          if (isFontAvailable(font.regular.fontface)) {
			            canvas.renderAll();
			            $interval.cancel(stop);
			          }
			        }, 100);

		        }
			}
		});
		deferred.resolve(self.fonts);
		return deferred.promise;

	};

	this.getFonts = function() {

		var self = this;
    	var deferred = $q.defer();

        $http({method: 'GET', url: apiUrl+"upload/api/fonts.php", cache: false}).
        success(function(data, status ) {
            self.fontList = data;
            self.fontCategories = _.uniq(_.pluck(self.fontList, 'category'));
            deferred.resolve(self);
        }).
        error(function(data, status) {
			deferred.reject(data);
        });
		return deferred.promise;

    }

	this.init();

});
