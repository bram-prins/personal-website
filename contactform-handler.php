<?php

    if (isset($_POST['submit'])) {
        
        $name = $_POST['name'];
        $mailFrom = $_POST['email'];
        $message = $_POST['message'];

        $mailTo = "info@bram-prins.com";
        $subject = "New bram-prins.com Contact-form Submission From: $name";
        $txt = "You have received an e-mail from $name \n $mailFrom \n\n $message";
        $mailHeader = "From: $email";

        mail($mailTo, $subject, $txt, $mailHeader);
        header("Location: contact.html");
    }

?>