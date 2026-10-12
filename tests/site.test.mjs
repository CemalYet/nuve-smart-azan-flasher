import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readText = (path) => readFileSync(join(root, path), "utf8");
const sha256 = (path) => createHash("sha256").update(readFileSync(join(root, path))).digest("hex").toUpperCase();

test("manifest references the v1.0.14 ESP32-S3 images at safe offsets", () => {
  const manifest = JSON.parse(readText("manifest.json"));
  assert.equal(manifest.version, "1.0.14");
  assert.deepEqual(manifest.builds[0].parts, [
    { path: "firmware/nuve-1.0.14-en.factory.bin", offset: 0 },
    { path: "firmware/nuve-1.0.14.littlefs.bin", offset: 9502720 }
  ]);
});

test("published binaries match the approved release package", () => {
  assert.equal(sha256("firmware/nuve-1.0.14-en.factory.bin"), "EA3871FE35FC70E9D7F2EF77D0C82DB6D38C5CC8750F24E03EBF3B6936D466E6");
  assert.equal(sha256("firmware/nuve-1.0.14.littlefs.bin"), "9D2F15BC8263F06B78EF5D325F0B889FF457690A4FEE2A6851900BD39E1EECF1");
});

test("customer flow has no ESP Web Tools menu or logs screen", () => {
  const html = readText("index.html");
  const app = readText("app.js");
  assert.doesNotMatch(html, /esp-web-install-button/);
  assert.doesNotMatch(`${html}\n${app}`, /Logs & Console|>Next</i);
  assert.match(app, /esptool-js@0\.6\.1/);
  assert.match(app, /successTitle: "Yükleme tamamlandı"/);
  assert.match(app, /closeButton: "Kapat"/);
});

test("every visible page label exists in Turkish and English", () => {
  const html = readText("index.html");
  const app = readText("app.js");
  const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);
  const tr = app.slice(app.indexOf("tr: {"), app.indexOf("\n  en: {"));
  const en = app.slice(app.indexOf("en: {"), app.indexOf("\n};", app.indexOf("en: {")));
  for (const key of keys) {
    assert.match(tr, new RegExp(`\\b${key}:`), `Turkish: ${key}`);
    assert.match(en, new RegExp(`\\b${key}:`), `English: ${key}`);
  }
});


test("web language does not select a different firmware", () => {
  const app = readText("app.js");
  assert.match(app, /new URL\("manifest.json", window.location.href\)/);
  assert.match(app, /const files = await loadFiles\(\)/);
  assert.doesNotMatch(app, /manifest-\$|installationLanguage/);
});
