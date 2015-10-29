<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 28/10/2015
 * Time: 11:37 AM
 */
include "connectDB.php";
$questionID = $_GET[questionID];

if ($questionID != null && $questionID != "") {
    $query = "SELECT `questionImage` FROM `Question` WHERE questionID = '$questionID'";
    $result = mysqli_query($mysqli, $query);
    $questionImage = '';
    if ($result) {
        //Get entering code from DB
        $questionImage = $result->fetch_object()->questionImage;
    }
    if ($questionImage != null && $questionImage != "") {
        echo "http://teamone.uqcloud.net/uqDrawBackend/" . $questionImage;
    } else {
        echo "http://teamone.uqcloud.net/pages/abc.html";
    }

}
?>