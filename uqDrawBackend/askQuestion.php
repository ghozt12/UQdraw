<?php

include "connectDB.php";

$status = $_POST["status"];
$questionID = $_POST["questionID"];


if($status !== null && $questionID !== null){
	$updatequery = "UPDATE `Question` SET `status` =".$status." WHERE `QuestionID` =".$questionID;
	$result = mysqli_query($mysqli, $updatequery);

	if($result){
		echo "Updated Status";
	}
	else{
		echo "Status was not updated";
	}
}

?>