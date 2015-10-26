<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 25/10/2015
 * Time: 8:06 PM
 */

include "connectDB.php";
$studentID = $_SERVER['HTTP_X_UQ_USER'];//std ID to check did that user ansewed that questin or not

$courseID = $_GET["courseID"];//the request should be http://<this url>/?code=XXX
//$code ="4rt";//ID for testing
if($courseID!=NULL&& strlen($courseID)<20) {//stop running if code is invaild
    $IMG_DIR = "Brian/uqDrawBackend/";
    $response = array();//JSON
    $response["questionsList"] = array();//JSON array
    $response["enteringCode"]=$code;
    $query = "SELECT * FROM `Question` WHERE `courseID` = '$courseID'";
    $result = mysqli_query($mysqli, $query);
    $studentAnswerQuery = "SELECT questionID FROM `Submission` WHERE `studentID`='$studentID' AND questionID IN(SELECT questionID from Question WHERE CourseID = '$courseID')";
    $studentAnswerResult = mysqli_query($mysqli, $studentAnswerQuery);// get all question that student answered in that course
    $submittedQuestion = array();
    if ($studentAnswerResult){
        //put all questionID in an Array
        for ($x = 0; $row = $studentAnswerResult->fetch_array(MYSQLI_NUM); $x++) {
            array_push($submittedQuestion,$row[0]);
        }
    } else{
        echo "Fail to get student data";
    }


    if ($result) {//success =1 means data retrieve successfully
        for ($x = 0; $row = $result->fetch_object(); $x++) {
            $questionData = array();
            $questionData["index"] = $x;
            $questionData["questionID"] = $row->questionID;
            $questionData["title"] = $row->questionTitle;
            $questionData["questionWeek"] = $row->questionWeek;
            $questionData["status"] = intval($row->status);
            $response["subject"]=$row->courseID;
            if ($row->questionImage != NULL) {
                $questionData["image"] = $domainURL . $IMG_DIR . $row->questionImage;
            } else {
                $questionData["image"] = NULL;
            }

            if(in_array($row->questionID,$submittedQuestion)){
                $questionData["attempted"] = 1;
            }else{
                $questionData["attempted"] = 0;
            }
            array_push($response["questionsList"], $questionData);//push object in array
        }
        $response["success"] = 1;
    } else {
        $response["success"] = 0;
        echo $mysqli->error;
    }

}else{//echo"Missing/invaild parameter code ";
    $response["success"] = 0;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);// display JSON

?>