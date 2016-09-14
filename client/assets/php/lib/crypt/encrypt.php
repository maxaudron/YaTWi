<?php
// Variables from login()
$username = $_POST['username'];
$password = $_POST['password'];

// Crypt
$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB); 
$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND); 
$userhash = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $username, $password, MCRYPT_MODE_ECB, $iv);
return $userhash
    
?>