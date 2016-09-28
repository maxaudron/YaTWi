/////////////////////////////////////////////////////////////////
////  Implementation of Basic Server Features                ////
////  Developed for YaTWi                                    ////
////  under MIT license                                      ////
/////////////////////////////////////////////////////////////////

function get_server_info() {
  $.ajax({
    url: '/assets/php/lib/server/get_sever_info.php',
    type: 'post',
    data: {
      'username': retrive_user.username(),
      'password': retrive_user.password()
    },
    success: function(data) {
      var serverInfo = JSON.parse(data);
      var serverInfo = serverInfo.data;
      console.log(serverInfo.virtualserver_name);
    }
  })
}
