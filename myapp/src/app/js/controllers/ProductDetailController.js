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
        $scope.currentSize = item[0];
        $scope.selectedItem = item[0];
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
        'background-color': color
      }
    }

    $scope.deliberatelyTrustDangerousSnippet = function (htmlString) {
      return $sce.trustAsHtml(htmlString)
    }

    $scope.setActiveImage = function (img) {
      $scope.activeImage = img
    }
  })
//  .controller('customizeCtrl', function ($scope, $http, localStorageService, $rootScope) {
//      $rootScope.canvas = new fabric.Canvas('designer-canvas', {
//     hoverCursor: 'pointer',
//     selection: true
//   });

//     $scope.msg = 'Customize the product'
//     $scope.selectedItemObject = localStorageService.get('selectedItem');
//     $scope.selectedItem = $scope.selectedItemObject.template_image;
//     $scope.changeSelectedItem = function (img) {
//       $scope.selectedItem = img
//     }
//     $scope.selectedItemDimensions = localStorageService.get('selectedItemDimensions')
//     $scope.maxWidth = 300
//     $scope.maxHeight = 300
//     $scope.x = $scope.selectedItemDimensions.x
//     $scope.y = $scope.selectedItemDimensions.y
//     // $scope.ratio =  $scope.maxWidth/$scope.selectedItemDimensions.width
//     $scope.canvasWidth =  $scope.selectedItemDimensions.width
//     $scope.canvasHeight =  $scope.selectedItemDimensions.height
//   })
