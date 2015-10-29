<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 27/8/15
 * Time: 10:27 AM
 */

$mysqli = new mysqli();
//DB Credentials
$host = "localhost";
$user = "root";
$password = "mYzL@vbOwepH";
$dbname = "uqdraw";
//Connect DB
$mysqli->connect($host, $user, $password, $dbname);

if (mysqli_connect_errno()) {
    //echo("Failed to connect, the error message is : ".
    mysqli_connect_error();

    //exit();
}

//else
//echo "Connect to mySQL successfully <br/>";

?>