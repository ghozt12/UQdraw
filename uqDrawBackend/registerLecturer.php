<?php 
	//DB credentials
	include 'connectDB.php';
	//UQ Single Sign On to retrieve userID TYPE and Name
	$userID = $_SERVER['HTTP_X_UQ_USER'];
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	$nameJson = $_SERVER['HTTP_X_KVD_PAYLOAD'];
	$nameArray = json_decode($nameJson);

	//Commented to test Lecturer-mode without getting redirected
	/*if($userType !== "Staff")
	{
		echo "<script> window.location.href = 'http://teamone.uqcloud.net'</script>";
	}*/
	/*if($userType == "Staff")
	{*/

		$userQuery = "SELECT lecturerID FROM Lecturer WHERE lecturerID = '$userID'";
		//See if lecturer exists in the DB
		$userResult = mysqli_query($mysqli, $userQuery);
		$foundUser = "";
	
		if(mysqli_num_rows($userResult) > 0){
			// output data of each row
			while($row = mysqli_fetch_array($userResult)){
				$foundUser = $row;
			}
		}

		//If userID does not exist on the DB insert their UserID into the Lecturer table
		if ($userID !== $foundUser[0]){
			$addLecturer = "INSERT INTO Lecturer VALUES ('$userID')";
			mysqli_query($mysqli, $addLecturer);
			//Display their name
			echo $nameArray->{'firstname'};
		}
		else
		{
			echo $nameArray->{'firstname'};
		}
	/*}*/
	mysqli_close($mysqli);
?>