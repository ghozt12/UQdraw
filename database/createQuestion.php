<?php

    /*
        When lecturer upload a Question, 
        system create a Question Table 
        and store information 
        as well as Course ID
    */
    
    require['dbconnect.php'];

    $questionTitle = $_POST['questionTitle'];
    $questionImage = $_POST['questionImage'];
   
    session_start();
    $lectID = $_SESSION['lecturerID'];
    $courseID = $_SESSION['courseID'];


    //set insert Question information in sql form 
    "INSERT INTO question".
    "(courseID, questionID, questionTitle, questionImage)".
    "VALUES".
    " (".$courseID."','','".$questionTitle."','".$questionImage."')";

    //select database name
    mysql_select_db('uqdraw');

     //insert sql into database
    $retval = mysql_query( $sql);

    if(! $retval )
    {
      die('Could not create Course Table: ' . mysql_error());
    }
    echo "Inserted Question successfully!<br><br>";


    /*
        add needed information into session()
    */
    session_start();
    $_SESSION['questionTitle'] = $questionTitle;



    /*
        after procceed the insertion Question to db, 
        go to nextpage.com
    */
    header('Location: http://www.NEXTPAGE.com/');


?>
