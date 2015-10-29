<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 11/9/15
 * Time: 4:34 PM
 */
include "connectDB.php";
$studentID = $_SERVER['HTTP_X_UQ_USER'];// std ID from Single signon
$namejson = $_SERVER['HTTP_X_KVD_PAYLOAD'];
$namearray = json_decode($namejson);
$name = $namearray->{'firstname'};
//$studentID = "s4371125";

$response = array();//JSON
if ($studentID != NULL && strlen($courseId) < 20) {// don't run if courseID is invaild
    $query = "select distinct a.`courseID` from Question a join Submission b on a.`questionID`=b.`questionID` where b.studentID='$studentID'";
    $result = mysqli_query($mysqli, $query);
    if ($result) {//success =1 means data retrieve successfully
        $response["studentID"] = $studentID;
        $response["name"] = $name;
        $courseList = array();
        for ($x = 0; $row = $result->fetch_object(); $x++) {
            $course = $row->courseID;
            array_push($courseList, $course);
            //echo $row->courseID;
        }
        $response["courseID"] = $courseList;
        $response["success"] = 1;
    } else {
        $response["success"] = 0;
        echo $mysqli->error;//error message
    }
    $mysqli->close();
} else {
    echo "invaild studentID, Please Login through single signon first";
    $response["success"] = 0;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);// display JSON
