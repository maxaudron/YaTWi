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

/////////////////////////////////////////////////////////////////
////  Authentification functions                             ////
////  Developed for YaTWi                                    ////
////  Licensed under MIT license                             ////
/////////////////////////////////////////////////////////////////

// Write session cookie
function writeCookie(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}


// Read Session cookie
function readCookie(name) {
  var i, c, ca, nameEQ = name + "=";
  ca = document.cookie.split(';');
  for (i = 0; i < ca.length; i++) {
    c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return '';
}

// Delete Cookie
function eraseCookie(name) {
  writeCookie(name, "", -1);
}

function login(form) {
  var username = document.loginform.username.value;
  var password = document.loginform.password.value;
  var sessiontimeout = document.loginform.session_timeout.checked;
  if (sessiontimeout == true) {
    var sessiontimeout = '30';
  } else {
    var sessiontimeout = '1';
  }
  $.ajax({
    url: '/assets/php/lib/server/login.php',
    type: 'post',
    data: {
      'username': username,
      'password': password
    },
    success: function(data) {
      if (data == 'Login success') {
        console.log(data);
        writeCookie('SessionId', '?' + username + '?$?' + password + '?', sessiontimeout);
        location.assign('/#/');
      } else if (data == 'Connection failed') {
        console.log(data);
        $('#connect_fail').show(1000);
      } else if (data == 'Login failed') {
        console.log(data);
        $('#login_fail').show(1000);
      }
    }
  });
}

function logout() {
  eraseCookie('SessionId');
  location.assign('/#/login');
}

function login_check() {
  if (document.cookie.indexOf('SessionId') >= 0) {
    return true;
  } else {
    return false;
  }
}



/*
var sId = readCookie('sessionId') // Cokie write
var sId = 's234543245';
writeCookie('sessionId', sId, 3); // Cokie Read

*/

/////////////////////////////////////////////////////////////////
////  Implementation of Basic Server Features                ////
////  Developed for YaTWi                                    ////
////  under MIT license                                      ////
/////////////////////////////////////////////////////////////////
