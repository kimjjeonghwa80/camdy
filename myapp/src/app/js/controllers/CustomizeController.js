angular.module('myApp').controller('customizeCtrl',
  function ($scope, $http, localStorageService, $rootScope, FontService) {



$rootScope.canvas = new fabric.Canvas('designer-canvas', {
    hoverCursor: 'pointer',
    selection: true
  })

  $rootScope.canvas.on('after:render', function () {
    $rootScope.canvas.contextContainer.strokeStyle = '#555'

    $rootScope.canvas.forEachObject(function (obj) {
      var bound = obj.getBoundingRect()

      $rootScope.canvas.contextContainer.strokeRect(
        bound.left + 0.5,
        bound.top + 0.5,
        bound.width,
        bound.height
      )
    })
  })

  $rootScope.canvas.findTarget = (function (originalFn) {
    return function () {
      var target = originalFn.apply(this, arguments)
      if (target) {
        if (this._hoveredTarget !== target) {
          $rootScope.canvas.fire('object:over', { target: target })
          if (this._hoveredTarget) {
            $rootScope.canvas.fire('object:out', { target: this._hoveredTarget })
          }
          this._hoveredTarget = target
        }
      }
      else if (this._hoveredTarget) {
        $rootScope.canvas.fire('object:out', { target: this._hoveredTarget })
        this._hoveredTarget = null
      }
      return target
    }
  })($rootScope.canvas.findTarget)








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
