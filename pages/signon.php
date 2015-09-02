<?php
	include 'conn.php';
	session_start();
	$userID = $_SERVER['HTTP_X_UQ_USER'];
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	$namejson = $_SERVER['HTTP_X_KVD_PAYLOAD'];
	$existquery = "INSERT INTO Lecturer VALUES ('$userID')";
	$namearray = json_decode($namejson);

	if($userType == "Student")
	{
		echo $namearray->{'firstname'};
	}
	if($userType == "Staff")
	{
		if(!mysqli_query($conn, $existquery))
		{
			echo mysqli_error($conn);
		}
		else
		{
			echo "<script> window.location.href = 'http://teamone.uqcloud.net/pages/lecture-mode.html'</script>";	
		}
	}		
?>