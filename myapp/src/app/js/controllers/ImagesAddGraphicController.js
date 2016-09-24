/**
 * 
 * Controller for clip art
 * 
 */
angular.module('myApp').controller('ImagesAddGraphicController', function( $scope, 
$location, $urlRouter,$rootScope, $stateParams, $http, $timeout, ApiService, $state,$window) {
    
   
    $scope._ = _;
    $scope.clipArt = null;
    $scope.categories = null;
    $window.scope = $scope;

    //$scope.setActiveTab('images');

    $scope.addClipart = function(img) {
        console.log($scope.clipArtImage(img));
        fabric.loadSVGFromURL($scope.clipArtImage(img), function(ob,op){
            
            $rootScope.canvas.add(new fabric.PathGroup(ob, op).set({ left: 100, top: 100 }));
            $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1));
            
            var max_width = $rootScope.canvas.width * 0.9;
            var max_height = $rootScope.canvas.height * 0.9;

            var new_width = max_width;
            if(op.width < max_width) {
                new_width = op.width;
            }

            //find ratio
            var width_ratio = new_width  / op.width;
            var new_height = op.height * width_ratio;
            console.log("still too big");
            if(new_height > max_height) { //still too big
                new_height = max_height;
                var height_ratio = new_height / op.height;
                new_width = op.width * height_ratio;
            }

            $rootScope.canvas.getActiveObject().set({
                scaleX:(new_width/op.width),
                scaleY:(new_height/op.height)
            }).center().setCoords();
            $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1));
            $scope.drawCanvas();
            
            //make sure it's selected and updated
            $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1));
            $scope.drawCanvas();

            //
            if($scope.isMobile) {
                $state.go('custom.product.home');
                $scope.showMobileDesigner();
            } else {
				$state.go('custom.images.clip-art');
			}
        });

    };

    $scope.clipArtImage = function(clipArt) {
        return ApiService.Url('../data/clip_art/' + clipArt);
    }
	
    $scope.$watch('isReady', function(newValue, oldValue) {
		if($scope.isReady) {
			$scope.addClipart($stateParams['path']);
		}
    });
	
    $scope.init = function() {
		if($scope.isReady) {
			$scope.addClipart($stateParams['path']);
		}
    };
    $scope.init();

});