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
$password = "mYzL@vbOwepH";
$dbname = "uqdraw";
$mysqli -> connect($host, $user, $password, $dbname);

$query = "SELECT * FROM `Question`; ";
$result = mysqli_query($mysqli, query);

if ($result) {
    echo "Yes";
    for($x=0;$row=$result->fetch_object();$x++){
        echo $row->questionID;
    }
} else {
    echo "No";
}
if (mysqli_connect_errno()) {
    echo("Failed to connect, the error message is : ".
        mysqli_connect_error());

    exit();
}
else
 echo "Connect to mySQL successfully <br/>";

    if (!mysqli_set_charset($mysqli, "utf8")) {
        // printf("Error loading character set utf8: %s\n", mysqli_error($mysqli));
    }
    else {
        // printf("Current character set: %s\n", mysqli_character_set_name($mysqli));
    }
?>