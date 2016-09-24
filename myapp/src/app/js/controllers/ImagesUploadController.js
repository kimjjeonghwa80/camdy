/**
 * 
 * Controller for uploading images
 * 
 */
angular.module('myApp').controller('ImagesUploadController', function ($scope,
  $location, $urlRouter, $stateParams, $http, Upload, $timeout, ApiService,$rootScope,localStorageService ) {
  $scope.progress = 0
  $scope.file = null
  $scope.src = null
  $scope.whitespace = 0
  $scope.error = false
  // $scope.setActiveTab('images')

  $scope.humanFileSize = function (bytes) {
    bytes = parseInt(bytes)
    var thresh = 1024
    if (bytes < thresh) return bytes + ' B'
    var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var u = -1
    do {
      bytes /= thresh
      ++u
    } while (bytes >= thresh)
    return bytes.toFixed(1) + ' ' + units[u]
  }

  $scope.onFileSelect = function ($files) {
    console.log($files)
    $scope.error = false
    $scope.progress = 0

    if ($files.length > 1) {
      $scope.error = 'Please upload only one item at a time!'
      return
    }
    $scope.src = 'app/css/images/loading_blank.gif'
    // $files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      if ($files[i].type.indexOf('image') === -1) {
        $scope.error = 'Only images are allowed'
        continue
      }

      $scope.file = $files[i]
      var fileReader = new FileReader()
      fileReader.readAsDataURL($files[i])

      var loadFile = function (fileReader, index) {
        fileReader.onload = function (e) {
          $timeout(function () {
            $scope.src = e.target.result
          })
        }
      }(fileReader, i)

    // .error(...)
    // .then(success, error, progress); 
    // access or attach event listeners to the underlying XMLHttpRequest.
    // .xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
  /* alternative way of uploading, send the file binary with the file's content-type.
     Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
     It could also be used to monitor the progress of a normal http post/put request with large data*/
  // $scope.upload = Upload.http({...})  see 88#issuecomment-31366487 for sample code.
  }

  $scope.startUpload = function () {
    $scope.progress = 1
    $scope.upload = Upload.upload({
      url: ApiService.Url('http://uploads.im/api?upload'),
      method: 'POST',
      //  data: {'whitespace': $scope.whitespace},
      // fields: {'whitespace': $scope.whitespace},
      data: { file: $scope.file}
    }).progress(function (evt) {
      $scope.progress = parseInt(100.0 * evt.loaded / evt.total)
    }).success(function (data, status, headers, config) {
      console.log(data)
      var imageUrl = data.data.img_url
      if (localStorageService.get('uploadedItems')) {
        var uploaded =  localStorageService.get('uploadedItems');
        uploaded.push(imageUrl)
        localStorageService.set('uploadedItems', uploaded);
       
      } else {
        var arr = [imageUrl]
        localStorageService.set('uploadedItems',arr)
      }


      // file is uploaded successfully
      //  $scope.addImage(  $scope.uploadURL(data.filepath) )
      $scope.file = null
    })
  }
  $scope.setWhiteSpace = function (whitespace) {
    $scope.whitespace = whitespace
    console.log('setWhiteSpace', $scope.whitespace)
  }

  $scope.init = function () {}

  $scope.init()
})
