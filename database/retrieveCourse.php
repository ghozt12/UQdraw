<?php
	/*
		This php begins with a student open UQDraw website 
		and enter 3 entering code
		system are expected to search for the course 
		based on 3 unique entreing code
	*/

	require['dbconnect.php'];

	$enteringCode = $_POST['enteringCode'];

	$sql = 'SELECT * from course WHERE enteringCode = "'.$enteringCode.'"';
	
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
    	while(($row = mysql_fetch_assoc($r))){
    		$courseID = $row['courseID'];
    	}
    }

    /*
        add needed information into session()
    */
    session_start();
    $_SESSION['courseID'] = $courseID;


    /*
        after procceed the retrieving Course action from db, 
        go to nextpage.com and display course information(questions)
    */
    header('Location: http://www.NEXTPAGE.com/');
?>