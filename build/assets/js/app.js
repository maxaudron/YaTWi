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
            abstract: true,
            onEnter: function () {
              create_server_list()
            }
          })
          .state('root', {
            url: '',
            templateUrl: 'templates/login.html'
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
          .state('livechat', {
            templateUrl: 'templates/livechat.html',
            url: '/livechat'
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
              console.log('settings')
            }
          })
          .state('login-parent', {
            templateUrl: 'templates/login-parent.html',
            abstract: true
          })
          .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            parent: 'login-parent',
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
          var auth = login_check()
          if (auth === true) {
            return false
          } else if (auth === false) {
            console.log('anon');
            return true
          }
        })
    })

  .run(function(PermPermissionStore) {
    PermPermissionStore
      .definePermission('isAuthorized', function() {
        var auth = login_check()
        if (auth === true) {
          console.log('authed')
          return true
        } else if (auth === false) {
          return false
        }
      })
  })

  config.$inject = ['$urlRouterProvider', '$locationProvider']

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/')

    locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    })

    $locationProvider.hashPrefix('!')
  }

  function run() {
    FastClick.attach(document.body)
  }

  var app = angular.module('application')


function call_php (callback, action, var1, var2, var3, var4) {
  return $.ajax({
    url: '/assets/php/ts.php',
    type: 'post',
    data: {
      'action': action,
      'var1': var1,
      'var2': var2,
      'var3': var3,
      'var4': var4
    },
    success: function (data) {
      var out = JSON.parse(data)
      console.log(out);
      callback(out)
    }
  })
}

/*(function () {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  /*function decimalAdjust (type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value)
    }
    value = +value
    exp = +exp
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN
    }
    // Shift
    value = value.toString().split('e')
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
    // Shift back
    value = value.toString().split('e')
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust('round', value, exp)
    }
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust('floor', value, exp)
    }
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust('ceil', value, exp)
    }
  }
})()*/

// ///////////////////////////////////////////////////////////////
// //  Authentification functions                             ////
// //  Developed for YaTWi                                    ////
// //  Licensed under MIT license                             ////
// ///////////////////////////////////////////////////////////////

