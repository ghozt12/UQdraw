<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 27/8/15
 * Time: 10:47 AM
 */
include "conn.php";

$JSONData=$_GET [""]; // JSON get from ajax
$JSONobj = json_decode($JSONData);
$courseId = $JSONobj->{'courseId'};
$title = $JSONobj->{'title'}; //questionTitle
$haveImage=$JSONobj->{'haveImage'};// true = question attached with img, vice versa
$imageBlob = $JSONobj->{'image'}; //questionImage



$dataQuery = "INSERT INTO `Question`(`courseID`, `questionID`, `questionTitle`, `questionImage`) VALUES ('$courseId',NULL,'$title',NULL);

                  SELECT `questionID` FROM `Question` WHERE `questionID` = LAST_INSERT_ID();";
$insertDataResult = mysqli_query($conn, $dataQuery);

if ($insertDataResult) {
    echo "question row inserted";
} else {
    echo "question row can't be insert, procress abandant";
}

if($haveImage==true && $insertDataResult) {//if there is a image, update file path to db and upload the image to serve
    $row = $insertDataResult->fetch_object();
    $questionId = $row->questionId;// retrieve questionID after row is inserted
    $imagePath = "question/".$questionId.".jpg";
    if (file_put_contents($imagePath, $imageBlob)== true) {//if the image is uploaded, update row
        $imageQuery = "UPDATE `Question` SET `questionImage`= '$imagePath' WHERE `questionID` =$questionId ";
        $insertImageResult = mysqli_query($conn, $imageQuery);

        if ($insertImageResult) {
            echo "Image Path updated";
        } else {
            echo "Image Path cannot be updated ";
        }

    }else{
        echo "Image cannot be upload to server";
    }

}




?>