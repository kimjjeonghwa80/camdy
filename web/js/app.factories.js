angular.module('app.factories', [])
.factory('PrintshopFactory', function($resource) {
  return $resource('https://api.dropp.photo/merchandise/:pk', { pk: '@pk' }, {
    update: {
      method: 'PUT'
    }
  });
});