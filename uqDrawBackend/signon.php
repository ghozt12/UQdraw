<?php
	//Single signon to retrieve USER Type and Name
	$userType = $_SERVER['HTTP_X_UQ_USER_TYPE'];
	$namejson = $_SERVER['HTTP_X_KVD_PAYLOAD'];
	$namearray = json_decode($namejson);

	if($userType == "Student")
	{
		//displays the Students name on the page
		echo $namearray->{'firstname'};
	}
	if($userType == "Staff")
	{
		//redirects staff to Lecturer-mode
		echo "<script> window.location.href = 'http://teamone.uqcloud.net/pages/lecture-mode.html'</script>";
	}	
	mysqli_close($conn);	
?>