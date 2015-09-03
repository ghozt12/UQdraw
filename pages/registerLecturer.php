<?php 
	include 'conn.php';
	$userID = $_SERVER['HTTP_X_UQ_USER'];
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	$nameJson = $_SERVER['HTTP_X_KVD_PAYLOAD'];
	$nameArray = json_decode($nameJson);

	if($userType !== "Staff")
	{
		echo "<script> window.location.href = 'http://teamone.uqcloud.net'</script>";
	}
	if($userType == "Staff")
	{

		$userQuery = "SELECT LecturerID FROM Lecturer WHERE LecturerID = '$userID'";
		$userResult = mysqli_query($conn, $userQuery);
		$foundUser = "";
	
		if(mysqli_num_rows($userResult) > 0){
			// output data of each row
			while($row = mysqli_fetch_array($userResult)){
				$foundUser = $row;
			}
		}

		if (!$userID == $foundUser[0]){
			$addLecturer = "INSERT INTO Lecturer VALUES ('$userID')";
			mysqli_query($conn, $addLecturer);
			echo $nameArray->{'firstname'};
		}
		else
		{
			echo $nameArray->{'firstname'};
		}
	}

	mysqli_close($conn);
?>