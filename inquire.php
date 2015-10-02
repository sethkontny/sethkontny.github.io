<?php 
	//set variables
	$name = trim($_POST['name']);
	$emailTo = trim($_POST['myemail']);
	$email = trim($_POST['email']);
	$phone = trim($_POST['phone']);
	$comments = trim($_POST['comments']);
	$selectedItems = trim($_POST['selectedItems']);

	//Check to make sure sure that a valid email address is submitted
	if($email == '')  {
		echo "f";
	} 
	else if (!preg_match("/^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$/i", $email)) {
		echo "f";
	} 
	else {
		
		//Send mail
		$body = "Customer Name: $name \n\nCustomer Email: $email \n\nPhone:\n$phone \n\nSelected Items: $selectedItems \n\nComments:\n$comments";
		$subject = "Customer Inquiry";
		$headers = "MIME-Version: 1.0\n";
		$headers .= "Content-type: text/plain; charset=iso-8859-1\n";
		$headers .= "From: website\n";
		$headers .= "Reply-To: ".$email."\n";
		$headers .= "X-Mailer: PHP's mail() Function\n";
		if (mail($emailTo, $subject, $body, $headers)) {
			echo "s";
		}
		else {
			echo "f";
		}
	}
?>
