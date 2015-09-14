<?php
include "connectDB.php";

$courseID = $_GET["courseID"]; //gets the course id from URL
$questionID = $_GET["questionID"]; //gets the question id from URL

if($courseID !=NULL&&strlen($courseID)<15){
	$domainURL = "http://teamone.uqcloud.net/";
    $response = array();//JSON
    $response["questionList"] = array();//JSON array
    $codeQuery = "SELECT  `enteringCode` FROM `Course` WHERE `courseID`= '$courseID'";
    $codeResult = mysqli_query($mysqli, $codeQuery);
    if($codeResult){
        $response["enteringCode"]=$codeResult->fetch_object()->enteringCode;
    }

	$query = "select a.*, b.enteringCode from Question a join Course b on a.courseID=b.courseID where b.courseID='$courseID' AND a.questionID='$questionID'";
	$result = mysqli_query($mysqli, $query);
 	if ($result) {//success =1 means data retrieve successfully
        $response["subject"] = explode("-", $courseID)[0];//XXXX1234
        $response["subjectFull"] = $courseID; //XXXX1234-11_1
        for ($x = 0; $row = $result->fetch_object(); $x++) {
         	$questionData = array();
            $questionData["questionID"] = $row->questionID;
            $questionData["title"] = $row->questionTitle;
            $questionData["questionWeek"] = $row->questionWeek;
            $questionData["status"] = $row->status;
         	array_push($response["questionList"], $questionData);
         }
        $response["success"] = 1;
    } else {
        $response["success"] = 0;
        echo $mysqli->error;
    } 
}
else{//echo"Missing/invaild parameter courseId ";
    	$response["success"] = 0;
	}
	echo json_encode($response, JSON_UNESCAPED_SLASHES);// display JSON
?>