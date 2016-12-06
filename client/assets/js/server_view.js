/*
 *  Server View Module
 *  Description: Creates a viewable list of all channels and clients in channels in HTML
 */

function get_clients(callback) {
  return $.ajax({
    url: '/assets/php/lib/clients/get_clients.php',
    type: 'post',
    data: {
      'selected_server': '1'
    },
    success: function(data) {
      var clients = JSON.parse(data)
      callback(clients)
    }
  })
}

function get_channels(callback) {
  return $.ajax({
    url: '/assets/php/lib/server/get_channel.php',
    type: 'post',
    data: {
      'selected_server': '1'
    },
    success: function(data) {
      var channels = JSON.parse(data)
      channels = channels
      callback(channels)
    }
  })
}

var context_client = [{
  name: 'test',
  title: 'test button',
  className: 'primary',
  fun: function(data, event) {
    console.log(data, event);
  }
}];

function get_server_view() {
  get_channels(function(channels) {
    if (channels.success === true) {
      var channels = channels.data
      var chache = ''
      channels.forEach(function(item, index, arr) {
        var channels2 = channels[index]
        chache = chache + '<div id="channel_"' + channels2.cid + ' class="channel-card" title="' + channels2.channel_topic + '">' + channels2.channel_name + '<span id="channel_client_container_' + channels2.cid + '"></span></div>'
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
      })
    }
  })
}
