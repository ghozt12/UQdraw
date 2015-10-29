<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 29/8/15
 * Time: 11:33 PM
 */

include "connectDB.php";

$courseId = $_GET["courseID"];//the request should be http://<this url>/?courseID=XXXX1234-11_1
//$courseId = "BBBB2234-15_1";//ID for testing
$studentID = $_SERVER['HTTP_X_UQ_USER'];//std ID to check did that user ansewed that questin or not
if ($courseId != NULL && strlen($courseId) < 20 && $studentID != null) {// don't run if cocourseID is invaild
    $IMG_DIR = "Brian/uqDrawBackend/";
    $domainURL = "http://teamone.uqcloud.net/";
    $response = array();//JSON
    $response["questionsList"] = array();//JSON array
    $codeQuery = "SELECT  `enteringCode` FROM `Course` WHERE `courseID`= '$courseId'";
    $codeResult = mysqli_query($mysqli, $codeQuery);
    if ($codeResult) {
        $response["enteringCode"] = $codeResult->fetch_object()->enteringCode;
    }

    $query = "select a.*, b.enteringCode from Question a join Course b on a.courseID=b.courseID where b.courseID='$courseId'";
    $result = mysqli_query($mysqli, $query);

    if ($result) {//success =1 means data retrieve successfully
        $response["subject"] = explode("-", $courseId)[0];//XXXX1234
        $response["subjectFull"] = $courseId; //XXXX1234-11_1
        $arrayByWeek = array();
        for ($x = 0; $row = $result->fetch_object(); $x++) {
            $questionData = array();
            $questionData["index"] = $x;
            $questionData["questionID"] = $row->questionID;
            $questionData["title"] = $row->questionTitle;
            //$questionData["questionWeek"] = $row->questionWeek;
            $questionData["status"] = intval($row->status);
            if ($row->questionImage != NULL) {
                $questionData["image"] = $domainURL . $IMG_DIR . $row->questionImage;
            } else {
                $questionData["image"] = NULL;
            }
            if ($arrayByWeek[$row->questionWeek] == null) {
                $arrayByWeek[$row->questionWeek] = array();
            }
            array_push($arrayByWeek[$row->questionWeek], $questionData);//push object in array
        }
        array_push($response["questionsList"], $arrayByWeek);
        $response["success"] = 1;
    } else {
        $response["success"] = 0;
        echo $mysqli->error;
    }

} else {//echo"Missing/invaild parameter courseId ";
    $response["success"] = 0;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);// display JSON


?>