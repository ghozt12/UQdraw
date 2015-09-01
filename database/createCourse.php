<?php

    /*
        When lecturer enter the system, 
        system retrieved lecturer information 
        => system stored lecturer ID as varchar.

        This php file is to store info in db as:
        lecturer create a course and lecturer select 3 entering code

        another option is:
        2.  lecturer create a course and 3 entering code is auto generated
        3.  the course is retrieved from single on, lecturer select 3 entering code
        4.  the course is retrieved from single on, and  3 entering code  is auto generated
    */



    
    require['dbconnect.php'];

    $lectID = $_POST['lecturerID'];
    $courseID = $_POST['courseID'];
    $enteringCode = $_POST['enteringCode'];

    //set insert course information in sql form 
    $sql = "INSERT INTO course"
    "(lecturerID, courseID, enteringCode) ".
    "VALUES".
    " (".$lectID."','".$courseID."','".$enteringCode."')";

    //select database name
    mysql_select_db('uqdraw');

     //insert sql into database
    $retval = mysql_query( $sql);

    if(! $retval )
    {
      die('Could not create Course Table: ' . mysql_error());
    }
    echo "Inserted Course successfully!<br><br>";


    /*
        add needed information into session()
    */
    session_start();
    $_SESSION['lecturerID'] = $lectID;
    $_SESSION['courseID'] = $courseID;



    /*
        after procceed the insertion course to db, 
        go to nextpage.com
    */
    header('Location: http://www.NEXTPAGE.com/');


?>
