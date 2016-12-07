<?php
  /*  Connect to server and check if valid creditentals */

  require('./config.php');
  require('./ts3admin.class.php');

  if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
      case 'login' : login($ts = new ts3admin($ts3_ip, $ts3_queryport));break;
      case 'logout' : logout();break;
      case 'select_server' : select_server();break;
    }
  }

  function login($ts) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    if ($ts->getElement('success', $ts->connect())) {        // Try to connect
      $login_par = $ts->login($username, $password);
      if ($login_par['success'] == true) {                   // Try to login
        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;
        $_SESSION['serverid'] = '1';
        print '200';
      }
      else {
        session_unset();
        session_destroy();
        print '401';
      }
    }
    else {
      session_unset();
      session_destroy();
      print '503';
    }
  }

  function logout() {
    session_unset();
    session_destroy();
  }

  function select_server() {
    $serverid = $_POST['sid'];
    $_SESSION['serverid'] = $serverid;
  }


?>
