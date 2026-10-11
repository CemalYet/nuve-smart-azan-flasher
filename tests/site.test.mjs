import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readText = (path) => readFileSync(join(root, path), "utf8");
const sha256 = (path) => createHash("sha256").update(readFileSync(join(root, path))).digest("hex").toUpperCase();

test("manifest references the v1.0.13 ESP32-S3 images at safe offsets", () => {
  const manifest = JSON.parse(readText("manifest.json"));
  assert.equal(manifest.version, "1.0.13");
  assert.deepEqual(manifest.builds[0].parts, [
    { path: "firmware/nuve-1.0.13.factory.bin", offset: 0 },
    { path: "firmware/nuve-1.0.13.littlefs.bin", offset: 9502720 }
  ]);
});

test("published binaries match the approved release package", () => {
  assert.equal(sha256("firmware/nuve-1.0.13.factory.bin"), "6C896E5337C55D52D5378CC6AE42E1F47F9350296C3CFC09171FED30B6E12371");
  assert.equal(sha256("firmware/nuve-1.0.13.littlefs.bin"), "0E50A10EF65A75DFF9D914F295E6ABE43F3E0909C899FE08FD10ABC6BD5D2D7B");
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
