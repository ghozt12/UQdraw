<html>

<head>
  <!-- CSS -->
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/gridism.css">
</head>

<?php
	//by Joyce
	require("connectDB.php");



// 	session_start();
//	$courseID = $_POST['courseID'];
	$courseID = "AAAA1111";
?>

<body class="lecturer-startpage">

	<section>
		<div class="header-l-subjects-header">
			<img class='images-l-subjects' src="../assets/images/topbar-logo.png" />
			<h3 class="typography-l-h3"> Lecture Mode </h3>
			<a href="lecture-prepare.html"><div class="button-switch"> <p> goto Prepare Mode </p></div></a>
		</div>
	</section>

	<section class = "list-subjects-purple">

		<h2> Subjects </h2>
		<h3> Select Subject From Below </h3>
		<ul>
		<?php
		//by Joyce
			$query = 'SELECT * FROM question WHERE courseID= "'.$courseID.'"';
			$result = mysqli_query($mysqli, $query);
			if ($result) {
			    echo "Yes";
			    for($x=0;$row=$result->fetch_object();$x++){
			        //echo $row->courseID;
		?>

			<li> <span class="subject"> <?php echo $row->courseID; ?> </span> </li>

		<?php	    
				}
			} else {
			    echo "No result in the Question Table";
			}
		?>

			<li> <span class="subject"> Subject 1 </span> </lI>
			<li> <span class="subject"> Subject 2 </span> </lI>
			<li> <span class="subject"> Subject 3 </span> </lI>

		</ul>

	</section>

</body>
	<!-- Library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

	<!-- JS -->
</html>