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
