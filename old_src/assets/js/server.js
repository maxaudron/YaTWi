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
    url: './assets/php/auth.php',
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
    $('#ts_runtime').html(moment("2015-01-01").startOf('day')
    .seconds(serverInfo.virtualserver_uptime)
    .format('H[h ]mm[min ]ss[sec]'))
    $('#ts_data_transfered_up').html(Math.round10(serverInfo.connection_bytes_sent_total / 1024000, -2))
    $('#ts_data_transfered_down').html(Math.round10(serverInfo.connection_bytes_received_total / 1024000, -2))
    $('#ts_banner').attr('src', serverInfo.virtualserver_hostbanner_gfx_url)
  }, 'serverInfo')
}
