angular.module('app.factories', [])
.factory('Printshop', function ($resource) {
      var data = $resource('https://api.dropp.photo/merchandise/:pk', {pk: '@pk'}, {
      update:{
          method:'PUT'
          }
      });
      return data;
  })