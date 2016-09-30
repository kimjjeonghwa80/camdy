angular.module('myApp', [
  'ngSanitize',
  'truncate',
  'ui.router',
  'ui.bootstrap',
  'app.controller',
  'app.directive',
  'ui.router.metatags',
  'LocalStorageModule'
  //'ngResource'
])
  .config(['$stateProvider', '$urlRouterProvider', 'UIRouterMetatagsProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, UIRouterMetatagsProvider, $locationProvider) {
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
    $urlRouterProvider.otherwise('printshop')

    $stateProvider
      .state('printshop', { // State demonstrating Nested views
        url: '/printshop',
        templateUrl: 'partials/printshop.html',
        controller: 'printshopCtrl',
        metaTags: {
          title: 'Printshop',
          keywords: keywords
        }

      })
      .state('printshopCategory', { // State demonstrating Nested views
        url: '/printshopCategory/:category',
        templateUrl: 'partials/printshop_category.html',
        controller: 'printshopCategoryCtrl'
      })

      .state('printshopDetail', { // State demonstrating Nested views
        url: '/printshopDetail/:category/:product',
        templateUrl: 'partials/printshop_detail.html',
        controller: 'printshopDetailCtrl'
      })


      .state('contactus', {
        url: '/contactus',
        templateUrl: 'partials/contactus.html',
        controller: 'ContactController',
        metaTags: {
          title: 'Contact Us',
          keywords: keywords
        }

      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'partials/faq.html',
        controller: 'faqCtrl',
        metaTags: {
          title: 'FAQ',
          keywords: keywords
        }
      })
      .state('terms_condition', {
        url: '/terms_condition',
        templateUrl: 'partials/terms_condition.html',
        metaTags: {
          title: 'TERMS & CONDITION',
          keywords: keywords
        }
      })

      .state('privacy', {
        url: '/privacy',
        templateUrl: 'partials/privacy.html',
        metaTags: {
          title: 'PRIVACY & POLICY',
          keywords: keywords
        }
      })      
      .state('blog', {
        url: '/blog',
        templateUrl: 'partials/blog.html',
        controller: 'blogCtrl',
        metaTags: {
          title: 'Blog',
          keywords: keywords
        }
      })
      .state('blogDetail', {
        url: '/blog/:slug',
        templateUrl: 'partials/blog-detail.html',
        controller: 'blogDetailCtrl',
        metaTags: {
          title: 'Blog',
          keywords: keywords
        }

      });
      
      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope', 'MetaTags', function ($rootScope, MetaTags) {
    $rootScope.MetaTags = MetaTags
  }])
