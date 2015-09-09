<?php

	include 'conn.php';
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	//$userID = $_SERVER['HTTP_X_UQ_USER'];
	$userID = "t2345678";

	$query = "SELECT * FROM Course WHERE lecturerID= '$userID'";
	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) > 0){
		// output data for each row
		while($tmpCourseId = mysqli_fetch_array($result)){
			echo "<a href='http://www.google.com'><li><span id='".$tmpCourseId."'>";
	    	echo $tmpCourseId[1];
	    	echo "</span> </li></a>";
		}
		
	}
	echo "<button class='button-add-subject'>+</button>";

?>