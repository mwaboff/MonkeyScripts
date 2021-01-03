<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <h2>MonkeyScripts Email Verification</h2>
    <p>Welcome to the MonkeyScripts community, {{ $username }}! Before you will be able to log in, we will have to verify your email address. Please do so by clicking the below link:</p>
    <a href="{{ $activation_link }}" target="_blank">Click Here To Verify Email</a>
  </body>
</html>
