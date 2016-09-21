angular.module('myApp').controller('ImagesBoxController', function( $scope,
 $location, $urlRouter, $stateParams, $http, $timeout, ApiService, localStorageService) {
    
    window.scope = $scope;
    
    $scope.myImages = [];
   // $scope.setActiveTab('images');
    
    $scope.loadMyImages = function() {
       $scope.myImages=  localStorageService.get('uploadedItems');
    }
    
    $scope.init = function() {
        $scope.loadMyImages();
    };
    $scope.init();

});