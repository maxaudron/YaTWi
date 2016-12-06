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
