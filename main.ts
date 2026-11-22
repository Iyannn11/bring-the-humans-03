import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Entrypoint for bring-the-humans-03: copy VIDEO.json to /output, unchanged
// in meaning. The harness runs this twice; the output is byte-identical
// every run because it is a fixed re-serialisation of the same input.
// Written as plain JavaScript inside the .ts file (no TS-only syntax) so
// it runs under Node's type stripping and any plain TS runner.
const botDir = process.env.MAKEFUN_BOT_DIR;
if (!botDir) {
  throw new Error("MAKEFUN_BOT_DIR is not set");
}
const src = join(botDir, "VIDEO.json");
const raw = readFileSync(src, "utf8");
const parsed = JSON.parse(raw);
if (typeof parsed.url !== "string" || parsed.url.length === 0) {
  throw new Error("VIDEO.json must name a url string");
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/VIDEO.json", JSON.stringify(parsed, null, 2) + "\n");
