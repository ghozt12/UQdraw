<?php
//connect to phpmyadmin

header('Content-type: text/html; charset=utf-8');


$hostname = "localhost";
$database = "uqdraw";
$username = "joyce_admin";
$password = "joyce";


$connect=@mysql_connect($hostname, $username, $password) 
or die("Cannot connect to DB!");
@mysql_select_db($database) 
or die("Cannot select DB!");
mb_language('uni'); 
mb_internal_encoding('UTF-8');
?>