/**
 * 
 * Controller for adding images
 * 
 */
angular.module('myApp').controller('ImagesController', function ($scope, $location, $urlRouter,
  $state, $stateParams, $http, $timeout, $rootScope) {
  window.scope = $scope
  $scope.isHome = ($state.name == 'custom.images.home')
  // $scope.setActiveTab('images')

  $scope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      $scope.isHome = (toState.name == 'custom.images.home')
    }
  )

  /*$scope.isHome = function() {
      return ($state.name == '' )
  };*/

  // $scope.uploadURL = function(src) {
  //     return ApiService.uploadURL(src)
  // }

  $scope.addImage = function (img) {
    fabric.Image.fromURL(img, function (op) {
      if (!$rootScope.canvas) {
        $rootScope.canvas = new fabric.Canvas('designer-canvas', {
          hoverCursor: 'pointer',
          selection: true
        })
      }
      $rootScope.canvas.add(op).setActiveObject(op)
      // $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))

      // var max_width = $rootScope.canvas.width * 0.9
      // var max_height = $rootScope.canvas.height * 0.9

      // var new_width = max_width
      // if(op.width < max_width) {
      //     new_width = op.width
      // }

      // //find ratio
      // var width_ratio = new_width  / op.width
      // var new_height = op.height * width_ratio
      // if(new_height > max_height) { //still too big
      //     new_height = max_height
      //     var height_ratio = new_height / op.height
      //     new_width = op.width * height_ratio
      // }

      // $rootScope.canvas.getActiveObject().set({
      //     scaleX:(new_width/op.width),
      //     scaleY:(new_height/op.height)
      // }).center().setCoords()

      // $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
      // $scope.drawCanvas()

      // //make sure it's selected and updated
      // $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
      // $scope.drawCanvas()

    })
  }

  $scope.init = function () {}
  $scope.init()
})
