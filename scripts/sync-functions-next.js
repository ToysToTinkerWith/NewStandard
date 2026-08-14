const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const sourceDir = path.join(rootDir, ".next");
const targetDir = path.join(rootDir, "functions", ".next");

if (!fs.existsSync(sourceDir)) {
  throw new Error("Missing .next build output. Run next build first.");
}

fs.rmSync(targetDir, { force: true, recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log("Synced .next build output to functions/.next");
