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

// /////////////////////////////////////////////////////////// //
//  Developed for YaTWi                                        //
//  under MIT license                                          //
// /////////////////////////////////////////////////////////// //

function get_complains(callback) {
  return $.ajax({
    url: '/assets/php/lib/clients/get_complaints.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password()
    },
    success: function (data) {
      var out = JSON.parse(data)
      out = out
      callback(out)
    }
  })
}

function complain_list() {
  get_complains(function (out) {
    if (out.success === true) {
      out = out.data
      var cache = ''
      out.forEach(function (item, index, arr) {
        var out2 = out[index]
        cache = cache + '<div id="complain_' + out2.tcldbid + out2.fcldbid + '" class="complain_card"><p class="grid-content"><span class="highlight_text">User: </span>' + out2.tname + '</br><span class="highlight_text"> Message: </span>' + out2.message + '</br><span class="highlight_text"> By: </span>' + out2.fname + '</p><a class="complain_remove grid-content shrink" onclick="remove_complain(' + out2.tcldbid + ',' + out2.fcldbid + ')">X</a></div>'
      })
      $('#complains').html(cache)
    } else {
      $('#complains').html('<p>No Complains</p>')
    }
  })
}

function delete_complain (tcldbid, fcldbid, callback) {
  return $.ajax({
    url: '/assets/php/lib/clients/remove_complaints.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password(),
      'tcldbid': tcldbid,
      'fcldbid': fcldbid
    },
    success: function (data) {
      var out = JSON.parse(data)
      out = out
      callback(out)
    }
  })
}

function remove_complain (tcldbid, fcldbid) {
  console.log(tcldbid + ' / ' + fcldbid)
  delete_complain(tcldbid, fcldbid, function (out) {
    if (out.success === true) {
      $('#complain_' + tcldbid + fcldbid).remove()
      console.log('Removed ' + tcldbid + fcldbid)
    } else if (out.success === false) {
      console.log('Something went wrong: ' + out.error)
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

/*
 *  Server View Module
 *  Description: Creates a viewable list of all channels and clients in channels in HTML
 */

function get_clients (callback) {
  return $.ajax({
    url: '/assets/php/lib/clients/get_clients.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password()
    },
    success: function (data) {
      var clients = JSON.parse(data)
      callback(clients)
    }
  })
}

function get_channels (callback) {
  return $.ajax({
    url: '/assets/php/lib/server/get_channel.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password()
    },
    success: function (data) {
      var channels = JSON.parse(data)
      channels = channels
      callback(channels)
    }
  })
}

function get_server_view () {
  get_channels(function (channels) {
    if (channels.success === true) {
      var channels = channels.data
      var chache = ''
      channels.forEach(function (item, index, arr) {
        var channels2 = channels[index]
        chache = chache + '<div id="channel_' + channels2.cid + '" class="channel-card" title="' + channels2.channel_topic + '">' + channels2.channel_name + '<span id="channel_client_container_' + channels2.cid + '"></span></div>'
      })
      $('#server_view').html(chache.replace(/(\[[cr]*spacer[0-9]+\])/g, ''))
      get_clients(function (clients) {
        if (clients.success === true) {
          var clients = clients.data
          var chache = {}
          clients.forEach(function (item, index, arr) {
            var clients2 = clients[index]
            chache[clients2.cid] = ''
          })
          clients.forEach(function (item, index, arr) {
            var clients2 = clients[index]
            chache[clients2.cid] = chache[clients2.cid] + '<div id="client_' + clients2.clid + '" class="client-card">' + clients2.client_nickname + '</div>'
            $('#channel_client_container_' + clients2.cid).html(chache[clients2.cid])
          })
        } else {
          console.log('Something went wrong while retriving the clients:')
        }
      })
    }
  })
}
