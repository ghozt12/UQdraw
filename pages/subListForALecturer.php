
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
	    	echo "<li> <span class='subject'>";
	    	echo $row->courseID;
	    	echo "</span> </li>";
		}
	} else {
	    echo "No result in the Question Table";
	}
?>
