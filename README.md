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
nuve-1.0.12.factory.bin   SHA256 AE12DA2F31CD3B96B0937FDEB2FA6BEE6C32A7B854C562D9200EEF4CAA743A48
nuve-1.0.12.littlefs.bin  SHA256 782C0CB0CAE47D769024C16F6AB9437E0C9553BF31D1F8E478127BFE6DE220EF
```

Before publishing another version, replace both binaries, update their versioned names and paths in `manifest.json`, update the visible version in `index.html`, and recalculate the checksums.
