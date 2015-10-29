<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 7/10/15
 * Time: 9:09 PM
 */
//use to update DB when lecturer correct the submits 0="not correct yet", 1 = "Correct", 2 ="Wrong"
include "connectDB.php";
$submissionID = $_GET["submissionID"];
$status = $_GET["status"];
if ($status < 3 && $status != "" && $submissionID != "") {
    $query = "UPDATE `Submission` SET `result`=$status WHERE `submissionID` = $submissionID ";
    $result = mysqli_query($mysqli, $query);
    if ($result) {
        echo "successfully update";
    } else {
        echo "update fail";
    }


} else {
    echo "fail wrong input";
}


?>