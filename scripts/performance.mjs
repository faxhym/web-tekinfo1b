import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
const name = process.argv[2] || "after";
if (!/^[a-z-]+$/.test(name)) throw new Error("Use a lowercase report label");
const server = spawn(
  "python",
  ["-m", "http.server", "4173", "--bind", "127.0.0.1"],
  { stdio: "ignore" },
);
let chrome;
try {
  chrome = await launch({
    chromePath: process.env.CHROMIUM_PATH,
    chromeFlags: ["--headless", "--no-sandbox"],
  });
  const result = await lighthouse("http://127.0.0.1:4173", {
    port: chrome.port,
    output: ["json", "html"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  await fs.mkdir("docs/reports", { recursive: true });
  await fs.writeFile(`docs/reports/lighthouse-${name}.json`, result.report[0]);
  await fs.writeFile(`docs/reports/lighthouse-${name}.html`, result.report[1]);
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [k, v.score]),
        ),
        LCP: result.lhr.audits["largest-contentful-paint"].displayValue,
        CLS: result.lhr.audits["cumulative-layout-shift"].displayValue,
        TBT: result.lhr.audits["total-blocking-time"].displayValue,
      },
      null,
      2,
    ),
  );
} finally {
  await chrome?.kill();
  server.kill();
}
