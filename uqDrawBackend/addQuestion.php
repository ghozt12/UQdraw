<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 27/8/15
 * Time: 10:47 AM
 */
include "connectDB.php";
//include "testSaveImage.php"; //get a hard coded image blob for testing
$JSONData=$_GET [""]; // JSON get from ajax
$JSONobj = json_decode($JSONData);
$courseId = $JSONobj->{'courseId'};
$title = $JSONobj->{'title'}; //questionTitle
$haveImage=$JSONobj->{'haveImage'};// true = question attached with img, vice versa
$fileFormat = $JSONobj->{'fileFormat'};
$imageBlob = $JSONobj->{'image'}; //questionImage
$fileFormat = $JSONobj->{'fileFormat'};

/*$title = "test1";
$imageBlob = $blob;
$haveImage=true;
$courseId = "BBBB2234-15_1";
$questionWeek = 1;
$fileFormat = ".jpg";*/

$courseIdSplit = explode("-", $courseId); // Split the courseID in to "XXXX1234" and "XX_X" for the file path
$imagePath = "image/uqdraw/".$courseIdSplit[1]."/".$courseIdSplit[0]."/".$questionWeek."/";//image dir

$dataQuery="INSERT INTO `Question`(`courseID`, `questionID`, `questionWeek`, `questionTitle`, `status`) VALUES ('$courseId',NULL,
$questionWeek,'$title',0 );";
$insertDataResult = mysqli_query($mysqli, $dataQuery);

if ($insertDataResult) {
    echo "question row inserted";
} else {
    echo "question row can't be insert, procress abandant";
    echo $mysqli->error;
}

if($haveImage==true && $insertDataResult) {//if there is a image, update file path to db and upload the image to serve

    $questionId = $mysqli->insert_id;//retrieve questionID after row is inserted
    $imagePath_withQid = $imagePath.$questionId; // attach question in the dir

    if (!is_dir($imagePath_withQid)) { //create directory if it haven't exist
        // dir doesn't exist, make it
           mkdir($imagePath_withQid,0777);
       }
    $imagePath_full = $imagePath_withQid."/question".$fileFormat;// concat the file name and extension
    if (file_put_contents($imagePath_full, base64_decode($imageBlob))== true) {//if the image is uploaded, update row
        echo"putting in ". $imagePath_withQid;
        $imageQuery = "UPDATE `Question` SET `questionImage`= '$imagePath_full' WHERE `questionID` =$questionId ";
        $insertImageResult = mysqli_query($mysqli, $imageQuery);

        if ($insertImageResult) {
            echo "Image Path updated";
        } else {
            echo "Image Path cannot be updated ";
            echo $mysqli->error;
        }

    }else{
        echo "Image cannot be upload to server";
    }

}




?>