<?php

include "connectDB.php";
$questionID = $_POST["questionID"];

$query = "DELETE FROM `Question` WHERE questionID = ".$questionID;
$result = mysqli_query($mysqli, $query);
//if($result){
//	echo "successfully deleted";
//}

$mysqli->close();

?>