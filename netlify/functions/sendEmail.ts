import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse and validate request body
    if (!event.body) {
      throw new Error('Missing request body');
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid JSON payload' 
        }),
      };
    }

    const { name, email, message } = parsedBody;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Please provide all required fields',
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Please provide a valid email address',
        }),
      };
    }

    // Create transporter with error handling
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    await transporter.verify().catch((error) => {
      console.error('Transporter verification failed:', error);
      throw new Error('Email service configuration error');
    });

    // Email options with improved HTML template
    const mailOptions = {
      from: `"Visakha Tech Solutions" <${process.env.GMAIL_USER}>`,
      to: 'yashlaxmanreddy@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #2563eb, #0d9488); padding: 20px; color: white; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
            .footer { margin-top: 20px; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <p class="label">Name:</p>
                <p>${name}</p>
              </div>
              <div class="field">
                <p class="label">Email:</p>
                <p>${email}</p>
              </div>
              <div class="field">
                <p class="label">Message:</p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <div class="footer">
                <p>This message was sent from the Visakha Tech Solutions contact form.</p>
                <p>Date: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Sent from: Visakha Tech Solutions Contact Form
Date: ${new Date().toLocaleString()}
      `,
    };

    // Send email with proper error handling
    await transporter.sendMail(mailOptions).catch((error) => {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: '✅ Message sent successfully! We will get back to you soon.',
      }),
    };
  } catch (error) {
    console.error('Error in sendEmail function:', error);

    // Provide more specific error messages
    let errorMessage = 'Failed to send message. Please try again later.';
    if (error instanceof Error) {
      if (error.message.includes('configuration')) {
        errorMessage = 'Email service temporarily unavailable. Please try again later.';
      } else if (error.message.includes('Missing')) {
        errorMessage = 'Invalid request format. Please try again.';
      }
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: `❌ ${errorMessage}`,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };