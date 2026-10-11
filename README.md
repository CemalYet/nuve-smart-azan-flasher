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
nuve-1.0.13.factory.bin   SHA256 6C896E5337C55D52D5378CC6AE42E1F47F9350296C3CFC09171FED30B6E12371
nuve-1.0.13.littlefs.bin  SHA256 0E50A10EF65A75DFF9D914F295E6ABE43F3E0909C899FE08FD10ABC6BD5D2D7B
```

Before publishing another version, replace both binaries, update their versioned names and paths in `manifest.json`, update the visible version in `index.html`, and recalculate the checksums.
