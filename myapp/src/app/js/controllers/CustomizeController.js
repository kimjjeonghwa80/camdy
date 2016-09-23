angular.module('myApp').controller('customizeCtrl',
  function ($scope, $http, localStorageService, $rootScope, FontService) {
    $scope.msg = 'Customize the product'
    FontService.getFonts().then(function (data) {
      $scope.loaded = 75


      // load actual fonts
      FontService.preloadFonts().then(function () {})
    })


    $scope.selectedItemObject = localStorageService.get('selectedItem')
    $scope.selectedItem = $scope.selectedItemObject.template_image
    $scope.changeSelectedItem = function (img) {
      $scope.selectedItem = img
    }
    $scope.selectedItemDimensions = localStorageService.get('selectedItemDimensions')
    $scope.maxWidth = 300
    $scope.maxHeight = 300
    $scope.x = $scope.selectedItemDimensions.x
    $scope.y = $scope.selectedItemDimensions.y
    // $scope.ratio =  $scope.maxWidth/$scope.selectedItemDimensions.width
    $scope.canvasWidth = $scope.selectedItemDimensions.width
    $scope.canvasHeight = $scope.selectedItemDimensions.height
  })
