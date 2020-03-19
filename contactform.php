<?php

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $mailFrom = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "info@bram-prins.com";
    $subject = "New bram-prins.com Contact-form Message From: $name";
    $txt = "You have received an e-mail from $name \n $mailFrom \n\n $message";
    $mailHeader = "From: $email \r\n";

    mail($mailTo, $subject, wordwrap($txt,90,"<br>\n",TRUE), $mailHeader) or die("Error!");
    echo "Thank you!";
}

?>