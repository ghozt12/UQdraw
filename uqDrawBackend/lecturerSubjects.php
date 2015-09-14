<?php
	//Database credentials
	include 'connectDB.php';
	//Uses UQ single sign on to retrieve user ID & Type
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	$userID = $_SERVER['HTTP_X_UQ_USER'];
	//$userID = "s4371125";

	//Query to get all subjects linked to UserID
	$query = "SELECT * FROM Course WHERE lecturerID='$userID'";
	$result = mysqli_query($mysqli, $query);

	if(mysqli_num_rows($result) > 0){
		// output subjects for each row to a link that will redirect them to the questions page
		while($tmpCourseId = mysqli_fetch_array($result)){
			echo "<a href='http://teamone.uqcloud.net/pages/lecture-makequestions.html?courseID=".$tmpCourseId[1]."''><li><span id='".$tmpCourseId[1]."'>";
	    	echo $tmpCourseId[1];
	    	echo "</span> </li></a>";
		}
		
	}

	mysqli_close($mysqli);

?>