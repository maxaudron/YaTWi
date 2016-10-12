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
            onEnter: function(){
              console.log('Home');
              populate_dashboard();
              complain_list();
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

/////////////////////////////////////////////////////////////////
////  Authentification functions                             ////
////  Developed for YaTWi                                    ////
////  Licensed under MIT license                             ////
/////////////////////////////////////////////////////////////////

// Write session cookie
function writeCookie (name, value, days) {
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

var retrive_user = (function() {
  var userdata = readCookie('SessionId');
  var userdata = userdata.split('/~/');
  var username = function(){return userdata[0]};
  var password = function(){return userdata[1]};
  return {username:username, password:password};
}());

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
        writeCookie('SessionId', username + '/~/' + password, sessiontimeout);
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
////  Developed for YaTWi                                    ////
////  under MIT license                                      ////
/////////////////////////////////////////////////////////////////

function get_complains(callback) {
  return $.ajax({
    url: '/assets/php/lib/clients/get_complaints.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password()
    },
    success: function(data) {
      var out = JSON.parse(data)
      var out = out
      callback(out)
    }
  })
}

function complain_list() {
  get_complains(function(out) {
    if (out.success === true) {
      var out = out.data
      var out3
      out.forEach(function(item, index, arr) {
        var out2 = out[index]
        var out3 = out3 + '<p><span class="highlight_text">User: </span>' + out2.tname + '</br><span class="highlight_text"> Message: </span>' + out2.message + '</br><span class="highlight_text"> By: </span>' + out2.fname + '</p>'
      })
      console.log(out3);
    } else {
      $('#complains').html('<p>No Complains</p>')
    }
  })
}

/////////////////////////////////////////////////////////////////
////  Implementation of Basic Server Features                ////
////  Developed for YaTWi                                    ////
////  under MIT license                                      ////
/////////////////////////////////////////////////////////////////

function get_server_info(callback) {
  return $.ajax({
    url: '/assets/php/lib/server/get_server_info.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password()
    },
    success: function(data) {
      var serverInfo = JSON.parse(data)
      var serverInfo = serverInfo.data
      callback(serverInfo)
    }
  })
}

function populate_dashboard() {
  get_server_info(function(serverInfo) {
    $('#ts_name').html(serverInfo.virtualserver_name)
    $('#ts_motd').html(serverInfo.virtualserver_welcomemessage)
    $('#ts_clients_online').html(serverInfo.virtualserver_clientsonline)
    $('#ts_clients_max').html(serverInfo.virtualserver_maxclients)
    $('#ts_port').html(serverInfo.virtualserver_port)
    $('#ts_version').html(serverInfo.virtualserver_version)
    $('#ts_platform').html(serverInfo.virtualserver_platform)
    $('#ts_runtime').html(moment("2015-01-01")
      .startOf('day')
      .seconds(serverInfo.virtualserver_uptime)
      .format('HH[hours] mm[mins]'))
    $('#ts_data_transfered_up').html(Math.round10(serverInfo.connection_bytes_sent_total / 1024000, -2))
    $('#ts_data_transfered_down').html(Math.round10(serverInfo.connection_bytes_received_total / 1024000, -2))
    $('#ts_banner').attr('src', serverInfo.virtualserver_hostbanner_gfx_url)
  })
}
