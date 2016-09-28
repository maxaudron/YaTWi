<?php
  /*  Connect to server and check if valid creditentals */

  require($_SERVER['DOCUMENT_ROOT'].'/assets/php/lib/config.php');
  require($_SERVER['DOCUMENT_ROOT'].'/assets/php/ts3admin.class.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  $ts = new ts3admin($ts3_ip, $ts3_queryport);
  if ($ts->getElement('success', $ts->connect())) {        // Try to connect
    $login_par = $ts->login($username, $password);
    if ($login_par['success'] == true) {                   // Try to login
      print 'Login success';
    }
    elseif ($login_par['success'] == false) {
      print 'Login failed';
    }
  }
  else {
    print 'Connection failed';
  }
?>
