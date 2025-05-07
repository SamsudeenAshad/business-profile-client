<?php
header('Content-Type: application/json');

// Validate form data
$required_fields = ['name', 'email', 'subject', 'message'];
$error_messages = [];

foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        $error_messages[] = ucfirst($field) . ' is required';
    }
}

if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $error_messages[] = 'Invalid email format';
}

if (!empty($error_messages)) {
    http_response_code(400);
    echo json_encode(['errors' => $error_messages]);
    exit;
}

// Sanitize form data
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

// Email configuration
$to = "your-email@yourdomain.com"; // Replace with your email
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$email_content = "
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Subject:</strong> $subject</p>
    <p><strong>Message:</strong></p>
    <p>$message</p>
</body>
</html>
";

// Send email
$mail_sent = mail($to, "Contact Form: $subject", $email_content, $headers);

if ($mail_sent) {
    http_response_code(200);
    echo json_encode(['message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['errors' => ['Failed to send message']]);
}
?>