<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 9/9/15
 * Time: 2:43 PM
 */
include "connectDB.php";

$code = $_GET["code"];//the request should be http://<this url>/?code=XXX
//$code ="4rt";//ID for testing
if($code!=NULL&& strlen($code)==3) {//stop running if code is invaild
    $IMG_DIR = "Brian/uqDrawBackend/";
    $domainURL = "http://teamone.uqcloud.net/";
    $response = array();//JSON
    $response["questionsList"] = array();//JSON array
    $query = "SELECT * FROM `Question` WHERE `courseID` = (SELECT `courseID` FROM `Course` WHERE `enteringCode`='$code')";
    $result = mysqli_query($mysqli, $query);
    if ($result) {//success =1 means data retrieve successfully
        for ($x = 0; $row = $result->fetch_object(); $x++) {
            $questionData = array();
            $questionData["index"] = $x;
            $questionData["questionID"] = $row->questionID;
            $questionData["title"] = $row->questionTitle;
            $questionData["questionWeek"] = $row->questionWeek;
            $questionData["status"] = $row->status;
            if ($row->questionImage != NULL) {
                $questionData["image"] = $domainURL . $IMG_DIR . $row->questionImage;
            } else {
                $questionData["image"] = NULL;
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