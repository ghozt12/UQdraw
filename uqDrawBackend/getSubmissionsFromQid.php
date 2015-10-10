<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 23/9/15
 * Time: 2:16 PM
 */


//Database credentials
include "connectDB.php";

//gets the question id from URL
$questionID = $_GET["questionID"];
$IMG_URL ="http://teamone.uqcloud.net/uqDrawBackend/";
if($questionID !=NULL){
    $response = array();//creating JSON array
    $response["submissionList"] = array();//submission list JSON array
    $question_query = "SELECT `questionTitle`,`questionWeek` FROM `Question` WHERE `questionID`='$questionID'";
    $question_result = mysqli_query($mysqli, $question_query);
    if($question_result){
        $title = $question_result->fetch_object();
        $response["questionTitle"]=$title->questionTitle;
        $response["questionWeek"]=$title->questionWeek;
    }
    $query = "SELECT `submissionID`,`studentID`,`date`,`submittedImage`,`result` FROM `Submission` WHERE `questionID`='$questionID'";
    $result = mysqli_query($mysqli, $query);
    if ($result) {//success =1 means data retrieve successfully
        $response["questionID"] = $questionID;
        for ($x = 0; $row = $result->fetch_object(); $x++) {
            $submissionData = array();
            $submissionData["submissionID"] = $row->submissionID;
            $submissionData["studentID"] = $row->studentID;
            $submissionData["date"] = $row->date;
            $submissionData["submittedImage"] = $IMG_URL.$row->submittedImage; // add the url prefix, so the output is a full image url
            $submissionData["result"] = $row->result;
            array_push($response["submissionList"],  $submissionData);
        }
        $response["success"] = 1;
    } else {
        //Displays Error message if it cannot connect to DB
        $response["success"] = 0;
        echo $mysqli->error;
    }
}
else{
    //Displays error message if it is outside of the boundaries
    echo"Missing/invaild parameter courseId ";
    $response["success"] = 0;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);// encodes the array into JSON format
mysqli_close($mysqli);