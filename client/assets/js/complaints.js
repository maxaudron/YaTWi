// /////////////////////////////////////////////////////////// //
//  Developed for YaTWi                                        //
//  under MIT license                                          //
// /////////////////////////////////////////////////////////// //

function get_complains (callback) {
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

function complain_list () {
  get_complains(function (out) {
    if (out.success === true) {
      var out = out.data
      var cache = ''
      out.forEach(function (item, index, arr) {
        var out2 = out[index]
        cache = cache + '<p><span class="highlight_text">User: </span>' + out2.tname + '</br><span class="highlight_text"> Message: </span>' + out2.message + '</br><span class="highlight_text"> By: </span>' + out2.fname + '</p></br>'
        console.log(cache)
      })
      $('#complains').html(cache)
    } else {
      $('#complains').html('<p>No Complains</p>')
    }
  })
}
