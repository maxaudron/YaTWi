<?php
/* Gets All inforamtion about the server and Places them in variables */

require($_SERVER['DOCUMENT_ROOT'].'/assets/php/lib/config.php');
require($_SERVER['DOCUMENT_ROOT'].'/assets/php/ts3admin.class.php');

$sidc = $_SESSION['serverid'];
$selected_server = intval($sidc);
$msg_mode = $_POST['msg_mode'];
$msg = $_POST['msg'];
$target = $_POST['target'];

$ts = new ts3admin($ts3_ip, $ts3_queryport);
if ($ts->getElement('success', $ts->connect())) {
  $ts->login($_SESSION['username'], $_SESSION['password']);
  $ts->selectServer($selected_server, 'serverId');
  $out = $ts->sendMessage($msg_mode, $target, $msg);
  print json_encode($out);
}
?>
