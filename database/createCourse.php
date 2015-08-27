<?php
	$searchName = $_POST['searchName'];
    $searchAddress = $_POST['searchAddress'];
    $searchContact = $_POST['searchContact'];  

    //nstarts from here
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
    header('Location: http://www.NEXTPAGE.com/');


?>
