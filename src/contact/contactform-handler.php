<?php

    if (isset($_POST['submit'])) {
        
        $name = $_POST['name'];
        $mailFrom = $_POST['email'];
        $message = $_POST['message'];

        if(preg_match('/\w\.\w/i', $message)) {
            header("Location: ..\..\contact.html?resp=err-1");
        } else {
            $mailTo = "info@bram-prins.com";
            $subject = "New bram-prins.com Contact-form Submission From: $name";
            $txt = "You have received an e-mail from $name \n $mailFrom \n\n $message";
            $mailHeader = "From: $mailFrom";

            mail($mailTo, $subject, $txt, $mailHeader);
            header("Location: ..\..\contact.html?resp=ok");
        }
    }

?>