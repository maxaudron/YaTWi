<?php
/* Gets All inforamtion about the server and Places them in variables */

require($_SERVER['DOCUMENT_ROOT'].'/assets/php/lib/config.php');
require($_SERVER['DOCUMENT_ROOT'].'/assets/php/ts3admin.class.php');

$username = $_POST['username'];
$password = $_POST['password'];
$sid = $_POST['sid'];

$ts = new ts3admin($ts3_ip, $ts3_queryport);
if ($ts->getElement('success', $ts->connect())) {
  $ts->login($username, $password);
  $out = $ts->serverStop($sid);
  print json_encode($out);
}
?>
