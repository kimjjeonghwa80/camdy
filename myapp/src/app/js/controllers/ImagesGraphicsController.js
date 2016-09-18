/**
 * 
 * Controller for clip art
 * 
 */
angular.module('myApp').controller('ImagesGraphicsController', function ($scope, $location, $urlRouter,
  $stateParams, $http, $timeout, ApiService, $state,$rootScope) {

  $rootScope.canvas = new fabric.Canvas('designer-canvas', {
    hoverCursor: 'pointer',
    selection: true
  })
  $scope.selectedItem = window.localStorage.getItem('selectedItem');

  $rootScope.canvas.on('after:render', function () {
    console.log('after')
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

  // $rootScope.canvas.on({
  // 		 'object:moving': function(e) {		  	
  // 		    e.target.opacity = 0.5
  // 		  },
  // 		  'object:modified': function(e) {		  	
  // 		    e.target.opacity = 1
  // 		  },
  // 		 'object:selected':onObjectSelected,
  // 		 'selection:cleared':onSelectedCleared
  // 	 })
  // 	// piggyback on `$rootScope.canvas.findTarget`, to fire "object:over" and "object:out" events
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
  $scope.categories = null
  window.scope = $scope

  //  $scope.setActiveTab('images')

  $scope.addClipart = function (img) {
    console.log('img', img)

    fabric.loadSVGFromURL(img, function (objects, options) {
      var shape = fabric.util.groupSVGElements(objects, options);
      shape.scale(0.5);
      //  {
      //     left: 25,
      //     top: 100,
      //     width: 25,
      //     height: 25,
      //     cornersize: 10,
      //     hasRotatingPoint: true
      //   })
      $rootScope.canvas.add(shape.scale(0.6)).setActiveObject(shape)
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

    // fabric.loadSVGFromURL(img.svg.url, function(ob,op){

    //     $rootScope.canvas.add(new fabric.PathGroup(ob, op).set({ left: 100, top: 100 }))
    //     $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))

    //     var max_width = $rootScope.canvas.width * 0.5
    //     var max_height = $rootScope.canvas.height * 0.5

    //     var new_width = max_width
    //     if(op.width < max_width) {
    //         new_width = op.width
    //     }

    //     //find ratio
    //     var width_ratio = new_width  / op.width
    //     var new_height = op.height * width_ratio
    //     console.log("still too big")
    //     if(new_height > max_height) { //still too big
    //         new_height = max_height
    //         var height_ratio = new_height / op.height
    //         new_width = op.width * height_ratio
    //     }

    // 	var fill = getBorderColor(_.first($scope.currentItem.variant.colors))
    // 	if(fill == '#FFFFFF') {
    // 		var editable = $rootScope.canvas.getActiveObject()
    // 		_.each(editable.paths, function(path, index) {

    //             if(angular.isUndefined(path.fill.type)) {
    // 				if(path.fill == '#000000') {
    // 					path.fill = '#FFFFFF'
    // 				}                        
    //             }

    //         })
    // 		$rootScope.canvas.item(editable)
    // 	}
    //     $rootScope.canvas.getActiveObject().set({
    //         scaleX:(new_width/op.width),
    //         scaleY:(new_height/op.height)
    //     }).center().setCoords();			
    //     $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
    //     $scope.drawCanvas()

    //     //make sure it's selected and updated
    //     $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
    //     $scope.drawCanvas()

    //     //
    //     if($scope.isMobile) {
    //         $state.go('custom.product.home')
    //         $scope.showMobileDesigner()
    //     }
    // })

  }

  $scope.setCategory = function (category) {
    $scope.selectedCategory = category
  }

  $scope.clipArtImage = function (clipArt) {
    return ApiService.Url(clipArt.path)
  }

  $scope.loadClipArt = function () {
    $scope.clipArt = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']
  // var clipArtUrl = ApiService.Url("https://openclipart.org/search/json/?query=animal&amount=25")
  // $http({method: 'GET', url: clipArtUrl, cache: false}).
  // success(function(data, status, headers, config) {
  //     // this callback will be called asynchronously
  //     // when the response is available
  //     $scope.clipArt = data.payload
  //     $scope.categories = ['animals'];//_.uniq(_.pluck($scope.clipArt, 'category'))
  //     $scope.selectedCategory = _.first($scope.categories)
  // }).
  // error(function(data, status, headers, config) {
  //     // called asynchronously if an error occurs
  //     // or server returns response with an error status.
  // })
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
