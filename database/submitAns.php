<?php
	/*
		This php begins when student submit their solution
	*/

	require['dbconnect.php'];

	$questionID = $_POST['questionID'];
    $subImage = $_POST['subImage'];



    /*
        retrieve student ID from session
    */
    session_start();
    $studentID = $_SESSION['studentID'];


	//set insert Question information in sql form 
    "INSERT INTO submission".
    "(questionID, studentID, date, subImage, result)".
    "VALUES".
    " (".$questionID."','".$studentID."','".$DATEEEE??."','".$subImage."','')";

    //select database name
    mysql_select_db('uqdraw');

    //insert sql into database
    $retval = mysql_query( $sql);

    if(! $retval )
    {
      die('Could not create/submit answer under Submission Table: ' . mysql_error());
    }
    echo "Answer submitted successfully!<br><br>";


    /*
        add needed information into session()
    */



    /*
        after submit answer to Submission db, 
        go to nextpage.com - student page, questions page
    */
    header('Location: http://www.NEXTPAGE.com/');
?>