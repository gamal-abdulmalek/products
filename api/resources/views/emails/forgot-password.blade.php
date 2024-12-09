<!DOCTYPE html>
<html>
<head>
    <title>Password Reset OTP</title>
</head>
<body>
    <h1>Hello,</h1>
    <p>You requested a password reset. Use the OTP below to reset your password:</p>
    <h2>{{ $otp }}</h2>
    <p>This OTP will expire in 10 minutes.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you!</p>
</body>
</html>