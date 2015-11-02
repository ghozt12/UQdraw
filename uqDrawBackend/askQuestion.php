<?php

include "connectDB.php";

//gets the status from the post
$status = $_POST["status"];
$questionID = $_POST["questionID"];


if ($status !== null && $questionID !== null) {
    //update the status for the questionID to 1 or 0, 1 being open and 0 being closed. 
    $updatequery = "UPDATE `Question` SET `status` =" . $status . " WHERE `QuestionID` =" . $questionID;
    $result = mysqli_query($mysqli, $updatequery);

    if ($result) {
        echo "Updated Status";
    } else {
        echo "Status was not updated";
    }
}

?>