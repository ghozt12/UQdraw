<?php

	include 'conn.php';
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	//$userID = $_SERVER['HTTP_X_UQ_USER'];
	$userID = "s4371125";

	$query = "SELECT * FROM Course WHERE lecturerID= '$userID'";
	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) > 0){
		// output data for each row
		while($tmpCourseId = mysqli_fetch_array($result)){
			echo "<a href='http://teamone.uqcloud.net/pages/lecture-makequestions.html?courseID=".$tmpCourseId[1]."''><li><span id='".$tmpCourseId[1]."'>";
	    	echo $tmpCourseId[1];
	    	echo "</span> </li></a>";
		}
		
	}

?>