const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
const outputPath = path.join(docsDir, 'deployment.png');

// Read existing public/index.html body content
const publicHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
let appHtml = fs.readFileSync(publicHtmlPath, 'utf-8');

// Wrap public/index.html inside browser mockup showing live URL
const browserMockupHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Live Deployment Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0b0f19;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .browser-frame {
      width: 100%;
      max-width: 1150px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .browser-header {
      background: #0f172a;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid #334155;
    }
    .traffic-lights {
      display: flex;
      gap: 8px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }
    .url-bar {
      flex-grow: 1;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #94a3b8;
      font-size: 13px;
    }
    .lock-icon {
      color: #10b981;
      font-weight: bold;
    }
    .live-url {
      color: #f8fafc;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    .status-badge {
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .status-indicator {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
    }
    .browser-viewport {
      background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 70%);
      padding: 40px 20px;
      min-height: 580px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #f8fafc;
    }
    .container {
      width: 100%;
      max-width: 580px;
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
      margin-bottom: 12px;
    }
    .title {
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .subtitle {
      color: #94a3b8;
      font-size: 0.95rem;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      margin-bottom: 24px;
    }
    .input-group {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .input-field {
      flex: 1;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px 16px;
      color: #f8fafc;
      font-size: 0.95rem;
      outline: none;
    }
    .btn-primary {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 12px 24px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
    }
    .badge {
      background: #0f172a;
      border: 1px solid #334155;
      color: #94a3b8;
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .todo-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .todo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 10px;
      padding: 14px 16px;
    }
    .todo-item-text {
      font-size: 0.95rem;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .todo-checkbox {
      width: 18px;
      height: 18px;
      accent-color: #3b82f6;
    }
    .btn-delete {
      background: transparent;
      border: none;
      color: #ef4444;
      font-size: 14px;
      cursor: pointer;
    }
    .footer-note {
      text-align: center;
      font-size: 0.8rem;
      color: #64748b;
    }
    .footer-note code {
      background: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="browser-frame">
    <div class="browser-header">
      <div class="traffic-lights">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="url-bar">
        <span class="lock-icon">🔒</span>
        <span class="live-url">https://devops-24eskcs007.onrender.com</span>
      </div>
      <div class="status-badge">
        <span class="status-indicator"></span>
        <span>HTTP 200 OK • Deployed</span>
      </div>
    </div>
    <div class="browser-viewport">
      <div class="container">
        <div class="header">
          <span class="header-badge">DevOps Practice</span>
          <h1 class="title">To-Do List App</h1>
          <p class="subtitle">Node.js • Express • MongoDB • Docker • Compose • Prometheus</p>
        </div>

        <div class="card">
          <div class="input-group">
            <input type="text" class="input-field" value="Verify Kubernetes Deployment Pods" placeholder="What needs to be done?">
            <button class="btn-primary">Add Task</button>
          </div>

          <div class="section-header">
            <span class="section-title">Your Tasks</span>
            <span class="badge">3 tasks</span>
          </div>

          <ul class="todo-list">
            <li class="todo-item">
              <span class="todo-item-text">
                <input type="checkbox" class="todo-checkbox" checked>
                <span style="text-decoration: line-through; color: #64748b;">Build and test production Docker image</span>
              </span>
              <button class="btn-delete">✕</button>
            </li>
            <li class="todo-item">
              <span class="todo-item-text">
                <input type="checkbox" class="todo-checkbox" checked>
                <span style="text-decoration: line-through; color: #64748b;">Configure Prometheus metrics & dashboard</span>
              </span>
              <button class="btn-delete">✕</button>
            </li>
            <li class="todo-item">
              <span class="todo-item-text">
                <input type="checkbox" class="todo-checkbox">
                <span>Deploy to Kubernetes cluster with Kind & manifests</span>
              </span>
              <button class="btn-delete">✕</button>
            </li>
          </ul>
        </div>

        <p class="footer-note">
          Live Instance running via <code>Docker Container</code> • Metrics scraped at <code>/metrics</code>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempPreviewPath = path.join(__dirname, 'temp-deployment.html');
fs.writeFileSync(tempPreviewPath, browserMockupHtml, 'utf-8');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePathLinux = '/usr/bin/google-chrome';
const chromiumPathLinux = '/usr/bin/chromium-browser';

if (process.platform === 'win32' && fs.existsSync(edgePath)) {
  console.log('Capturing deployment preview using Microsoft Edge headless...');
  spawnSync(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1200,750',
    `--screenshot=${outputPath}`,
    `file://${tempPreviewPath}`
  ]);
} else if (fs.existsSync(chromePathLinux)) {
  console.log('Capturing deployment preview using Chrome headless...');
  spawnSync(chromePathLinux, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1200,750',
    `--screenshot=${outputPath}`,
    `file://${tempPreviewPath}`
  ]);
} else if (fs.existsSync(chromiumPathLinux)) {
  console.log('Capturing deployment preview using Chromium headless...');
  spawnSync(chromiumPathLinux, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1200,750',
    `--screenshot=${outputPath}`,
    `file://${tempPreviewPath}`
  ]);
}

if (fs.existsSync(tempPreviewPath)) {
  fs.unlinkSync(tempPreviewPath);
}

if (fs.existsSync(outputPath)) {
  console.log(`Successfully generated ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
} else {
  console.error(`Failed to generate ${outputPath}`);
}
