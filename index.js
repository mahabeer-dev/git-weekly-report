#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const args = process.argv.slice(2);

// ------------------
// Parse CLI args
// ------------------
function getArg(name, defaultValue) {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return defaultValue;
}

const DAYS = parseInt(getArg("days", "7"), 10);
const OUTPUT_FILE = getArg("out", "weekly-report.md");
const BASE_DIR = getArg("dir", path.join(os.homedir(), "Documents/projects"));

// ------------------
// Helpers
// ------------------
function run(cmd, cwd) {
  return execSync(cmd, {
    cwd,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function expandHome(p) {
  if (p.startsWith("~/")) {
    return path.join(os.homedir(), p.slice(2));
  }
  return p;
}

const baseDir = expandHome(BASE_DIR);

// ------------------
// Metadata
// ------------------
let userName = "";
let userEmail = "";

try {
  userName = run("git config --global user.name");
  userEmail = run("git config --global user.email");
} catch {
  userName = "Unknown";
  userEmail = "Unknown";
}

const fromDate = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const toDate = new Date().toISOString().split("T")[0];

// ------------------
// Main logic
// ------------------
console.log("🔍 Scanning repos in:", baseDir);
console.log("📅 Days:", DAYS);
console.log("📄 Output:", OUTPUT_FILE);
console.log("");

let output = `# Git Report\n\n`;

output += `**Name:** ${userName}\n\n`;
output += `**Email:** ${userEmail}\n\n`;
output += `**Period:** ${fromDate} → ${toDate}\n\n`;
output += `---\n\n`;

let totalCommits = 0;

const repos = fs
  .readdirSync(baseDir)
  .map((name) => path.join(baseDir, name))
  .filter((p) => fs.existsSync(path.join(p, ".git")));

for (const repo of repos) {
  try {
    const commits = run(
      `git log --since="${DAYS} days ago" --pretty=format:"- %s"`,
      repo,
    );

    if (commits) {
      const commitCount = commits.split("\n").length;
      totalCommits += commitCount;

      output += `## 📦 ${path.basename(repo)} (${commitCount} commits)\n`;
      output += `${commits}\n\n`;
    }
  } catch {
    // skip broken repos
  }
}

output += `---\n\n`;
output += `**Total commits:** ${totalCommits}\n`;

fs.writeFileSync(OUTPUT_FILE, output);

console.log("✅ Report written to:", OUTPUT_FILE);
