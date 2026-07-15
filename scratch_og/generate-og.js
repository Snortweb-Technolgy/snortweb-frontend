const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 }); // Scale factor 2 for sharpness

  // Read logo base64
  const logoBuffer = fs.readFileSync('../frontend/public/logo-icon.webp');
  const logoBase64 = `data:image/webp;base64,${logoBuffer.toString('base64')}`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap');
    body {
      margin: 0;
      width: 1200px;
      height: 630px;
      background: radial-gradient(circle at 10% 50%, #15120a 0%, #050505 100%);
      font-family: 'Inter', system-ui, sans-serif;
      color: #F5F3EF;
      display: flex;
      align-items: center;
      padding: 0 100px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
      background-size: 40px 40px;
      z-index: 0;
    }
    .content {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      width: 100%;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .logo {
      height: 80px;
      object-fit: contain;
    }
    .brand {
      font-size: 48px;
      font-weight: 900;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #E8E6E3;
      margin: 0;
    }
    .tagline {
      font-size: 64px;
      font-weight: 900;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #FFF 0%, #D4AF37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 0 20px 0;
    }
    .services {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 20px;
    }
    .service {
      font-size: 32px;
      font-weight: 600;
      color: #A0A0A0;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .service::before {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      background: #D4AF37;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }
    .accent-blur {
      position: absolute;
      top: 50%;
      right: -10%;
      width: 600px;
      height: 600px;
      background: rgba(212, 175, 55, 0.1);
      filter: blur(150px);
      border-radius: 50%;
      z-index: 0;
      transform: translateY(-50%);
    }
  </style>
  </head>
  <body>
    <div class="grid"></div>
    <div class="accent-blur"></div>
    <div class="content">
      <div class="logo-container">
        <img class="logo" src="${logoBase64}" />
        <h2 class="brand">Snortweb</h2>
      </div>
      <h1 class="tagline">Build. Secure. Grow.</h1>
      <div class="services">
        <div class="service">Website Development</div>
        <div class="service">Cybersecurity</div>
        <div class="service">Cloud Solutions</div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '../frontend/public/og-image.png', type: 'png' });
  await browser.close();
  console.log('og-image.png generated successfully.');
})();