// Write session cookie
function writeCookie (name, value, days) {
  var date, expires
  if (days) {
    date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  } else {
    expires = ""
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}


// Read Session cookie
function readCookie (name) {
  var i, c, ca, nameEQ = name + '='
  ca = document.cookie.split(';')
  for (i = 0; i < ca.length; i++) {
    c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return ''
}

// Delete Cookie
function eraseCookie (name) {
  writeCookie(name, '', -1)
}

var retrive_user = (function () {
  var userdata = readCookie('SessionId')
  userdata = userdata.split('/~/')
  var username = function () { return userdata[0] }
  var password = function () { return userdata[1] }
  return {username: username, password: password}
}())

function login(form) {
  var username = document.loginform.username.value
  var password = document.loginform.password.value
  var sessiontimeout = document.loginform.session_timeout.checked
  if (sessiontimeout === true) {
    sessiontimeout = '30'
  } else {
    sessiontimeout = '1'
  }
  $.ajax({
    url: '/assets/php/auth.php',
    type: 'post',
    data: {
      'username': username,
      'password': password,
      'action': 'login'
    },
    success: function (data) {
      if (data === '200') {
        location.assign('/#/')
      } else if (data === '503') {
        console.log(data)
        $('#connect_fail').show(1000)
      } else if (data === '401') {
        console.log(data)
        $('#login_fail').show(1000)
      }
    }
  })
}

function logout () {
  $.ajax({
    url: '/assets/php/auth.php',
    type: 'post',
    data: {
      'action': 'logout'
    },
    success: function() {
      eraseCookie('PHPSESSID')
    }
  })
  location.assign('/#/login')
}

function login_check () {
  if (document.cookie.indexOf("PHPSESSID") >= 0) {
    return true
  } else {
    return false
  }
}

/*function login_check_handler (callback) {
  return $.ajax({
    url: '/assets/php/auth.php',
    type: 'post',
    data: {
      'action': 'login_check'
    },
    success: function (data) {
      console.log(data)
      callback(data)
    }
  })
}*/

/*
var sId = readCookie('sessionId') // Cokie write
var sId = 's234543245';
writeCookie('sessionId', sId, 3); // Cokie Read

*/

// /////////////////////////////////////////////////////////// //
//  Developed for YaTWi                                        //
//  under MIT license                                          //
// /////////////////////////////////////////////////////////// //

function complain_list() {
  call_php(function (out) {
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
  }, 'complainList')
}

function remove_complain (tcldbid, fcldbid) {
  console.log(tcldbid + ' / ' + fcldbid)
  call_php(function (out) {
    if (out.success === true) {
      $('#complain_' + tcldbid + fcldbid).remove()
      console.log('Removed ' + tcldbid + fcldbid)
    } else if (out.success === false) {
      console.log('Something went wrong: ' + out.error)
    }
  }, 'complainDelete', tcldbid, fcldbid)
}

/* Dialogs for functions */

function message_dialog(clients2) {
  console.log(clients2.client_nickname + ' und ' + clients2.clid);
  angular.injector(['ng', 'foundation']).invoke(function (ModalFactory) {
    var modal = new ModalFactory({
      // Add CSS classes to the modal
      // Can be a single string or an array of classes
      class: 'collapse',
      // Set if the modal has a background overlay
      overlay: true,
      // Set if the modal can be closed by clicking on the overlay
      overlayClose: false,
      // Define a template to use for the modal
      template: '<div class="grid-block vertical"><div class="grid-content padding" style="padding-top: 1rem;"><h4 id="message_recipant">Send Message to: ' + clients2.client_nickname + '</h4><form name="messageform"><input id="message_mode" type="text" placeholder="mode" style="display: none" /><input id="message_target" type="text" style="display: none" /><input id="message_content" name="message" type="text" placeholder="Your Message" /><a zf-close="" class="button" onclick="send_message(this.form, &apos;1&apos;,' + clients2.clid + ')">Send</a><a zf-close="" class="button">Cancel</a></form></div></div>',
      // Allows you to pass in properties to the scope of the modal
      contentScope: {
        close: function () {
          modal.deactivate()
          $timeout(function () {
            modal.destroy()
          }, 1000)
        }
      }
    })
    modal.activate()
  })
}

function poke_dialog(clients2) {
  console.log(clients2.client_nickname + ' und ' + clients2.clid);
  angular.injector(['ng', 'foundation']).invoke(function (ModalFactory) {
    var modal = new ModalFactory({
      // Add CSS classes to the modal
      // Can be a single string or an array of classes
      class: 'collapse',
      // Set if the modal has a background overlay
      overlay: true,
      // Set if the modal can be closed by clicking on the overlay
      overlayClose: false,
      // Define a template to use for the modal
      template: '<div class="grid-block vertical"><div class="grid-content padding" style="padding-top: 1rem;"><h4 id="message_recipant">Poke: ' + clients2.client_nickname + '</h4><form name="messageform"><input id="message_mode" type="text" placeholder="mode" style="display: none" /><input id="message_target" type="text" style="display: none" /><input id="message_content" name="message" type="text" placeholder="Your Message" /><a zf-close="" class="button" onclick="send_poke(this.form,' + clients2.clid + ')">Send</a><a zf-close="" class="button">Cancel</a></form></div></div>',
      // Allows you to pass in properties to the scope of the modal
      contentScope: {
        close: function () {
          modal.deactivate()
          $timeout(function () {
            modal.destroy()
          }, 1000)
        }
      }
    })
    modal.activate()
  })
}

function server_group_dialog() {

}

function kick_dialog() {

}

function ban_dialog() {

}

// ///////////////////////////////////////////////////////////////
// //  Messageing services                                    ////
// //  Developed for YaTWi                                    ////
// //  under MIT license                                      ////
// ///////////////////////////////////////////////////////////////

function send_message (form, msg_mode, target) {
  var msg = document.messageform.message.value
  console.log(msg)
  call_php(function (out) {}, 'sendMessage', msg_mode, target, msg)
}

function send_poke (form, target) {
  var msg = document.messageform.message.value
  console.log(msg)
  call_php(function (out) {}, 'clientPoke', target, msg)
}

/*function check_bottom () {
  var out = document.getElementById('out')
    // allow 1px inaccuracy by adding 1
  var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1
  if (isScrolledToBottom) {
    out.scrollTop = out.scrollHeight - out.clientHeight
  }
}

function live_chat (msg_mode) {
  $.ajax({
    url: '/assets/php/lib/clients/message.php',
    type: 'post',
    data: {
      'msg_mode': msg_mode,
      'action': 'listen'
    },
    success: function (data) {
      chat_handler(data)
    }
  })
}

function chat_handler (out) {
  if (out.success === true) {
    out = out.data
    var cache = ''
    out.forEach(function (item, index, arr) {
      var out2 = out[index]
      var msg = '<p><span class="highlight_text">' + out2.invokername + '</span>' + out2.msg
      $('#chat_' + out2.invokerid).append(msg)
    })
    $('#complains').html(cache)
  }
}

function spawn_chat_tab (invokerid, msg) {

}*/

// ///////////////////////////////////////////////////////////////
// //  Implementation of Basic Server Features                ////
// //  Developed for YaTWi                                    ////
// //  under MIT license                                      ////
// ///////////////////////////////////////////////////////////////

function server_status(server2) {
  if (server2.virtualserver_status === 'online') {
    return 'Stop'
  } else if (server2.virtualserver_status === 'offline') {
    return 'Start'
  } else {
    return ''
  }
}

function server_Start(sid) {
  call_php(function(sid) {
    console.log('Server started')
    create_server_list()
  }, 'serverStart', sid)
}

function server_Stop(sid) {
  call_php(function(sid) {
    console.log('Server stopped')
    create_server_list()
  }, 'serverStop', sid)
}

function server_select(sid) {
  $.ajax({
    url: '/assets/php/auth.php',
    type: 'post',
    data: {
      'sid': sid,
      'action': 'select_server'
    },
    success: function(data) {
      console.log('Server ' + sid + ' selected')
      populate_dashboard()
      complain_list()
      get_server_view()
    }
  })
}

function create_server_list () {
  call_php(function (server) {
    if (server.success === true) {
      server = server.data
      var chache = ''
      server.forEach(function (item, index, arr) {
        var server2 = server[index]
        chache = chache + '    <div id="server_' + server2.virtualserver_id + '" class="server-card"> <div class="grid-block"> <div class="grid-content small-12"> <p> <span class="highlight_text">Name:</span>' + server2.virtualserver_name + '</br> <span class="highlight_text">Port: </span>' + server2.virtualserver_port + '</br> <span class="highlight_text">Online: </span>' +
          server2.virtualserver_clientsonline + '/' + server2.virtualserver_maxclients + '</br> <span class="highlight_text">Status: </span>' + server2.virtualserver_status + ' </p></div> </div> <div class="grid-block"> <div class="grid-content expand"> <a class="serverbutton-prime" onclick="server_' + server_status(server2) + '(' + server2.virtualserver_id + ')">' + server_status(server2) + '</a> </div><div class="grid-content expand"> <a class="serverbutton-success" onclick="server_select(' + server2.virtualserver_id + ')">Select</a> </div> <div class="grid-content expand"> <a class="serverbutton-alert" onclick="server_delete(' + server2.virtualserver_id + ')">Delete</a> </div> </div> </div>'
      })
      $('#serverpanel').html(chache)
    } else {
      console.log('Could not retrive server list')
    }
  }, 'serverList')
}

function get_server_info(callback) {
  return $.ajax({
    url: '/assets/php/lib/server/get_server_info.php',
    type: 'post',
    data: {
      'selected_server': '1'
    },
    success: function(data) {
      var serverInfo = JSON.parse(data)
      serverInfo = serverInfo.data
      callback(serverInfo)
    }
  })
}

function populate_dashboard() {
  call_php(function(serverInfo) {
    serverInfo = serverInfo.data
    $('#ts_name').html(serverInfo.virtualserver_name)
    $('#ts_motd').html(serverInfo.virtualserver_welcomemessage)
    $('#ts_clients_online').html(serverInfo.virtualserver_clientsonline)
    $('#ts_clients_max').html(serverInfo.virtualserver_maxclients)
    $('#ts_port').html(serverInfo.virtualserver_port)
    $('#ts_version').html(serverInfo.virtualserver_version)
    $('#ts_platform').html(serverInfo.virtualserver_platform)
    $('#ts_runtime').html(serverInfo.virtualserver_uptime)
    $('#ts_data_transfered_up').html( /*Math.round10(*/ serverInfo.connection_bytes_sent_total / 1024000)
    $('#ts_data_transfered_down').html( /*Math.round10(*/ serverInfo.connection_bytes_received_total / 1024000)
    $('#ts_banner').attr('src', serverInfo.virtualserver_hostbanner_gfx_url)
  }, 'serverInfo')
}

/*
 *  Server View Module
 *  Description: Creates a viewable list of all channels and clients in channels in HTML
 */

var context_client = [{
  name: 'test',
  title: 'test button',
  className: 'primary',
  fun: function(data, event) {
    console.log(data, event);
  }
}];

function get_server_view() {
  call_php(function(channels) {
    if (channels.success === true) {
      var channels = channels.data
      var chache = ''
      channels.forEach(function(item, index, arr) {
        var channels2 = channels[index]
        chache = chache + '<div id="channel_"' + channels2.cid + ' class="channel-card" title="' + channels2.channel_topic + '">' + channels2.channel_name + '<span id="channel_client_container_' + channels2.cid + '"></span></div>'
      })
      $('#server_view').html(chache.replace(/(\[[cr]*spacer[0-9]+\])/g, ''))
      call_php(function (clients) {
        if (clients.success === true) {
          var clients = clients.data
          var chache = {}
          clients.forEach(function (item, index, arr) {
            var clients2 = clients[index]
            chache[clients2.cid] = ''
          })
          clients.forEach(function (item, index, arr) {
            var clients2 = clients[index]
            $.contextMenu({
              selector: '#client_' + clients2.clid,
              callback: function (key, options) {
                var m = 'clicked: ' + key
                window.console && console.log(m) || alert(m)
              },
              items: {
                'message': {
                  name: 'Send Message',
                  icon: 'edit',
                  callback: function (key, options) {
                    message_dialog(clients2)
                  }
                },
                'poke': {
                  name: 'Poke',
                  icon: 'cut',
                  callback: function (key, options) {
                    poke_dialog(clients2)
                  }
                },
                'servergroup': {
                  name: 'Change Server Group',
                  icon: 'copy',
                  callback: server_group_dialog(clients2)
                },
                'kick': {
                  name: 'Kick',
                  icon: 'paste',
                  callback: kick_dialog(clients2)
                },
                'ban': {
                  name: 'Ban',
                  icon: 'delete',
                  callback: ban_dialog(clients2)
                },
                'sep1': '---------',
                'quit': {
                  name: 'Quit',
                  icon: function () {
                    return 'context-menu-icon context-menu-icon-quit'
                  }
                }
              }
            })
            chache[clients2.cid] = chache[clients2.cid] + '<div id="client_' + clients2.clid + '" class="client-card">' + clients2.client_nickname + '</div>'
            $('#channel_client_container_' + clients2.cid).html(chache[clients2.cid])
          })
        } else {
          console.log('Something went wrong while retriving the clients:')
        }
      }, 'clientList')
    }
  }, 'channelList')
}
