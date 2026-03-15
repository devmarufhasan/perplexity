# Gmail OAuth2 Setup for Nodemailer

This document explains how to configure Gmail OAuth2 for the backend mail service used in this project.

It covers:

- Google Cloud project setup
- OAuth consent screen configuration
- OAuth client credential creation
- Refresh token generation with OAuth Playground
- Required environment variables
- Backend Nodemailer configuration

## Overview

The backend uses Gmail OAuth2 with Nodemailer to send emails securely without storing a plain Gmail password.

Relevant backend file:

- [`backend/src/services/mail.service.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/services/mail.service.js)

Required environment variables:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_USER`

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enter a project name and click **Create**.
4. Open **APIs & Services**.
5. Click **Enable APIs and Services**.
6. Search for **Gmail API** and enable it.

## 2. Configure the OAuth Consent Screen

1. In **APIs & Services**, open **OAuth consent screen**.
2. Click **Get Started**.
3. Fill in the application information.
4. Set the audience to **External**.
5. Provide a valid contact email.
6. Complete the setup flow and create the consent screen.

## 3. Add a Test User

1. Open **OAuth consent screen**.
2. Go to the **Audience** section.
3. Add the Gmail account you will use for authentication as a test user.

> If the authenticated Gmail account is not listed as a test user, OAuth authorization may fail.

## 4. Create OAuth Client Credentials

1. Go to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** > **OAuth client ID**.
3. Choose **Web application**.
4. Add these redirect URIs:
   - `http://localhost`
   - `https://developers.google.com/oauthplayground`

5. Click **Create**.

Google will generate:

- `Client ID`
- `Client Secret`

Store both securely. You will use them in your backend `.env`.

## 5. Generate a Refresh Token with OAuth Playground

1. Open [OAuth Playground](https://developers.google.com/oauthplayground/).
2. Click the settings icon in the top-right corner.
3. Enable **Use your own OAuth credentials**.
4. Paste your Google `Client ID` and `Client Secret`.
5. Close the settings panel.

### Authorize Gmail Access

1. In the left panel, find **Gmail API v1**.
2. Select this scope:

```text
https://mail.google.com/
```

3. Click **Authorize APIs**.
4. Choose the Gmail account that matches your configured test user.
5. Complete the Google authorization flow.

### Exchange the Authorization Code

1. In Step 2 of OAuth Playground, click **Exchange authorization code for tokens**.
2. Copy the generated **Refresh Token**.
3. Optionally copy the **Access Token** for temporary debugging.
4. Save the refresh token securely in your backend `.env`.

## 6. Configure Environment Variables

Add these variables to your backend environment file:

```env
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN=YOUR_GOOGLE_REFRESH_TOKEN
GOOGLE_USER=YOUR_GOOGLE_USER
```

These keys are already reflected in [`backend/.env.example`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/.env.example).

### Variable Reference

- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_REFRESH_TOKEN`: Refresh token generated from OAuth Playground
- `GOOGLE_USER`: Gmail address used to authorize the application

## 7. Backend Nodemailer Configuration

The backend mail service is configured like this:

```js
import nodemailer from "nodemailer";
import env from "../config/env.js";

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
```

## 8. Sending an Email

Import `sendEmail` where needed and call it with:

- `to`: recipient email address
- `subject`: email subject
- `html`: email body content

Example:

```js
await sendEmail("example@gmail.com", "Verify Your Email", "<h1>Hello</h1>");
```

## Notes

- Make sure the Gmail API is enabled in your Google Cloud project.
- Make sure the authenticated Gmail account is added as a test user.
- Keep OAuth credentials and refresh tokens private.
- Store sensitive values in `.env` files, never directly in source code.
- If `transporter.verify()` fails, re-check your client credentials, refresh token, and Gmail account access.
