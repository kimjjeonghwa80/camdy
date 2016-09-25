// /**
//  * 
//  * Controller for adding text
//  * 
//  */
// angular.module('myApp').controller('TextController', function ($scope, $location,
//   $urlRouter, $stateParams, $state, $timeout, $rootScope, $http, ApiService, $interval, FontService) {
//   $scope.addText = ''
//   $rootScope.canvas = new fabric.Canvas('designer-canvas', {
//     hoverCursor: 'pointer',
//     selection: true
//   })

//   $rootScope.canvas.on('after:render', function () {
//     $rootScope.canvas.contextContainer.strokeStyle = '#555'

//     $rootScope.canvas.forEachObject(function (obj) {
//       var bound = obj.getBoundingRect()

//       $rootScope.canvas.contextContainer.strokeRect(
//         bound.left + 0.5,
//         bound.top + 0.5,
//         bound.width,
//         bound.height
//       )
//     })
//   })

//   $rootScope.canvas.findTarget = (function (originalFn) {
//     return function () {
//       var target = originalFn.apply(this, arguments)
//       if (target) {
//         if (this._hoveredTarget !== target) {
//           $rootScope.canvas.fire('object:over', { target: target })
//           if (this._hoveredTarget) {
//             $rootScope.canvas.fire('object:out', { target: this._hoveredTarget })
//           }
//           this._hoveredTarget = target
//         }
//       }
//       else if (this._hoveredTarget) {
//         $rootScope.canvas.fire('object:out', { target: this._hoveredTarget })
//         this._hoveredTarget = null
//       }
//       return target
//     }
//   })($rootScope.canvas.findTarget)

//   $scope.add_text = function () {
//     // now add the stylesheet

//     var text = new fabric.Text($scope.addText, {
//       left: 100,
//       top: 10,
//       // fill: fill,
//       fontFamily: 'arial',
//       radius: 0,
//       fontSize: 50,
//       textAlign: 'center',
//       spacing: 0
//     })
//     $rootScope.canvas.add(text)

//     $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
//     $rootScope.canvas.item($scope.editableItem)
//   }

//   $scope.setFontCategory = function (category) {
//     $scope.selectedFontCategory = category
//   }
// })

/**
 * 
 * Controller for adding text
 * 
 */
angular.module('myApp').controller('TextController', function ($scope,
  $location, $urlRouter, $stateParams, $state, $rootScope, $timeout, $http, ApiService, $window,
  $interval, FontService) {
  this.name = 'TextController'
  this.params = $stateParams
  $scope.addText = ''
  $window.scope = $scope
  $scope._ = _
  $scope.fonts = []
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
  });

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


  $scope.FontService = FontService
  $scope.fontCategories = []
  $scope.selectedFontCategory = 'Display'
  $scope.selectedFont = []
  $scope.fontSelectionWindow = false
  //  $scope.setActiveTab('text')
  $scope.$watch('isReady', function (newValue, oldValue) {
    $scope.loadFonts()
  })
  $scope.setSelectedFont = function (font) {
    $scope.selectedFont = font
    $scope.hideFontSelector()
  }
  $scope.showFontSelector = function () {
    $scope.fontSelectionWindow = true
  }

  $scope.hideFontSelector = function () {
    $scope.fontSelectionWindow = false
  }

  $scope.loadFonts = function () {
    // console.log('FontService.fontList', FontService.fontList)
    $scope.fonts = FontService.fontList
    // console.log('Hello', $scope.fonts)
    $scope.fontCategories = FontService.fontCategories
    $scope.selectedFont = _.findWhere($window.scope.fonts, {name: $scope.defaultFont})
  }

  $scope.font_image = function (font_image) {
    return ApiService.fontUrl(font_image)
  }

  $scope.add_text = function () {
    var fontFamily = 'alpha_echoregular'
    if ($scope.selectedFont && $scope.selectedFont.regular.fontface) {
      fontFamily = $scope.selectedFont.regular.fontface
    }
    // now add the stylesheet
    var text = new fabric.Text($scope.addText, {
      left: 100,
      top: 10,
      // fill: fill,
      fontSize: 50,
      fontFamily: fontFamily,
      radius: 0,
      textAlign: 'center',
      spacing: 0

    })
    $rootScope.canvas.add(text)

    $rootScope.canvas.setActiveObject($rootScope.canvas.item($rootScope.canvas.getObjects().length - 1))
    $rootScope.canvas.item($scope.editableItem)
  }

  // $scope.add_text = function() {

  //     //now add the stylesheet
  //     FontService.loadFont($scope.selectedFont)

  // 	//set the control colors
  //     var fill = getBorderColor(_.first($scope.currentItem.variant.colors))

  // 	var text = new fabric.Text($scope.addText, {
  // 		left: 100,
  // 		top: 10,
  // 		fill: fill,
  // 		fontFamily: $scope.selectedFont.regular.fontface,
  // 		radius: 0,
  // 		fontSize: 50,
  //         textAlign: 'center',
  // 		spacing: 0
  // 	})
  // 	$rootscope.canvas.add(text)

  // 	$rootscope.canvas.setActiveObject($rootscope.canvas.item($rootscope.canvas.getObjects().length - 1)); 
  //     $rootscope.canvas.item($scope.editableItem).centerH()

  //     var stop = $interval(function() {

  //       if (isFontAvailable($scope.selectedFont.regular.fontface)) {
  //         var object = $rootscope.canvas.item($scope.editableItem)

  //         object.setFontFamily( $scope.selectedFont.regular.fontface )
  //         object.set( 'fontName', $scope.selectedFont.name )
  //         $scope.defaultFont = $scope.selectedFont.name

  //         //
  //         var max_width = $rootscope.canvas.width * 0.9
  //         var max_height = $rootscope.canvas.height * 0.9
  //         var new_width = max_width
  //         if(object.getWidth() < max_width) {
  //             new_width = object.getWidth()
  //         }
  //         var width_ratio = new_width  / object.getWidth() //find ratio

  //         var newfontsize = (object.fontSize * width_ratio)
  //         object.setFontSize(parseInt(newfontsize, 10))
  //         object.setScaleX(1)
  //         object.setScaleY(1)
  //         object.centerH()

  //         $scope.editable.fontSize = object.fontSize

  //         $scope.drawCanvas()
  //         $interval.cancel(stop)

  //         if($scope.isMobile) {
  //             $scope.editMode = 'text'
  //             $state.go('app.product.home')
  //             $scope.showMobileDesigner()
  //         }
  //       }
  //     }, 100)

  // 	$scope.drawCanvas()

  // }

  $scope.setFontCategory = function (category) {
    $scope.selectedFontCategory = category
  }
})
