<?php
include('connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,email,password,first_name,last_name
from users 
where email=?');
$query->bind_param('s', $email);
$query->execute();

$query->store_result();
$query->bind_result($id, $email, $hashed_password, $first_name, $last_name);
$query->fetch();

$num_rows = $query->num_rows();
if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = $first_name;
        $response['user_id'] = $id;
        $response['first_name'] = $first_name;
        $response['email'] = $email;
    } else {
        $response['status'] = "wrong password";
    }
}
echo json_encode($response);
