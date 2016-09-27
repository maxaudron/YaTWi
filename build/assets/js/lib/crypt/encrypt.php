<?php
include '../config.php';

// Variables from login()
$username = $_POST['username'];
$password = $_POST['password'];

// Crypt
$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
$userhash = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, '82b3c04c54d1f6dd33e7a1e1b5e437fa', $username + '?§?' + $password, MCRYPT_MODE_ECB, $iv);
return $userhash;
console.log($userhash);

?>
