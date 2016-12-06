<?php

require($_SERVER['DOCUMENT_ROOT'].'/assets/php/lib/config.php');
require($_SERVER['DOCUMENT_ROOT'].'/assets/php/ts3admin.class.php');

$sidc = $_SESSION['serverid'];
$selected_server = intval($sidc);
if(isset($_POST['var1']) && !empty($_POST['var1'])) {
  $var1 = $_POST['var1'];
}
if(isset($_POST['var2']) && !empty($_POST['var2'])) {
  $var2 = $_POST['var2'];
}
if(isset($_POST['var3']) && !empty($_POST['var3'])) {
  $var3 = $_POST['var3'];
}
if(isset($_POST['var4']) && !empty($_POST['var4'])) {
  $var4 = $_POST['var4'];
}
$action = $_POST['action'];

$ts = new ts3admin($ts3_ip, $ts3_queryport);
if ($ts->getElement('success', $ts->connect())) {
  $ts->login($_SESSION['username'], $_SESSION['password']);
  $ts->selectServer($selected_server, 'serverId');
  if(isset($action) && !empty($action)) {
    switch($action) {
      case 'channelList' :
          $out = $ts->channelList($_SESSION['serverid']);
          print json_encode($out);
          break;
      case 'clientPoke' :
          $out = $ts->clientPoke($var1, $var2);
          print json_encode($out);
          break;
      case 'clientList' :
          $out = $ts->clientList($_SESSION['serverid']);
          print json_encode($out);
          break;
      case 'complainList' :
          $out = $ts->complainList();
          print json_encode($out);
          break;
      case 'complainDelete' :
          $out = $ts->complainDelete($var1, $var2);
          print json_encode($out);
          break;
      case 'sendMessage' :
          $out = $ts->sendMessage($var1, $var2, $var3);
          print json_encode($out);
          break;
      case 'serverInfo' :
          $out = $ts->serverInfo($_SESSION['serverid']);
          print json_encode($out);
          break;
      case 'serverList' :
          $out = $ts->serverList();
          print json_encode($out);
          break;
      case 'serverStart' :
          $out = $ts->serverStart($var1);
          print json_encode($out);
          break;
      case 'serverStop' :
          $out = $ts->serverStop($var1);
          print json_encode($out);
          break;
    }
  }
}
?>
