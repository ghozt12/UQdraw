<?php
		/** MySQL database name */
		define('DB_NAME', 'uqdraw');
		/** MySQL database username */
		define('DB_USER', 'root');
		/** MySQL database password */
		define('DB_PASSWORD', 'mYzL@vbOwepH');
		/** MySQL hostname */
		define('DB_HOST', 'localhost');
		
		// Initialization
		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		
		// Error checking
		if(!$conn) {
			failWithError('Could not connect to database');
		} 
?>