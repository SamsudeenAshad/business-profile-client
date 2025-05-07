<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Business Profile</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Contact Us</h1>
            <p>Get in touch with our team</p>
        </header>

        <div class="contact-wrapper">
            <div class="contact-info">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Our Location</h3>
                    <p>123 Business Street, Suite 100<br>New York, NY 10001</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <h3>Phone Number</h3>
                    <p>+1 (555) 123-4567</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <h3>Email Address</h3>
                    <p>contact@yourbusiness.com</p>
                </div>
            </div>

            <form class="contact-form" action="process.php" method="POST">
                <div class="form-group">
                    <input type="text" name="name" required>
                    <label>Your Name</label>
                </div>
                <div class="form-group">
                    <input type="email" name="email" required>
                    <label>Your Email</label>
                </div>
                <div class="form-group">
                    <input type="text" name="subject" required>
                    <label>Subject</label>
                </div>
                <div class="form-group">
                    <textarea name="message" required></textarea>
                    <label>Your Message</label>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>
    </div>
    <script src="assets/js/script.js"></script>
</body>
</html>