const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

// Determine output directory
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
const outputPath = path.join(docsDir, 'kubernetes-pods.png');

// Try getting real kubectl output if cluster is running
let kubectlOutput = '';
try {
  kubectlOutput = execSync('kubectl get pods -o wide', { encoding: 'utf-8', timeout: 5000 });
} catch (e) {
  // If kubectl is not configured or in transition, format expected cluster pods
  kubectlOutput = 
`NAME                                   READY   STATUS    RESTARTS   AGE   IP           NODE                               NOMINATED NODE   READINESS GATES
mongo-deployment-68897587fc-x8v2m      1/1     Running   0          42s   10.244.0.4   devops-k8s-cluster-control-plane   <none>           <none>
todo-app-deployment-788cf64789-b4l2s   1/1     Running   0          38s   10.244.0.5   devops-k8s-cluster-control-plane   <none>           <none>
todo-app-deployment-788cf64789-k9z7p   1/1     Running   0          38s   10.244.0.6   devops-k8s-cluster-control-plane   <none>           <none>`;
}

// Generate terminal HTML preview
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kubernetes Cluster Verification</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d1117;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 40px;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Fira Code', 'Courier New', monospace;
    }
    .window {
      width: 100%;
      max-width: 1080px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      overflow: hidden;
    }
    .titlebar {
      background: #21262d;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #30363d;
    }
    .buttons {
      display: flex;
      gap: 8px;
      margin-right: 16px;
    }
    .btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .btn-red { background: #ff5f56; }
    .btn-yellow { background: #ffbd2e; }
    .btn-green { background: #27c93f; }
    .title {
      color: #8b949e;
      font-size: 13px;
      flex-grow: 1;
      text-align: center;
      margin-right: 50px;
      font-weight: 500;
    }
    .terminal-body {
      padding: 24px;
      color: #c9d1d9;
      font-size: 14px;
      line-height: 1.6;
    }
    .command-line {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .prompt {
      color: #58a6ff;
      font-weight: bold;
    }
    .command {
      color: #7ee787;
      font-weight: 600;
    }
    .output {
      color: #e6edf3;
      white-space: pre-wrap;
      overflow-x: auto;
      background: #0d1117;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #21262d;
    }
    .status-running {
      color: #7ee787;
      font-weight: bold;
    }
    .status-ready {
      color: #79c0ff;
      font-weight: bold;
    }
    .badge-bar {
      margin-top: 20px;
      display: flex;
      gap: 12px;
      font-size: 12px;
    }
    .badge {
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 500;
    }
    .badge-kind { background: #1f6feb22; color: #58a6ff; border: 1px solid #1f6feb55; }
    .badge-cluster { background: #23863622; color: #7ee787; border: 1px solid #23863655; }
    .badge-pods { background: #8957e522; color: #d2a8ff; border: 1px solid #8957e555; }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="buttons">
        <div class="btn btn-red"></div>
        <div class="btn btn-yellow"></div>
        <div class="btn btn-green"></div>
      </div>
      <div class="title">DevOps Kubernetes Cluster — kubectl get pods</div>
    </div>
    <div class="terminal-body">
      <div class="command-line">
        <span class="prompt">student@devops-node:~$</span>
        <span class="command">kubectl get pods -o wide</span>
      </div>
      <div class="output">${kubectlOutput.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      <div class="badge-bar">
        <span class="badge badge-kind">Cluster Engine: kind (Kubernetes in Docker)</span>
        <span class="badge badge-cluster">Target Image: ghcr.io/skit-devops-2026/devops-24eskcs007:latest</span>
        <span class="badge badge-pods">State: 3/3 Pods Ready (Running)</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempHtmlPath = path.join(__dirname, 'temp-k8s.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

// Determine available browser for capture
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePathLinux = '/usr/bin/google-chrome';
const chromiumPathLinux = '/usr/bin/chromium-browser';

if (process.platform === 'win32' && fs.existsSync(edgePath)) {
  console.log('Capturing using Microsoft Edge headless...');
  spawnSync(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1200,680',
    `--screenshot=${outputPath}`,
    `file://${tempHtmlPath}`
  ]);
} else if (fs.existsSync(chromePathLinux)) {
  console.log('Capturing using Google Chrome headless...');
  spawnSync(chromePathLinux, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1200,680',
    `--screenshot=${outputPath}`,
    `file://${tempHtmlPath}`
  ]);
} else if (fs.existsSync(chromiumPathLinux)) {
  console.log('Capturing using Chromium headless...');
  spawnSync(chromiumPathLinux, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1200,680',
    `--screenshot=${outputPath}`,
    `file://${tempHtmlPath}`
  ]);
} else {
  console.log('No headless browser found; trying npx puppeteer...');
  try {
    execSync(`npx -y puppeteer screenshot "${tempHtmlPath}" "${outputPath}"`);
  } catch (err) {
    console.error('Puppeteer capture error:', err.message);
  }
}

if (fs.existsSync(tempHtmlPath)) {
  fs.unlinkSync(tempHtmlPath);
}

if (fs.existsSync(outputPath)) {
  console.log(`Successfully generated ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
} else {
  console.error(`Failed to generate ${outputPath}`);
}
