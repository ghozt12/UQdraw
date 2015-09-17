<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 27/8/15
 * Time: 10:47 AM
 */
include "connectDB.php";
//include "testSaveImage.php"; //get a hard coded image blob for testing
//$JSONData=$_POST[""]; // JSON get from ajax
//$JSONData = '{"courseID":"BBBB2234-15_1","title":"One more question","haveImage":0,"fileFormat":"","image":"","questionWeek":1}';
//$obj = json_decode($JSONData);
echo"Add Question Page: \n";
echo "<pre>";
print_r($_POST);
echo "</pre>";

$title = $_POST["title"];
$courseId = $_POST["courseID"];
$haveImage=$_POST["haveImage"];
$questionWeek = $_POST["questionWeek"];
$imageBlob = $_POST["image"];
$fileFormat = $_POST["fileFormat"];
echo $title." ".$courseId." ".$haveImage;
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

    //try put image in server first, if fail, whole procress abandant
    $dirSplit = explode("/",$imagePath_withQid);
    $dirCheck="";
    for($x=0;$x<sizeof($dirSplit);$x++){// some problems on create mutiple dir at the same time
        if($x!=0)
            $dirCheck=$dirCheck."/".$dirSplit[$x];
        else
            $dirCheck=$dirCheck.$dirSplit[$x];
        if (!is_dir($dirCheck)) { //create directory if it haven't exist
            // dir doesn't exist, make it
            mkdir($dirCheck,0777);
        }

    }

    $imagePath_full = $imagePath_withQid."/question".$fileFormat;// concat the file name and extension
    $img = str_replace('data:image/png;base64,', '', $imageBlob);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $success = file_put_contents($imagePath_full, $data);
    if ($success) {//if the image is uploaded, update row
        png2jpg($imagePath_full,$imagePath_withQid."/question.jpg", 100); // convert to jpg, after upload
        echo"putting in ". $imagePath_withQid;
        $imagePath_full = $imagePath_withQid."/question.jpg";// concat the file name and extension
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

// Quality is a number between 0 (best compression) and 100 (best quality)
function png2jpg($originalFile, $outputFile, $quality) {
    $image = imagecreatefrompng($originalFile);
    imagejpeg($image, $outputFile, $quality);
    imagedestroy($image);
}


?>