# Nuve Recovery Installer

Static GitHub Pages recovery installer for Nuve Smart Azan ESP32-S3 devices.

The installer performs a full recovery flash:

- `firmware.factory.bin` at `0x0`
- `littlefs.bin` at `0x910000`

The install erases existing flash data, including Wi-Fi credentials and device settings.

## Publish

1. Create a public GitHub repository named `nuve-recovery-installer`.
2. Push this repository to its `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. Wait for the **Deploy GitHub Pages** workflow to finish.

Web Serial requires HTTPS and a desktop Chromium browser such as Chrome or Edge.

## Package checksums

```text
nuve-1.0.12.factory.bin   SHA256 C0B1EB437DBCC7E7BBAA19B23D5CD585BDD8972C518F82DAFB0E15FF67DD05CA
nuve-1.0.12.littlefs.bin  SHA256 82F5E73410B33BB012EAF75A1DFC97EF67434AF9F7B2D7E0CB62E5E91EB80971
```

Before publishing another version, replace both binaries, update their versioned names and paths in `manifest.json`, update the visible version in `index.html`, and recalculate the checksums.
