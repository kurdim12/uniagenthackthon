import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3010';
const FROM_EMAIL = process.env.SMTP_FROM || 'UNI-Agent <noreply@uniagent.com>';

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const verificationUrl = `${APP_URL}/auth/verify?token=${token}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 32px;">🎓 Welcome to UNI-Agent!</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px;">Hi ${name},</p>
      <p>Thank you for signing up! We're excited to have you join our community of students achieving academic excellence with AI.</p>
      <p><strong>Please verify your email address to get started:</strong></p>
      <div style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
      <p style="background: white; padding: 15px; border-radius: 6px; word-break: break-all; font-size: 13px;">${verificationUrl}</p>
      <p style="margin-top: 30px;">Once verified, you'll be able to:</p>
      <ul>
        <li>✨ Get instant AI help with your coursework</li>
        <li>📚 Organize study materials intelligently</li>
        <li>🎯 Track assignments and deadlines</li>
        <li>🧠 Create smart flashcards automatically</li>
        <li>📊 Analyze your learning patterns</li>
      </ul>
      <p style="margin-top: 30px;">Questions? Just reply to this email - we're here to help!</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} UNI-Agent. All rights reserved.</p>
      <p>This email was sent to ${email}</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Welcome to UNI-Agent, ${name}!

Please verify your email address by clicking this link:
${verificationUrl}

Or copy and paste it into your browser.

Once verified, you'll have access to all our AI-powered study tools!

Questions? Reply to this email.

© ${new Date().getFullYear()} UNI-Agent
  `;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: '🎓 Verify your UNI-Agent account',
      text,
      html,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    // Don't throw - we don't want to block signup if email fails
  }
}

export async function sendWelcomeEmail(email: string, name: string, plan: string) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 40px 30px; }
    .card { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #667eea; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎉 You're All Set!</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px;">Hi ${name},</p>
      <p><strong>Your account is now active!</strong> You're on the <strong>${plan}</strong> plan.</p>
      
      <div class="card">
        <h3 style="margin-top: 0;">🚀 Quick Start Guide</h3>
        <ol>
          <li><strong>Add Your Courses</strong> - Import syllabi or create manually</li>
          <li><strong>Upload Materials</strong> - PDFs, notes, lecture slides</li>
          <li><strong>Ask the AI Tutor</strong> - Get instant help 24/7</li>
          <li><strong>Create Flashcards</strong> - Automatically from your notes</li>
          <li><strong>Track Progress</strong> - See your analytics dashboard</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">Go to Dashboard</a>
      </div>

      <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">Need help? Check out our <a href="${APP_URL}/docs">documentation</a> or reply to this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} UNI-Agent. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: '🎉 Welcome to UNI-Agent - You\'re all set!',
      html,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

export async function sendSubscriptionConfirmation(
  email: string,
  name: string,
  plan: string,
  amount: number
) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px; }
    .receipt { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">✅ Subscription Confirmed!</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px;">Hi ${name},</p>
      <p>Thank you for upgrading to <strong>${plan}</strong>! Your subscription is now active.</p>
      
      <div class="receipt">
        <h3 style="margin-top: 0; color: #667eea;">Payment Receipt</h3>
        <div class="row">
          <span>Plan</span>
          <strong>${plan}</strong>
        </div>
        <div class="row">
          <span>Amount</span>
          <strong>$${(amount / 100).toFixed(2)}</strong>
        </div>
        <div class="row" style="border: none;">
          <span>Date</span>
          <span>${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <p style="margin-top: 30px;">You now have access to all ${plan} features!</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${APP_URL}/account" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">View Account</a>
      </div>

      <p style="color: #6b7280; font-size: 13px;">Manage your subscription anytime from your account settings.</p>
    </div>
    <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
      <p>© ${new Date().getFullYear()} UNI-Agent. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: '✅ Subscription Confirmed - Welcome to ' + plan,
      html,
    });
    console.log(`Subscription confirmation sent to ${email}`);
  } catch (error) {
    console.error('Failed to send subscription confirmation:', error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🔐 Reset Your Password</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px;">Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      
      <div style="text-align: center;">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </div>

      <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link:</p>
      <p style="background: white; padding: 15px; border-radius: 6px; word-break: break-all; font-size: 13px;">${resetUrl}</p>

      <div class="warning">
        <strong>⚠️ Security Note:</strong> This link will expire in 1 hour. If you didn't request this reset, you can safely ignore this email.
      </div>
    </div>
    <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
      <p>© ${new Date().getFullYear()} UNI-Agent. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: '🔐 Reset your UNI-Agent password',
      html,
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
}
