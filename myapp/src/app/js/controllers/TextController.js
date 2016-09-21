/**
 * 
 * Controller for adding text
 * 
 */
angular.module('myApp').controller('TextController', function( $scope, $location,
 $urlRouter, $stateParams, $state, $timeout,$rootScope, $http, ApiService, $interval, FontService) {
    $scope.addText = "";
	
	$scope.add_text = function() {
        
        //now add the stylesheet
      	
		var text = new fabric.Text($scope.addText, {
			left: 100,
			top: 10,
			//fill: fill,
			fontFamily: 'arial',
			radius: 0,
			fontSize: 50,
            textAlign: 'center',
			spacing: 0
		});
		$rootScope.canvas.add(text);
		
		$rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1)); 
        $rootScope.canvas.item($scope.editableItem);   
	  
	};
    
    $scope.setFontCategory = function(category) {
        $scope.selectedFontCategory = category;  
    };
}); 