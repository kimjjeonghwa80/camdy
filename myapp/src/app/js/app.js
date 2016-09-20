angular.module('myApp', [
  'ngSanitize',
  //'truncate',
 // 'ui.router',
  'ui.bootstrap',
  'app.controller',
  'app.directive',
  'ui.router.metatags',
  'ngFileUpload',
  'LocalStorageModule'
  //'ngResource'
])
  .config(['$stateProvider', '$urlRouterProvider', 'UIRouterMetatagsProvider',  '$locationProvider',  function ($stateProvider, $urlRouterProvider, UIRouterMetatagsProvider,  $locationProvider) {
    var keywords = 'camdy, camdy app, print, gift, photo, malaysia, print in malaysia, eprint in malaysia,\
    customized gift, customised gift, personalized gift, personalised gift, print on t-shirt, print on cuhsion,\
   print on mug, print on mousepad, print on ceramic tile, print on puzzle, print on phone cover, print photo 4R,\
    custom printed canvas, print on canvas, custom printed coasters, print on coasters, customized badges,\
    customised badges, personalized photobook, personalised photobook, print on baby rumper, print on caps,\
    customised postcsrd, customized postcard, print on mini teee, personalised greeting card,\
    personalized greeting card, print on glass clock, print on baby Napkin, print on keychain'
    UIRouterMetatagsProvider
      .setTitlePrefix('')
      .setTitleSuffix(' | CAMDY')
      .setDefaultTitle('Bring Your Memories Into Gifts - CAMDY ')
      .setDefaultDescription('CAMDY is a gifting app to Share, Store, Edit and Print their picture onto \
            gifts and merchandise such as mug, t-shirt, puzzle, badges, postcard and many more.')
      .setDefaultKeywords('keywords')
      .setStaticProperties({
        // 'fb:app_id': 'your fb app id',
        // 'og:site_name': 'your site name'
      })
      .setOGURL(true)

    // For any unmatched url, send to /business
    $urlRouterProvider.otherwise('blog')

    $stateProvider
      .state('Camdy', { // State demonstrating Nested views
        url: '',
        templateUrl: 'app/partials/printshop.html',
        controller: 'printshopCtrl',
        metaTags: {
          title: 'Printshop',
          keywords: keywords
        }

      })
       .state('printshop', { // State demonstrating Nested views
        url: '/printshop',
        templateUrl: 'app/partials/printshop.html',
        controller: 'printshopCtrl',
        metaTags: {
          title: 'Printshop',
          keywords: keywords
        }

      })
      .state('printshopCategory', { // State demonstrating Nested views
        url: '/printshopCategory/:category',
        templateUrl: 'app/partials/printshop_category.html',
        controller: 'printshopCategoryCtrl'
      })

      .state('printshopDetail', { // State demonstrating Nested views
        url: '/printshopDetail/:category/:product',
        templateUrl: 'app/partials/printshop_detail.html',
        controller: 'printshopDetailCtrl'
      })


      .state('contactus', {
        url: '/contactus',
        templateUrl: 'app/partials/contactus.html',
        controller: 'ContactController',
        metaTags: {
          title: 'Contact Us',
          keywords: keywords
        }

      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'app/partials/faq.html',
        controller: 'faqCtrl',
        metaTags: {
          title: 'FAQ',
          keywords: keywords
        }
      })
      .state('terms_condition', {
        url: '/terms_condition',
        templateUrl: 'app/partials/terms_condition.html',
        metaTags: {
          title: 'TERMS & CONDITION',
          keywords: keywords
        }
      })

      .state('privacy', {
        url: '/privacy',
        templateUrl: 'app/partials/privacy.html',
        metaTags: {
          title: 'PRIVACY & POLICY',
          keywords: keywords
        }
      })      
      .state('blog', {
        url: '/blog',
        templateUrl: 'app/partials/blog.html',
        controller: 'blogCtrl',
        metaTags: {
          title: 'Blog',
          keywords: keywords
        }
      })
      .state('blogDetail', {
        url: '/blog/:id',
        templateUrl: 'app/partials/blog-detail.html',
        controller: 'blogDetailCtrl',
        metaTags: {
          title: 'Blog',
          keywords: keywords
        }

      })
      .state('customize-product', {
        url: '/product/custom',
        templateUrl: 'app/partials/customize.html',
        controller: 'customizeCtrl'
      })
      /*
                             .state('portfolio', {  //State demonstrating Multiple,named views
                                  url: "/portfolio",
                                  views: {
                                      ""  :    { templateUrl: "portfolio.html" }, //default or parent view
                                      "view1@portfolio": { template: "Write whatever you want, it's your virtual company." },
                                      "view2@portfolio": { templateUrl: "clients.html" ,
                                          controller: function($scope){
                                                  $scope.clients = ["HP", "IBM", "MicroSoft"]
                                          }
                                      }
                                  }
                              })
      */

      .state('custom', {
        url: '/custom',
        views: {
          '': {
            templateUrl: 'app/partials/customize.html',
            controller: 'customizeCtrl'

          },
          'edit_text': {
            templateUrl: 'app/views/text.edit.html',
            controller: 'TextEditController'
          },
          'edit_image': {
            templateUrl: 'app/views/images.edit.html',
            controller: 'ImagesEditController'
          }
        }
      })

      // IMAGES STATES AND NESTED app/views ========================================
      .state('custom.images', {
        url: '/images',
        abstract: true,
        templateUrl: 'app/views/image.html',
        controller: 'ImagesController'
      })
      .state('custom.images.home', {
        url: '/home',
        templateUrl: 'app/views/images.home.html'
      })
      .state('custom.images.clip-art', {
        url: '/clip-art',
        templateUrl: 'app/views/images.clip-art.html',
        controller: 'ImagesGraphicsController'
      })
      .state('custom.images.add-graphic', {
        url: '/add-graphic/*path',
        controller: 'ImagesAddGraphicController'
      })
      .state('custom.images.upload', {
        url: '/upload',
        templateUrl: 'app/views/images.upload.html',
        controller: 'ImagesUploadController'
      })
      .state('custom.images.my-images', {
        url: '/my-images',
        templateUrl: 'app/views/images.my-images.html',
        controller: 'ImagesBoxController'
      })
      .state('custom.images.edit', {
        url: '/edit',
        templateUrl: 'app/views/images.edit.html',
        controller: 'ImagesEditController'
      })
      // TEXT STATES AND NESTED app/views ========================================
      .state('custom.text', {
        url: '/text',
        abstract: true,
        templateUrl: 'app/views/viewer.html',
        controller: 'TextController'
      })
      .state('custom.text.add', {
        url: '/add',
        templateUrl: 'app/views/text.add.html'
      })
      .state('custom.text.edit', {
        url: '/edit',
        templateUrl: 'app/views/text.edit.html',
        controller: 'TextEditController'
      });

      $locationProvider.html5Mode(true);

  }])
  .run(['$rootScope', 'MetaTags', function ($rootScope, MetaTags) {
    $rootScope.MetaTags = MetaTags
  }])
