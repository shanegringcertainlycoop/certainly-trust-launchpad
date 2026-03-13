/**
 * One-time OAuth flow to get a LinkedIn access token.
 *
 * Usage:
 *   npx tsx scripts/linkedin-auth.ts
 *
 * 1. Opens your browser to LinkedIn's authorization page
 * 2. You sign in and approve
 * 3. LinkedIn redirects to localhost:3000/callback
 * 4. This script catches the code and exchanges it for an access token
 * 5. Saves the token to .env as LINKEDIN_ACCESS_TOKEN
 *
 * Token lasts 2 months. Re-run this script to refresh.
 */

import { createServer } from "http";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

// Load .env
const envPath = resolve(process.cwd(), ".env");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^(\w+)="?([^"]*)"?$/);
    if (match) process.env[match[1]] = match[2];
  }
} catch {}

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = "openid w_member_social";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET in .env"
  );
  console.error("Add these to your .env file:");
  console.error('  LINKEDIN_CLIENT_ID="your_client_id"');
  console.error('  LINKEDIN_CLIENT_SECRET="your_client_secret"');
  process.exit(1);
}

const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

console.log("Opening LinkedIn authorization page...\n");
console.log(`If it doesn't open automatically, visit:\n${authUrl}\n`);

// Open browser
try {
  execSync(`open "${authUrl}"`);
} catch {
  // fallback for Linux
  try {
    execSync(`xdg-open "${authUrl}"`);
  } catch {}
}

// Start local server to catch the callback
const server = createServer(async (req, res) => {
  const url = new URL(req.url || "", `http://localhost:3000`);

  if (url.pathname !== "/callback") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`<h1>Authorization failed</h1><p>${error}</p>`);
    console.error("Authorization failed:", error);
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("<h1>No authorization code received</h1>");
    return;
  }

  console.log("Authorization code received. Exchanging for access token...");

  // Exchange code for access token
  const tokenResponse = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
      }),
    }
  );

  if (!tokenResponse.ok) {
    const err = await tokenResponse.text();
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h1>Token exchange failed</h1><pre>${err}</pre>`);
    console.error("Token exchange failed:", err);
    process.exit(1);
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token: string;
    expires_in: number;
  };
  const accessToken = tokenData.access_token;
  const expiresIn = tokenData.expires_in;

  // Save to .env
  let envContent = "";
  try {
    envContent = readFileSync(envPath, "utf-8");
  } catch {}

  // Remove old token if present
  envContent = envContent.replace(/^LINKEDIN_ACCESS_TOKEN=.*\n?/m, "");
  // Append new token
  envContent =
    envContent.trimEnd() + `\nLINKEDIN_ACCESS_TOKEN="${accessToken}"\n`;
  writeFileSync(envPath, envContent);

  const expiryDate = new Date(Date.now() + expiresIn * 1000);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    `<h1>LinkedIn authorized!</h1><p>Access token saved to .env</p><p>Expires: ${expiryDate.toLocaleDateString()}</p><p>You can close this tab.</p>`
  );

  console.log(`\nAccess token saved to .env`);
  console.log(`Expires: ${expiryDate.toLocaleDateString()}`);
  console.log(`(${Math.round(expiresIn / 86400)} days)`);

  server.close();
  process.exit(0);
});

server.listen(3000, () => {
  console.log("Waiting for LinkedIn callback on http://localhost:3000...");
});
