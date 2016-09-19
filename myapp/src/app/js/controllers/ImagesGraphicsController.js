/**
 * 
 * Controller for clip art
 * 
 */
angular.module('myApp').controller('ImagesGraphicsController', function ($scope, $location, $urlRouter,
  $stateParams, $http, $timeout, ApiService, $state, $rootScope) {
  $scope.categories = ['Animals', 'Arrows', 'Callouts', 'Characters','Love', 'Clock', 'Clothes', 'Computers', 'FlowCharts', 'Flowers', 'Fruits', 'Happy', 'Holidays', 'Misc', 'Office', 'People', 'Shapes', 'Signs', 'Silhouttes', 'Special', 'Symbols', 'Toys', 'Weather']
  $scope.selectedCategory = $scope.categories[0]
  $scope.currentPage = 1
  $rootScope.canvas = new fabric.Canvas('designer-canvas', {
    hoverCursor: 'pointer',
    selection: true
  })
  $scope.previous = function () {
    $scope.totalPages = []
    for (let i = 1; i < 11; i++) {
      $scope.totalPages.push(i)
    }
  }

  $scope.next = function () {
    $scope.totalPages = []
    for (let i = 11; i < 21; i++) {
      $scope.totalPages.push(i)
    }
  }

  $scope.selectedItem = window.localStorage.getItem('selectedItem')

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

  $scope.clipArt = null
  window.scope = $scope

  //  $scope.setActiveTab('images')

  $scope.addClipart = function (img) {
    fabric.loadSVGFromURL(img, function (objects, options) {
      var shape = fabric.util.groupSVGElements(objects, options)
      shape.scale(0.1)
      //  {
      //     left: 25,
      //     top: 100,
      //     width: 25,
      //     height: 25,
      //     cornersize: 10,
      //     hasRotatingPoint: true
      //   })
      $rootScope.canvas.add(shape.scale(0.05)).setActiveObject(shape)
      //    $rootScope.canvas.renderAll()

      $rootScope.canvas.forEachObject(function (obj) {
        var setCoords = obj.setCoords.bind(obj)
        obj.on({
          moving: setCoords,
          scaling: setCoords,
          rotating: setCoords
        })
      })
    })
  }

  $scope.setCategory = function (category) {
    $scope.selectedCategory = category
    $scope.currentPage = 1
    $scope.loadClipArt()
  }

  $scope.setPage = function (page) {
    $scope.currentPage = page
    $scope.loadClipArt()
  }

  $scope.loadClipArt = function () {
    //   $scope.clipArt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']
    // $scope.categories = ['animals']
    //  $scope.categories = ['animals']
    var clipArtUrl = ApiService.Url('https://openclipart.org/search/json/?query=' + $scope.selectedCategory + '&amount=25&page=' + $scope.currentPage)
    $http({method: 'GET', url: clipArtUrl, cache: false}).success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.clipArt = data.payload
    }).error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    })
  }
  $scope.loadClipArt()

  $scope.init = function () {}
  $scope.init()

  // added for certain clients
  $scope.updateColors = function () {
    _.each($scope.editable.original_colors, function (path, index) {
      var fill = _.find($scope.colors, {original: path.fill})

      if (fill && fill.replacement != null) {
        console.log('updateColors', $scope.editable.paths[index].fill, fill.replacement)

        $scope.editable.paths[index].fill = fill.replacement
      }
    })

    // now update the view
    var item = $rootScope.canvas.item($scope.editableItem)
    if (item != null) {
      item.set('paths', $scope.editable.paths)
      item.original_colors = $scope.original_colors
    }
    $scope.drawCanvas()
  }

  $scope.switchColor = function (color, replacement) {
    color.replacement = replacement
    $scope.updateColors()
  }
})
