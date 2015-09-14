<?php
//Database credentials
include "connectDB.php";
//gets the course id from URL
$courseID = $_GET["courseID"]; 
//gets the question id from URL
$questionID = $_GET["questionID"]; 

//courseID must be within 15 charcters and not empty
if($courseID !=NULL&&strlen($courseID)<15){
    $response = array();//creating JSON array
    $response["questionList"] = array();//Question list JSON array
    $codeQuery = "SELECT  `enteringCode` FROM `Course` WHERE `courseID`= '$courseID'";
    $codeResult = mysqli_query($mysqli, $codeQuery);
    if($codeResult){
        //Get entering code from DB
        $response["enteringCode"]=$codeResult->fetch_object()->enteringCode;
    }
    //Query to get course ID and all data from questions table
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
?>