/**
 * 
 * Controller for clip art
 * 
 */
angular.module('myApp').controller('ImagesGraphicsController', function( $scope, $location, $urlRouter,
 $stateParams, $http, $timeout, ApiService, $state) {
    
    this.name = "ImagesGraphicsController";
    this.params = $stateParams;
	$scope.canvas = new fabric.Canvas('designer-canvas');
       $scope.selectedItem =  window.localStorage.getItem('selectedItem');
  
window.onload = function() {
}
$scope.canvas.setBackgroundImage($scope.selectedItem ,
$scope.canvas.renderAll.bind($scope.canvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStretch: false
});
    $scope._ = _;
    $scope.clipArt = null;
    $scope.categories = null;
    window.scope = $scope;

  //  $scope.setActiveTab('images');

    $scope.addClipart = function(img) {
        console.log('img', img);


       fabric.loadSVGFromURL(img, function(objects, options) { 
    var myobj = fabric.util.groupSVGElements(objects,  { 
          left: 180, 
          top: 120, 
          width: 35, 
          height: 35 
        } );
           
        //   var group = new fabric.PathGroup(objects, { 
        //   left: 180, 
        //   top: 120, 
        //   width: 35, 
        //   height: 35 
        // }); 
        $scope.canvas.add(myobj); 
      //  $scope.canvas.renderAll(); 
          }); 

        // fabric.loadSVGFromURL(img.svg.url, function(ob,op){
            			
        //     $scope.canvas.add(new fabric.PathGroup(ob, op).set({ left: 100, top: 100 }));
        //     $scope.canvas.setActiveObject($scope.canvas.item($scope.canvas.getObjects().length - 1));
            
        //     var max_width = $scope.canvas.width * 0.5;
        //     var max_height = $scope.canvas.height * 0.5;

        //     var new_width = max_width;
        //     if(op.width < max_width) {
        //         new_width = op.width;
        //     }

        //     //find ratio
        //     var width_ratio = new_width  / op.width;
        //     var new_height = op.height * width_ratio;
        //     console.log("still too big");
        //     if(new_height > max_height) { //still too big
        //         new_height = max_height;
        //         var height_ratio = new_height / op.height;
        //         new_width = op.width * height_ratio;
        //     }

		// 	var fill = getBorderColor(_.first($scope.currentItem.variant.colors));
		// 	if(fill == '#FFFFFF') {
		// 		var editable = $scope.canvas.getActiveObject();
		// 		_.each(editable.paths, function(path, index) {
					
        //             if(angular.isUndefined(path.fill.type)) {
		// 				if(path.fill == '#000000') {
		// 					path.fill = '#FFFFFF';
		// 				}                        
        //             }
                    
        //         });
		// 		$scope.canvas.item(editable);
		// 	}
        //     $scope.canvas.getActiveObject().set({
        //         scaleX:(new_width/op.width),
        //         scaleY:(new_height/op.height)
        //     }).center().setCoords();			
        //     $scope.canvas.setActiveObject($scope.canvas.item($scope.canvas.getObjects().length - 1));
        //     $scope.drawCanvas();
            
        //     //make sure it's selected and updated
        //     $scope.canvas.setActiveObject($scope.canvas.item($scope.canvas.getObjects().length - 1));
        //     $scope.drawCanvas();

        //     //
        //     if($scope.isMobile) {
        //         $state.go('custom.product.home');
        //         $scope.showMobileDesigner();
        //     }
        // });

    };
    
    $scope.setCategory = function(category) {
         $scope.selectedCategory = category;
    };

    $scope.clipArtImage = function(clipArt) {
        return ApiService.Url(clipArt.path);
    }
    
    $scope.loadClipArt = function() {
        $scope.clipArt = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'];
        // var clipArtUrl = ApiService.Url("https://openclipart.org/search/json/?query=animal&amount=25");
        // $http({method: 'GET', url: clipArtUrl, cache: false}).
        // success(function(data, status, headers, config) {
        //     // this callback will be called asynchronously
        //     // when the response is available
        //     $scope.clipArt = data.payload;
        //     $scope.categories = ['animals'];//_.uniq(_.pluck($scope.clipArt, 'category'));
        //     $scope.selectedCategory = _.first($scope.categories);
        // }).
        // error(function(data, status, headers, config) {
        //     // called asynchronously if an error occurs
        //     // or server returns response with an error status.
        // });
    }
    $scope.loadClipArt();

    $scope.init = function() {
    };
    $scope.init();
	
	
	//added for certain clients
	$scope.updateColors = function() {
		
		_.each($scope.editable.original_colors, function(path, index) {

			var fill = _.find($scope.colors, {original:path.fill});

			if(fill && fill.replacement != null) {
				console.log('updateColors', $scope.editable.paths[index].fill, fill.replacement);

				$scope.editable.paths[index].fill = fill.replacement;
			}

		});
		
		//now update the view
		var item = $scope.canvas.item($scope.editableItem);
		if(item != null) {
			item.set('paths', $scope.editable.paths);
			item.original_colors = $scope.original_colors;
		}
		$scope.drawCanvas();

	};

	$scope.switchColor = function(color, replacement) {
		color.replacement = replacement;
		$scope.updateColors();
	};


});