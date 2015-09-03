<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 27/8/15
 * Time: 10:27 AM
 */

$mysqli = new mysqli();

$host ="localhost";
$user ="root";
$password = "";
$dbname = "uqdraw";
$mysqli -> connect($host, $user, $password, $dbname);

$query = "SELECT * FROM `Question`; ";
$result = mysqli_query($mysqli, $query);


if (mysqli_connect_errno()) {
    echo("Failed to connect, the error message is : ".
        mysqli_connect_error());

    exit();
}

?>