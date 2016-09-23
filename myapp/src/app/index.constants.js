/* global malarkey:false, moment:false */
;(function () {
  'use strict'

  angular
    .module('myApp')
    .constant('malarkey', malarkey)
    .constant('_', window._)
    .constant('apiUrl', 'http://localhost/printpixel/')
    .constant('moment', moment)
})()
