# Gmail OAuth2 Setup for Nodemailer

This guide explains how to configure Gmail OAuth2 for Nodemailer using Google Cloud Console and OAuth Playground.

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project by clicking **New Project**.
3. Enter your preferred project name and click **Create**.
4. After the project is created, go to **APIs & Services**.
5. Click **Enable APIs and Services**.
6. Search for **Gmail API** and enable it.

## 2. Configure the OAuth Consent Screen

1. In **APIs & Services**, open the **OAuth consent screen**.
2. Click **Get Started** to begin the project configuration.

### App Information

1. Complete the **App Information** section.
2. Set the **Audience** to **External**.
3. Provide a valid **Contact Email**.
4. Review and agree to the required terms.
5. Click **Create** to finish the setup.

## 3. Add a Test User

1. In **APIs & Services**, open the **OAuth consent screen**.
2. Go to the **Audience** section.
3. Add a **Test User** using the same email address you plan to use for authentication.

> This step is important. If the email is not added as a test user, authentication may fail during email-related actions.

## 4. Create OAuth Client Credentials

1. In **APIs & Services**, go to **Credentials**.
2. Click **Create Credentials** and select **OAuth client ID**.
3. Choose **Web application** as the application type.
4. In **Authorized redirect URIs**, add the following:
   - `http://localhost`
   - `https://developers.google.com/oauthplayground`
5. Click **Create**.

After that, Google will generate a **Client ID** and **Client Secret**. Copy them and save them securely in your `.env` file.

## 5. Generate Refresh Token Using OAuth Playground

1. Go to [OAuth Playground](https://developers.google.com/oauthplayground/).
2. Click the gear icon in the top-right corner.
3. Enable **Use your own OAuth credentials**.
4. Enter your **Client ID** and **Client Secret**, then click **Close**.

### Authorize Gmail API

1. In the left panel, find **Gmail API v1**.
2. Select the following scope:

```text
https://mail.google.com/

Click Authorize APIs.

Choose the correct Google account.

Continue through the authorization steps until you are redirected back to the OAuth Playground.

Exchange Authorization Code for Tokens

In Step 2, click Exchange authorization code for tokens.

After the tokens are generated, copy the Refresh Token.

If needed, you can also copy the Access Token.

Save these values securely in your .env file.

After saving the tokens, you can close the OAuth Playground.

6. Environment Variables

Add the following variables to your .env file:

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN=YOUR_GOOGLE_REFRESH_TOKEN
GOOGLE_USER=YOUR_GOOGLE_USER

Variable Details

GOOGLE_CLIENT_ID: Your Google OAuth Client ID

GOOGLE_CLIENT_SECRET: Your Google OAuth Client Secret

GOOGLE_REFRESH_TOKEN: The refresh token generated from OAuth Playground

GOOGLE_USER: The Google email address you used to configure and authorize the application

7. Configure Nodemailer with Gmail OAuth2

Use the following Nodemailer configuration with your environment variables:

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.googleUser,
    clientSecret: env.googleClientSecret,
    clientId: env.googleClientId,
    refreshToken: env.googleRefreshToken,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Mail transporter is ready");
  })
  .catch((err) => {
    console.error("Error setting up mail transporter:", err);
  });

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: env.googleUser,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
};

8. Send Email

Import the sendEmail function wherever you need to send emails, then call it with:

to → recipient email address

subject → email subject

html → email body in HTML format

await sendEmail("example@gmail.com", "Verify Your Email", "<h1>Hello</h1>");

Notes

Make sure the Gmail API is enabled in your Google Cloud project.

Make sure the authenticated email is added as a test user in the OAuth consent screen.

Always keep your OAuth credentials and refresh token secure.

Store all sensitive values in the .env file and never hardcode them in your project.
```

##
