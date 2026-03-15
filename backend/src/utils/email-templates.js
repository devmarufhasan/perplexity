export const buildVerificationEmailTemplate = ({
  username,
  verificationUrl,
}) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;margin:0;padding:0;background-color:#f4f7fb;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:0 0 16px 0;text-align:center;font-family:Arial,sans-serif;font-size:24px;line-height:32px;font-weight:700;color:#0f172a;">
              Perplexity - Your AI Companion
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:28px;line-height:36px;font-weight:700;color:#111827;padding:0 0 16px 0;">
                    Verify your email
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#4b5563;padding:0 0 12px 0;">
                    Hi ${username},
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:16px;line-height:24px;color:#4b5563;padding:0 0 24px 0;">
                    Thanks for signing up. Please confirm your email address to finish setting up your account and start using the app securely.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 24px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="#2563eb" style="border-radius:8px;">
                          <a href="${verificationUrl}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:16px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;">
                            Verify Email
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#6b7280;padding:0 0 8px 0;">
                    If the button does not work, copy and paste this link into your browser:
                  </td>
                </tr>
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#2563eb;word-break:break-word;padding:0 0 24px 0;">
                    <a href="${verificationUrl}" style="color:#2563eb;text-decoration:underline;">
                      ${verificationUrl}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid #e5e7eb;padding:20px 0 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:18px;color:#9ca3af;">
                    If you did not create this account, you can safely ignore this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;
