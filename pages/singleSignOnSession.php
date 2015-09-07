<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 2/9/15
 * Time: 12:59 PM
 */

session_name("PHPSESSID");
session_start();
$sso_userID = $_SERVER['HTTP_X_UQ_USER'];
$sso_userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
var_dump($_SERVER['HTTP_X_UQ_USER_TYPE']);
$sso_Session = $_SERVER['HTTP_X_KVD_PAYLOAD'];4
$sso_payload = json_decode($sso_Session);
$sso_firstName = $sso_payload->{'firstname'};
$sso_id = $sso_payload->{'user'};
$sso_email = $sso_payload->{'email'};

echo /*$sso_userID." ".$sso_userType."".$sso_Name."".*/$sso_firstName."".$sso_id."".$sso_email;





?>