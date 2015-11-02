<?php

//db connect
include "connectDB.php";

//get question ID from he post request
$questionID = $_POST["questionID"];

//delete the question from the DB from questionID
$query = "DELETE FROM `Question` WHERE questionID = " . $questionID;
$result = mysqli_query($mysqli, $query);
//if($result){
//	echo "successfully deleted";
//}

$mysqli->close();

?>