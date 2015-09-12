<!-- <!DOCTYPE html> 
<html>

<!?php
echo "testasdhakls";
require_once = "uq/auth.php";
//auth_require();
?>
</html> -->
<?php
if (isset($_SERVER['HTTP_X_UQ_USER'])) {
    session_start();
    echo "$test[1]";
    $test = var_dump(["HTTP_X_KVD_PAYLOAD"]);
    echo "<br/>";
    var_dump( $_SERVER['HTTP_X_UQ_USER_TYPE']);
    
    // header('HTTP/1.0 302 Found');
    // header('Location: /phpmyadmin/index.php?server=1');
    die();
}

header('HTTP/1.0 403 Forbidden');
die();

