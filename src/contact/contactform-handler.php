<?php

    function redirect($url)
    {
        echo '<script type="text/javascript">window.location = "' . $url . '";</script>';
    }

    if (isset($_POST['submit'])) {
        
        $name = $_POST['name'];
        $mailFrom = $_POST['email'];
        $message = $_POST['message'];

        // Filter for spam
        if (preg_match('/\w\.\w/i', $message)) {
            header(http_response_code(406));
            echo '<p>Submission failed: links are not allowed</p>';
            redirect("../../contact.html?resp=err-1");
        } elseif (preg_match('/cryptaxbot/i', $message)) {
            header(http_response_code(406));
            echo '<p>Submission failed: content detected that is marked as spam</p>';
            redirect("../../contact.html?resp=err-2");
        } else {
            $mailTo = "info@bram-prins.com";
            $subject = "New bram-prins.com Contact-form Submission From: $name";
            $txt = "You have received an e-mail from $name \n $mailFrom \n\n $message";
            $mailHeader = "From: $mailFrom";

            mail($mailTo, $subject, $txt, $mailHeader);

            header(http_response_code(200));
            echo '<p>Thank you, your message was submitted succesfully</p>';
            redirect("../../contact.html?resp=ok");
        }
    }

?>