<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 16/9/15
 * Time: 1:01 PM
 */

include "connectDB.php";

$code = $_GET["enteringCode"];//the request should be http://<this url>/?code=XXX
//$code ="4rt";//ID for testing
$response =  Array();
if($code!=NULL&& strlen($code)==3) {//stop running if code is invaild
    $response["enteringCode"]=$code;
    $query = "SELECT * FROM `Question` WHERE `courseID` = (SELECT `courseID` FROM `Course` WHERE `enteringCode`='$code')";
    $result = mysqli_query($mysqli, $query);
    if ($result) {//success =1 means data retrieve successfully
       if($result->fetch_object()->questionID==""){
           $response["success"] = 0;
           //echo "That course doesn't exist";
       }else{ $response["success"] = 1;}

    } else {
        $response["success"] = 0;
        echo $mysqli->error;
    }

}else{//echo"Missing/invaild parameter code ";
    $response["success"] = 0;
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);// display JSON




?>