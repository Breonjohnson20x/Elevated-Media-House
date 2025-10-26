import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  email: string;
  name: string;
  type: 'welcome' | 'tour' | 'first-release' | 'marketing-tips' | 'success-stories';
}

const emailTemplates = {
  welcome: (name: string) => ({
    subject: "🎵 Welcome to Elevated Media House!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 12px; }
          .header h1 { color: #0a0a0a; margin: 0; font-size: 32px; font-weight: 700; }
          .content { background-color: #1a1a1a; padding: 30px; border-radius: 12px; margin-top: 20px; }
          .button { display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0a0a0a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; color: #888888; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Elevated Media House</h1>
          </div>
          <div class="content">
            <h2 style="color: #FFD700;">Hey ${name}!</h2>
            <p>Welcome to Elevated Media House! We're thrilled to have you join our community of independent artists building sustainable music careers.</p>
            <p>Your account is now active and ready to use. Here's what you can do right now:</p>
            <ul style="line-height: 1.8;">
              <li>Explore our AI Powerhouse Toolkit with 7 professional tools</li>
              <li>Browse our distribution packages</li>
              <li>Submit your first release</li>
              <li>Access your personalized dashboard</li>
            </ul>
            <p>We're here to support you every step of the way. If you have any questions, just reply to this email!</p>
            <a href="${Deno.env.get('APP_URL') || 'http://localhost:5173'}/portal" class="button">Go to Dashboard</a>
          </div>
          <div class="footer">
            <p>© 2025 Elevated Media House. All rights reserved.</p>
            <p><a href="mailto:breonjohnson20x@gmail.com" style="color: #FFD700;">Contact Support</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  tour: (name: string) => ({
    subject: "🚀 Your Guided Tour of Elevated Media House",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 12px; }
          .content { background-color: #1a1a1a; padding: 30px; border-radius: 12px; margin-top: 20px; }
          .feature { background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0a0a0a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 7 AI Tools at Your Fingertips</h1>
          </div>
          <div class="content">
            <h2 style="color: #FFD700;">Hi ${name},</h2>
            <p>Ready to explore your new AI-powered toolkit? Here's what's waiting for you:</p>
            <div class="feature">
              <strong>🎨 Cover Art Generator</strong><br>
              Create professional album artwork in seconds
            </div>
            <div class="feature">
              <strong>✍️ Marketing Copy Writer</strong><br>
              Generate compelling pitches, bios, and social posts
            </div>
            <div class="feature">
              <strong>📅 Release Strategy Assistant</strong><br>
              Get personalized release timing recommendations
            </div>
            <div class="feature">
              <strong>And 4 more powerful tools!</strong>
            </div>
            <a href="${Deno.env.get('APP_URL') || 'http://localhost:5173'}/ai-tools" class="button">Explore AI Tools</a>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  'first-release': (name: string) => ({
    subject: "🎶 Ready to Release Your Music?",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 12px; }
          .content { background-color: #1a1a1a; padding: 30px; border-radius: 12px; margin-top: 20px; }
          .checklist { background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .checklist-item { padding: 10px 0; border-bottom: 1px solid #333; }
          .button { display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #0a0a0a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Pre-Release Checklist</h1>
          </div>
          <div class="content">
            <h2 style="color: #FFD700;">${name}, let's get your music out there!</h2>
            <p>Before you submit your release, make sure you have:</p>
            <div class="checklist">
              <div class="checklist-item">✅ High-quality audio file (WAV or FLAC preferred)</div>
              <div class="checklist-item">✅ Cover art (3000x3000px minimum)</div>
              <div class="checklist-item">✅ Complete metadata (title, artist name, genre)</div>
              <div class="checklist-item">✅ Release date (at least 3-4 weeks out)</div>
              <div class="checklist-item">✅ Artist bio and social links</div>
            </div>
            <h3 style="color: #FFD700;">Choose Your Package:</h3>
            <p><strong>Basic ($50-$75):</strong> Perfect for getting started<br>
            <strong>Pro ($150-$200):</strong> Most popular - includes playlist pitching<br>
            <strong>Deluxe ($300-$500):</strong> Full marketing campaign</p>
            <a href="${Deno.env.get('APP_URL') || 'http://localhost:5173'}/portal" class="button">Submit Your Release</a>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  'marketing-tips': (name: string) => ({
    subject: "📈 Marketing Your Music Like a Pro",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 12px; }
          .content { background-color: #1a1a1a; padding: 30px; border-radius: 12px; margin-top: 20px; }
          .timeline { background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your 30-Day Release Strategy</h1>
          </div>
          <div class="content">
            <h2 style="color: #FFD700;">Hey ${name}!</h2>
            <p>Here's your step-by-step marketing roadmap:</p>
            <div class="timeline">
              <strong>Weeks 3-4 Before Release:</strong><br>
              • Set up pre-save campaign<br>
              • Start teasing on social media<br>
              • Pitch to playlists
            </div>
            <div class="timeline">
              <strong>Release Week:</strong><br>
              • Share on all platforms<br>
              • Engage with fans<br>
              • Monitor analytics
            </div>
            <div class="timeline">
              <strong>Weeks 1-4 After:</strong><br>
              • Share user-generated content<br>
              • Submit to more playlists<br>
              • Plan follow-up content
            </div>
            <p>Pro tip: Use our AI Marketing Copy Writer to create all your promotional content in minutes!</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  'success-stories': (name: string) => ({
    subject: "✨ You're Part of Something Special",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 30px; text-align: center; border-radius: 12px; }
          .content { background-color: #1a1a1a; padding: 30px; border-radius: 12px; margin-top: 20px; }
          .stat { background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center; }
          .stat-number { font-size: 36px; font-weight: 700; color: #FFD700; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to the Community</h1>
          </div>
          <div class="content">
            <h2 style="color: #FFD700;">${name}, you're in good company!</h2>
            <p>You're now part of a growing community of successful independent artists:</p>
            <div class="stat">
              <div class="stat-number">100+</div>
              <div>Artists Distributed</div>
            </div>
            <div class="stat">
              <div class="stat-number">50M+</div>
              <div>Total Streams Generated</div>
            </div>
            <div class="stat">
              <div class="stat-number">98%</div>
              <div>Satisfaction Rate</div>
            </div>
            <p>Your success is our success. We're here to support you every step of the way.</p>
            <p>Need help? Have questions? Just reply to this email or reach out at breonjohnson20x@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, name, type }: EmailRequest = await req.json();

    if (!email || !name || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, name, type' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const template = emailTemplates[type];
    if (!template) {
      return new Response(
        JSON.stringify({ error: 'Invalid email type' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { subject, html } = template(name);

    console.log(`Sending ${type} email to ${email}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${type} email would be sent to ${email}`,
        subject,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});