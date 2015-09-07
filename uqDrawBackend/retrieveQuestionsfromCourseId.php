<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 29/8/15
 * Time: 11:33 PM
 */
include "connectDB.php";

$JSONData = $_GET[""];
$JSONobj = json_decode($JSONData);
$courseId = $JSONobj->{'couseId'};
$domainURL="http://teamone.uqcloud.net/";
$fileDirectory = "image/15_1/".$courseId;
$questionsData = array();

$query = "SELECT `questionTitle`,`questionImage` FROM `Question` WHERE `courseID` ='$courseId';";
$result = mysqli_query($conn, $query);
if ($result) {//success =1 means data retrieve successfully
    $questionsData["success"] =1;
    for ($x = 0; $row = $result->fetch_object(); $x++) {
        $questionsData["index"]=x;
        $questionsData["title"]= $result->questionTitle;
        if($result->questionImage!=NULL){
            $questionsData["imageLink"]= $domainURL.$result->questionImage;
        }else{
            $questionsData["imageLink"]= "NULL";
        }
    }
} else{
    $questionsData["success"] =0;
}
echo json_encode($questionsData);// display JSON
?>