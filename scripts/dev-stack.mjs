#!/usr/bin/env node
/**
 * Start Next.js + voice relay (OpenAI relay optional if Azure is configured).
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shell = process.platform === "win32";

function run(name, command, args) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: "inherit",
    shell,
    env: process.env,
  });
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.warn(`[dev-stack] ${name} exited with code ${code}`);
    }
  });
  return child;
}

const children = [run("voice-relay", "npx", ["tsx", "server/voice-relay.ts"])];

if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_API_KEY) {
  children.push(
    run("openai-voice-relay", "npx", ["tsx", "server/openai-voice-relay.ts"]),
  );
} else {
  console.log(
    "[dev-stack] Skipping openai-voice-relay (set AZURE_OPENAI_* to enable)",
  );
}

children.push(run("next", "pnpm", ["run", "dev"]));

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill("SIGTERM");
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("[dev-stack] Next.js + voice relay starting…");
console.log("[dev-stack] Voice relay: ws://localhost:8766/ws/voice");
if (process.env.AZURE_OPENAI_ENDPOINT) {
  console.log("[dev-stack] OpenAI relay: ws://localhost:8767/ws/openai-voice");
}
