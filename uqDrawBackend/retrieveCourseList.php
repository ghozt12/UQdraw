<?php
/**
 * Created by PhpStorm.
 * User: kinngaileung
 * Date: 29/8/15
 * Time: 11:15 PM
 */
include "conn.php";

$JSONData = $_GET[""];
$JSONobj = json_decode($JSONData);
$studentId = $JSONobj->{'studentId'};

// get data from Single Sign on

$courseList = array();
$courseList["courseList"] = "";





echo json_encode($courseList);// display JSON

?>