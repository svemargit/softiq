<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields
    $name = $_POST['name'];
    $email = $_POST['email'];
    $option = $_POST['option'];
    $message = $_POST['message'];
    $config = $_POST['orderServices'];
    $total = $_POST['confirmedTotalPrice'];
    $monthly = $_POST['confirmedMonthlyPrice'];
    $to = 'svejdam@icloud.com';

    // Email subject
    $subject = 'SoftIQ reality zpráva';

    // Email message
    $email_message = "Odeslal: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Config: $config\n";
    $email_message .= "Na fakturu: $total\n";
    $email_message .= "Měsíčně: $monthly\n";
    $email_message .= "Typ webu: $option\n";
    $email_message .= "Zpráva:\n$message\n";
    // Email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Send the email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "<script>alert('Děkuji za zprávu, co nejdříve se Vám ozvu zpět.'); window.location.replace('https://reality.softiq.cz');</script>";
    } else {
        echo "<script>alert('Bohužel se to nepovedlo a email se neodeslal. Napište mi na svejdam@icloud.com'); window.location.replace('https://softiq.cz');</script>";
    }
}
?>
