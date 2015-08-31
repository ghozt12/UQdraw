<?php
	include 'conn.php';
	session_name("PHPSESSID");
	session_start();
	$userID = $_SERVER['HTTP_X_UQ_USER'];
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	$existquery = "INSERT INTO Lecturer VALUES ('$userID')";

	if($userType == "Student")
	{
		echo "<script> window.location.href = 'http://teamone.uqcloud.net'</script>";
	}
	if($userType == "Staff")
	{
		if(!mysqli_query($conn, $existquery))
		{
			echo mysqli_error($conn);
		}
		else
		{
			echo "<script> window.location.href = 'http://teamone.uqcloud.net/Lectuer'</script>";	
		}
	}		
?>