<?php

	/*
		this begins when user wants to view students submission
		display all solution that student submitted
	*/
	require['dbconnect.php'];

	$questionID = $_POST['questionID'];
	

	/*
       retrieve the Submission with unique question ID
    */
	$sql = 'SELECT * from submission WHERE questionID = "'.$questionID.'"';
	
	$r = mysql_query($sql);
	if(!$r) {
        $err=mysql_error();
        print $err;
        exit();
    }
    else if(mysql_affected_rows()==0){
        print "course not found";
    }
    else{
    	while(($row = mysql_fetch_assoc($r))){			//display all possible result 
    		$studentID = $row['studentID'];
    		$subImage = $row['subImage'];
    		$result = $row['result'];				
    	}
    }

    /*
        add needed information into session()
    */
    session_start();
    $_SESSION['questionID'] = $questionID;



	/*
        after retrive the result
        go to nextpage.com 
    */
    header('Location: http://www.NEXTPAGE.com/');

?>