<?php

include "connectDB.php";
$questionID = $_POST["questionID"];
$questionWeek = $_POST["questionWeek"];
$title = $_POST["title"];

//update the question title, week by question ID
$query = "UPDATE `Question` SET `questionWeek`=" . $questionWeek . ", `questionTitle`='" . $title . "' WHERE `questionID` = " . $questionID;
$result = mysqli_query($mysqli, $query);

//if($result){
//	echo "successfully deleted";
//}

$mysqli->close();

?>