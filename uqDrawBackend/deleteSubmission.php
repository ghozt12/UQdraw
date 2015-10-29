<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 7/10/15
 * Time: 3:29 PM
 */
include "connectDB.php";
$submissionID = $_GET["submissionID"];
if (isset($submissionID)) {
    $query = "DELETE FROM `uqdraw`.`Submission` WHERE `Submission`.`submissionID` = $submissionID ";
    $result = mysqli_query($mysqli, $query);
    if ($result) {
        echo "successfully deleted";
    } else {
        echo "delete fail";
    }
}


?>