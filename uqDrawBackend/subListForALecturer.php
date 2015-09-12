
<?php
	/*	by Joyce
		3.9.15
	*/


	require("connectDB.php");

// 	session_start();
//	$courseID = $_POST['courseID'];

	$lectureID = "t2345678";

	$query = 'SELECT * FROM Course WHERE lecturerID= "'.$lectureID.'"';
	$result = mysqli_query($mysqli, $query);
	if ($result) {
	    for($x=0;$row=$result->fetch_object();$x++){
	    $tmpCourseId = $row->courseID;
	    	//echo "<li id='"+$tmpCourseId+"><span class='subject'>";
	    	echo "<a href='http://teamone.uqcloud.net/Brian/testFrontEnd/pages/lecture-questions.html?courseID=".$tmpCourseId."''><li><span id='".$tmpCourseId."'>";
	    	echo $tmpCourseId;
	    	echo "</span> </li></a>";
		}
	} else {
	    echo "No result in the Question Table";
	}
?>
