(function() {
  'use strict';

  angular.module('application', [
      'ui.router',
      'ui.router.stateHelper',
      'permission',
      'permission.ui',
      'ngAnimate',

      //foundation
      'foundation',
      //'foundation.dynamicRouting',
      //'foundation.dynamicRouting.animations'
    ])
    .config(
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('parent', {
            templateUrl: 'templates/parent.html',
            abstract: true
          })
          .state('root', {
            url: '',
            templateUrl: 'templates/login.html',
          })
          .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            parent: 'parent',
            data: {
              permissions: {
                only: 'isAuthorized',
                redirectTo: 'login'
              }
            },
            onEnter: function (){
              console.log('Home')
              populate_dashboard()
              complain_list()
              get_server_view()
            }
          })
          .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
            parent: 'parent',
            data: {
              permissions: {
                only: 'isAuthorized',
                redirectTo: 'login'
              }
            },
            onEnter: function(){
              console.log('settings');
            }
          })
          .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            data: {
              permissions: {
                only: 'anonymous',
                redirectTo: 'home'
              }
            }
          })
          .state('test2', {
            url: '/test2',
            templateUrl: 'templates/home.html',
            parent: 'parent',
            data: {
              permissions: {
                only: 'isAuthorized',
                redirectTo: 'login'
              }
            }
          })
          .state('test', {
            url: '/test',
            templateUrl: 'templates/test.html',
            parent: 'parent',
            data: {
              permissions: {
                only: 'isAuthorized',
                redirectTo: 'login'
              }
            }
          })
      })
    .run(run)
    .run(function(PermPermissionStore) {
      PermPermissionStore
        .definePermission('anonymous', function() {
          var auth = login_check();
          if (auth == true) {
            return false;
          } else if (auth == false) {
            return true;
          }
        })
    })

  .run(function(PermPermissionStore) {
    PermPermissionStore
      .definePermission('isAuthorized', function() {
        var auth = login_check();
        if (auth == true) {
          return true;
        } else if (auth == false) {
          return false;
        }
      })
  });

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();

(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
