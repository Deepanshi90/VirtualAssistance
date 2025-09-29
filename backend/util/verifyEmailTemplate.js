const VerificationEmail = (username, otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
    }
    .header {
      text-align: center;
      background-color: #f0c14b;
      padding: 10px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #d35400;
      margin-top: 10px;
      text-align: center;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email Address</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${username}</strong>,</p>
      <p>Thank you for registering with <strong>Virtual Assistance</strong>.</p>
      <p>Please use the OTP below to verify your email address:</p>
      <div class="otp">${otp}</div>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Innovation. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

export default VerificationEmail;