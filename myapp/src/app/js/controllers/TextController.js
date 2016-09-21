/**
 * 
 * Controller for adding text
 * 
 */
angular.module('myApp').controller('TextController', function ($scope, $location,
  $urlRouter, $stateParams, $state, $timeout, $rootScope, $http, ApiService, $interval, FontService) {
  $scope.addText = ''
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

  $scope.add_text = function () {
    // now add the stylesheet

    var text = new fabric.Text($scope.addText, {
      left: 100,
      top: 10,
      // fill: fill,
      fontFamily: 'arial',
      radius: 0,
      fontSize: 50,
      textAlign: 'center',
      spacing: 0
    })
    $rootScope.canvas.add(text)

    $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
    $rootScope.canvas.item($scope.editableItem)
  }

  $scope.setFontCategory = function (category) {
    $scope.selectedFontCategory = category
  }
})
