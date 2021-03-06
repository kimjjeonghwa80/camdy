// var API_URL = "http://localhost:8000/"
var API_URL = 'https://api.dropp.photo/'

angular.module('app.controller', [])

  .controller('faqCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '../laravel/public/api/v1/faqs'
    }).then(function mySuccess (response) {
      $scope.faqs = response.data.data
    }, function myError (response) {
      $scope.faqs = response.status + response.statusText
    })
    $scope.msg = 'FAQ'
  })

  .controller('blogCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '../laravel/public/api/v1/blogs'
    }).then(function mySuccess (response) {
      $scope.blogs = response.data
    }, function myError (response) {
      $scope.blogs = response.status + response.statusText
    })
    $scope.msg = 'blog'
  })
  // we use stateParams instead of routeParams because we using ui-route
  .controller('blogDetailCtrl', function ($scope, $http, $stateParams) {
    $http({
      method: 'GET',
      // url: "http://camdy.app/laravel/public/api/v1/blogs/" + $stateParams.id
      url: '../laravel/public/api/v1/blogs/' + $stateParams.id
    }).then(function mySuccess (response) {
      $scope.blogs = response.data.data
      $scope.titles = response.data.data.title
    }, function myError (response) {
      $scope.blogs = response.status + response.statusText
    })
    $scope.msg = 'blog Detail'
  })
  .controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage
    $scope.formData; // formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false
    $scope.submitted = false // used so that form errors are shown only after the form has been submitted
    $scope.submit = function (contactform) {
      $scope.submitted = true
      $scope.submitButtonDisabled = true
      if (contactform.$valid) {
        $http({
          method: 'POST',
          url: 'contact-form.php',
          data: $.param($scope.formData), // param method from jQuery
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
        }).success(function (data) {
          if (data.success) { // success comes from the return json object
            $scope.submitButtonDisabled = true
            $scope.resultMessage = data.message
            $scope.result = 'bg-success'
          } else {
            $scope.submitButtonDisabled = false
            $scope.resultMessage = data.message
            $scope.result = 'bg-danger'
          }
        })
      } else {
        $scope.submitButtonDisabled = false
        $scope.resultMessage = 'Error :( Technical error.'
        $scope.result = 'bg-danger'
      }
    }
  })
  .controller('printshopCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: API_URL + 'merchandise/?order=sort'
    }).then(function mySuccess (response) {
      $scope.products = response.data
    }, function myError (response) {
      $scope.products = response.status + response.statusText
    })
    $scope.msg = 'PrintShop'
  })

  .controller('printshopCategoryCtrl', function ($scope, $stateParams, $http) {
    $http({
      method: 'GET',
      url: API_URL + 'merchandise/' + $stateParams.category
    }).then(function mySuccess (response) {
      $scope.products = response.data
    }, function myError (response) {
      $scope.products = response.status + response.statusText
    })
    $scope.category = $stateParams.category
    $scope.msg = 'PrintShop Detail'
  })