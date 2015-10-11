<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 14/9/15
 * Time: 6:11 PM
 */
include "connectDB.php";
$imageBlob=$_POST["imgBase64"];
$studentID = $_SERVER['HTTP_X_UQ_USER'];
$questionID = $_POST["questionID"];
$questionWeek=null;
$courseID=null ;

$questionQuery="SELECT `courseID`,`questionWeek` FROM `Question` WHERE `questionID`=$questionID";
$result = mysqli_query($mysqli, $questionQuery);//get week and course from question ID
if($result){
    $row = $result->fetch_object();
    $questionWeek= $row->questionWeek;
    $courseID = $row->courseID;
}
else{echo"no such question";};

$courseIdSplit = explode("-", $courseID); // Split the courseID in to "XXXX1234" and "XX_X" for the file path
$imagePath = "image/uqdraw/".$courseIdSplit[1]."/".$courseIdSplit[0]."/".$questionWeek."/".$questionID;//image dir


//try put image in server first, if fail, whole procress abandant
$dirSplit = explode("/",$imagePath);
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
$timeStamp = time() + (7 * 24 * 60 * 60);
$imagePath_full = $imagePath."/".$studentID."-".$timeStamp.".png";
$img = str_replace('data:image/png;base64,', '', $imageBlob);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$success = file_put_contents($imagePath_full, $data);
if ($success) {//if the image is uploaded, update row
    echo"<br>";
    echo "upload success your file in: http://teamone.uqcloud.net/uqDrawBackend/" . $imagePath_full;
$dataQuery="INSERT INTO `Submission`(`submissionID`, `questionID`, `studentID`, `date`, `submittedImage`, `result`) VALUES (NULL,$questionID,'$studentID',NULL,'$imagePath_full',0)
ON DUPLICATE KEY UPDATE `date` =  CURRENT_TIMESTAMP, `submittedImage` = '$imagePath_full'";// if student submit more than one answer, change the time, and overwrite the answer
$insertDataResult = mysqli_query($mysqli, $dataQuery);

if ($insertDataResult) {
    //success
} else {
    echo " can't submit, procress abandant,";
    echo $mysqli->error;
}

}else{echo"image upload fail";
echo $imagePath_full;}



?>