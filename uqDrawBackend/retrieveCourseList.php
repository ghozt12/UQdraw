<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 29/8/15
 * Time: 11:15 PM
 */
include "connectDB.php";

$userID = $_SERVER['HTTP_X_UQ_USER'];

// get data from Single Sign on
if($userID!="") {
    $courseList = array();
    $courseList["courseList"] = "";
    $query = "SELECT `courseID` FROM `Course` WHERE lecturerID = '$userID'";

    $result = mysqli_query($mysqli, $query);
    if ($result) {
         $list = array();
        for ($x = 0; $row = $result->fetch_object(); $x++) {
            $course = array();
            $courseID = $row->courseID;
            $course["course"]=$courseID;

            array_push($list,$course);
           // $courseList[$x]=$course;

        }
        $courseList["courseList"]=$list;
    }

    echo json_encode($courseList);// display JSON
}else{
    echo'{"courseList":[{"course":"AAAA9999"},{"course":"AAAE1111-15_2"},{"course":"BBBB1234-15"},{"course":"BBBB2234-15_1"},{"course":"CCCC1234-15_2"},{"course":"INFS3222-15_2"},{"course":"TEST1111-15_2"}]}';
}
?>