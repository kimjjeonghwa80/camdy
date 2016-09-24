/* global malarkey:false, moment:false */
;(function () {
  'use strict'

  angular
    .module('myApp')
    .constant('malarkey', malarkey)
    .constant('_', window._)
    .constant('apiUrl', 'http://localhost:304/printpixel/')
    .constant('moment', moment)
})()
