/**
 * 
 * Controller for adding images
 * 
 */
angular.module('myApp') .controller('printshopDetailCtrl', function ($scope, $sce, 
$stateParams, $http, $state, $rootScope, localStorageService) {

  $scope.getMerchandize = function(){
 $http({
      method: 'GET',
      url: API_URL + 'merchandise/' + $stateParams.category + '/' + $stateParams.product
    }).then(function mySuccess (response) {
      $scope.product = response.data[0]
      $scope.currentSize = $scope.product.sizes[Object.keys($scope.product.sizes)[0]]
      $scope.activeImage = $scope.product.images[0]
      localStorageService.set('selectedItemDimensions', $scope.currentSize[0].dimensions)
      localStorageService.set('selectedItem', $scope.product)
    })

  }
   
    $scope.setCurrentSize = function (item, index) {
      if (item) {
        $scope.activeImage = $scope.product.images[0]
        $scope.currentSize = item
        $scope.selectedItem = null
        localStorageService.set('selectedItemDimensions', item[0].dimensions)
        localStorageService.set('selectedItem', $scope.product.images)
      } else {
        localStorageService.set('selectedItemDimensions', $scope.currentSize[index].dimensions)
        $scope.selectedItem = $scope.currentSize[index]
        $scope.activeImage = $scope.selectedItem.template_image
        localStorageService.set('selectedItem', $scope.selectedItem)
      }

    }

    $scope.getColor = function (color) {
      return {
        'background-color': color + '!important'
      }
    }

    $scope.deliberatelyTrustDangerousSnippet = function (htmlString) {
      return $sce.trustAsHtml(htmlString)
    }

    $scope.setActiveImage = function (img) {
      $scope.activeImage = img
    }
  })
 