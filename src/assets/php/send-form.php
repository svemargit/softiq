<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields
    $name = $_POST['name'];
    $email = $_POST['email'];
    $option = $_POST['option'];
    $message = $_POST['message'];
    $to = 'svejdam@icloud.com';

    // Email subject
    $subject = 'SoftIQ zpráva';

    // Email message
    $email_message = "Odeslal: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Typ webu: $option\n";
    $email_message .= "Zpráva:\n$message\n";

    // Email headers
    $headers = 'From: svejdam@icloud.com' . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Send the email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "<script>alert('Děkuji za zprávu, co nejdříve se Vám ozvu zpět.'); window.location.replace('https://softiq.cz');</script>";
    } else {
        echo "<script>alert('Bohužel se to nepovedlo a email se neodeslal. Napište mi na svejdam@icloud.com'); window.location.replace('https://softiq.cz');</script>";
    }
}
?>