/*
 * Client Manegement functions
 */

function client_kick (form, target) {
  var kick_mode = document.kickform.kick_mode.value
  var kick_reason = document.kickform.kick_reason.value
  call_php(function (out) {
    list_clients()
  }, 'clientKick', target, kick_mode, kick_reason)
}

function client_ban (form, target) {
  var ban_mode = document.banform.ban_mode.value
  if (ban_mode === 'ip') {
    ban_mode = 'banAddByIp'
  } else if (ban_mode === 'id') {
    ban_mode = 'banAddByUid'
  } else {
    ban_mode = 'banClient'
  }
  var ban_time = document.banform.ban_time.value
  var ban_reason = document.banform.ban_reason.value
  var ban_ip = document.banform.ban_ip.value
  call_php(function (out) {
    list_clients()
  }, ban_mode, target, ban_time, ban_reason, ban_ip)
}
