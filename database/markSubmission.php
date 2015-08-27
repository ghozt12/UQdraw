<?php

	/*
		this begins when user wants to view and mark students submission
	*/
	require['dbconnect.php'];

	$questionID = $_POST['questionID'];
    $result = $_POST['result'];    
	

	/*
       retrieve the Submission with unique question ID
       update restaurant details in sql form
    */
    $sql = "UPDATE submission SET = result ='".$result."' WHERE questionID='".$questionID."'";

    mysql_select_db('uqdraw');

    $retval = mysql_query( $sql);

    if(! $retval )
    {
        die('Could not update data: ' . mysql_error());
    }else{
    echo "update data successfully!<br><br>";

	
	/*
        after retrive the result
        go to nextpage.com 
    */
    header('Location: http://www.NEXTPAGE.com/');

?>