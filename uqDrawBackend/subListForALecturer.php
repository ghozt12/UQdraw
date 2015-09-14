
<?php
	/*	by Joyce
		3.9.15
	*/

	//DB credentials
	require("connectDB.php");

//	$courseID = $_POST['courseID'];
	$userID = $_SERVER['HTTP_X_UQ_USER'];
	// Testing with defined user
	//$userID = "t2345678";

	$query = 'SELECT * FROM Course WHERE lecturerID= "'.$userID.'"';
	$result = mysqli_query($mysqli, $query);
	if ($result) {
	    for($x=0;$row=$result->fetch_object();$x++){
	    $tmpCourseId = $row->courseID;
	    	//Outputs the subjects that link to the lecturer 
	    	//echo "<li id='"+$tmpCourseId+"><span class='subject'>";
	    	echo "<a href='http://teamone.uqcloud.net/Brian/testFrontEnd/pages/lecture-questions.html?courseID=".$tmpCourseId."''><li><span id='".$tmpCourseId."'>";
	    	echo $tmpCourseId;
	    	echo "</span> </li></a>";
		}
	} else {
	    echo "No result in the Subjects Table";
	}
	 mysqli_close($mysqli);
?>
