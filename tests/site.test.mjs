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
  assert.equal(sha256("firmware/nuve-1.0.13.factory.bin"), "C3AFE8E6BF6CB27FC0A231660E22AB671AA5A192B8177BFD795C3450A712F924");
  assert.equal(sha256("firmware/nuve-1.0.13.littlefs.bin"), "14227715204CFB5F3FBE3609482355521F94B0909F24563B4450F30CF39CB6E9");
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
