<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 3/9/15
 * Time: 10:59 AM
 */
include "connectDB.php";
$lecturerId =  $_SERVER['HTTP_X_UQ_USER'];
$courseId = $_GET["courseID"];
//$lecturerId ="t2345678";
//$courseId = "BBBB1234-15";
if($lecturerId!=null&&$courseId!=null) {
    do {
        $enteringCode = generateRandomString(3);
        $digitCodeQuery = "SELECT `enteringCode` FROM `Course` WHERE `enteringCode` = '$enteringCode'";
        $enterCodeResult = mysqli_query($mysqli, $digitCodeQuery);
    } while ($enterCodeResult->fetch_object()->enteringCode != NULL);//random 3-digit code until which is unique

    $insertQuery = "INSERT INTO `Course`(`lecturerID`, `courseID`, `enteringCode`) VALUES ('$lecturerId','$courseId','$enteringCode')";//insert row
    $insertDataResult = mysqli_query($mysqli, $insertQuery);

    if ($insertDataResult) {
        echo "question row inserted";
    } else {
        echo "question row can't be insert, procress abandon";
        echo $mysqli->error;
    }
    $mysqli->close();
}
else{
echo"error null input";
}
function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';// randome only lower case and Numbers
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>