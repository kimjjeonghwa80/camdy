angular.module('myApp').controller('ImagesBoxController', function( $scope,
 $location, $urlRouter, $stateParams, $http, $timeout, ApiService) {
    
    window.scope = $scope;
    
    $scope.myImages = [];
   // $scope.setActiveTab('images');
    
    $scope.loadMyImages = function() {
       $scope.myImages=  JSON.parse(window.localStorage.getItem('uploadedItems'));
       console.log($scope.myImages);
    }
    
    $scope.init = function() {
        $scope.loadMyImages();
    };
    $scope.init();

});