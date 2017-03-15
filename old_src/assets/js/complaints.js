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
